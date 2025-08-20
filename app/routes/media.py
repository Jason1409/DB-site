from fastapi import APIRouter, HTTPException, UploadFile, Query,File
from fastapi.responses import JSONResponse
from app.utils.cloudinary_con import upload_media, list_media, delete_media
from bson import ObjectId
from typing import Literal,List
from app.db import db
from app.utils.cloudinary_con import upload_media


router = APIRouter(prefix="/media", tags=["Media"])
products = db["Products"]
projects = db["Projects"]
from pymongo.collection import Collection

@router.post("/upload/{folder}")
def upload_media_files(
    folder: str,
    files: List[UploadFile] = File(...),
    type: Literal["image", "video"] = Query(...),
    collection: Literal["products", "projects"] = Query(...),
    document_id: str = Query(...),
):

    try:
        if not ObjectId.is_valid(document_id):
            raise HTTPException(status_code=400, detail="Invalid document ID")
        
        media_list = upload_media(folder=folder, resource_type=type, files=files)
        
        col_ref = products if collection == "products" else projects
        
        update_result= col_ref.update_one(
            {"_id": ObjectId(document_id)},
            {"$push": {f"{type}s": {"$each": media_list}}}
        )
        if update_result.modified_count == 0:
            raise HTTPException(status_code=404, detail=f"No {folder} found to update with uploaded media")
        return {"message": "Media uploaded successfully", "media": media_list}
    except HTTPException as e:
        raise e

@router.get("/list/{folder}/{type}")
def list_media_files(
    folder: str,
    type: Literal["image", "video"]
):
    try:
        media_list = list_media(folder, type)
        return {"media": media_list}
    except HTTPException as e:
        raise e

from fastapi import Query

@router.delete("/delete/{type}/{public_id:path}")
def delete_media_file(
    type: Literal["image", "video"],
    public_id: str,
    document_id: str = Query(..., description="ID of the product or project")
):
    try:
        if not ObjectId.is_valid(document_id):
            raise HTTPException(status_code=400, detail="Invalid document ID")

        # First delete from cloudinary
        success = delete_media(public_id, type)
        if not success:
            raise HTTPException(status_code=404, detail="Media not found in Cloudinary")

        # Try deleting from projects
        result = projects.update_one(
            {"_id": ObjectId(document_id)},
            {"$pull": {f"{type}s": {"public_id": public_id}}}
        )

        if result.modified_count == 1:
            return {"message": "Media deleted successfully from projects"}

        # If not found in projects, try products
        result = products.update_one(
            {"_id": ObjectId(document_id)},
            {"$pull": {f"{type}s": {"public_id": public_id}}}
        )

        if result.modified_count == 1:
            return {"message": "Media deleted successfully from products"}

        # If not deleted in either
        raise HTTPException(status_code=404, detail="Media not found in projects or products")

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
