from fastapi import APIRouter, HTTPException, UploadFile, Query, File
from fastapi.responses import JSONResponse
from typing import Literal, List
from bson import ObjectId
from pymongo.collection import Collection

from app.db import db
from app.utils.cloudinary_con import upload_media, list_media, delete_media
from app.routes.products import products_collection as products
from app.routes.project import projects_collection as projects

router = APIRouter( tags=["Media"])


@router.post("/upload/{folder}")
def upload_media_files(
    folder: str,
    files: List[UploadFile] = File(...),
    type: Literal["image", "video"] = Query(...),
    collection: Literal["products", "projects"] = Query(...),
    document_id: str = Query(...),
):
    # Validate document ID
    if not ObjectId.is_valid(document_id):
        raise HTTPException(status_code=400, detail="Invalid document ID")

    # Select correct MongoDB collection
    col_ref = products if collection == "products" else projects

    # Ensure the document exists before uploading
    doc = col_ref.find_one({"_id": ObjectId(document_id)})
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found. Cannot attach media.")

    # Validate file type before uploading
    for file in files:
        if type == "image" and not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail=f"Invalid file type: {file.filename} is not an image")
        if type == "video" and not file.content_type.startswith("video/"):
            raise HTTPException(status_code=400, detail=f"Invalid file type: {file.filename} is not a video")

    # Upload media to Cloudinary
    media_list = upload_media(folder=folder, resource_type=type, files=files)

    # Update the document with media references
    update_result = col_ref.update_one(
        {"_id": ObjectId(document_id)},
        {"$push": {f"{type}s": {"$each": media_list}}}
    )

    # Check if update was successful
    if update_result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Document not found or could not be updated with media")

    return {"message": "Media uploaded successfully", "media": media_list}


@router.get("/list/{folder}/{type}")
def list_media_files(
    folder: str,
    type: Literal["image", "video"],
    max_results: int = Query(50, ge=1, le=200),
    next_cursor: str = Query(None, description="Optional pagination cursor")
):
    # List media from Cloudinary with pagination
    try:
        media_list = list_media(folder=folder, resource_type=type, max_results=max_results, next_cursor=next_cursor)
        return {"media": media_list}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to list media: {str(e)}")


@router.delete("/delete/{type}/{public_id:path}")
def delete_media_file(
    type: Literal["image", "video"],
    public_id: str,
    collection: Literal["products", "projects"] = Query(...),
    document_id: str = Query(..., description="ID of the product or project document")
):
    # Validate document ID
    if not ObjectId.is_valid(document_id):
        raise HTTPException(status_code=400, detail="Invalid document ID")

    # Select correct collection
    col_ref = products if collection == "products" else projects

    # Ensure document exists before deleting
    doc = col_ref.find_one({"_id": ObjectId(document_id)})
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found. Cannot delete media.")

    # Check if media exists in the document
    if not any(m.get("public_id") == public_id for m in doc.get(f"{type}s", [])):
        raise HTTPException(status_code=404, detail="Media not found in the specified document.")

    # Delete media from Cloudinary
    success = delete_media(public_id, type)
    if not success:
        raise HTTPException(status_code=404, detail="Media not found in Cloudinary")

    # Remove media reference from MongoDB
    result = col_ref.update_one(
        {"_id": ObjectId(document_id)},
        {"$pull": {f"{type}s": {"public_id": public_id}}}
    )

    # Check if media was removed from document
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Media was deleted from Cloudinary but not found in the document")

    return {"message": "Media deleted successfully"}
