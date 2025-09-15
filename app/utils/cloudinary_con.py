import cloudinary
from cloudinary import uploader, api
from fastapi import UploadFile, HTTPException, File
from typing import Literal,List
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)

# Define allowed file extensions (for validation)
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp', 'mp4', 'webm'}

def upload_media(
    folder: str,
    resource_type: Literal['image', 'video'],
    files: List[UploadFile] 
) -> List[dict]:
    uploaded = []

    for file in files:
        filename = file.filename.lower()
        extension = filename.split('.')[-1]

        if extension not in ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=400,
                detail=f"File type '{extension}' is not allowed. Allowed types are: {', '.join(ALLOWED_EXTENSIONS)}"
            )

        try:
            upload_result = uploader.upload(
                file.file,
                folder=folder,
                resource_type=resource_type,
                use_filename=True,
                unique_filename=True,
                overwrite=False
            )
            uploaded.append({
                "public_id": upload_result.get("public_id"),
                "secure_url": upload_result.get("secure_url"),
            })

        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Cloudinary upload failed: {str(e)}")

    return uploaded

def list_media(folder: str, resource_type: Literal['image', 'video']) -> list:
    try:
        resources = api.resources(
            type='upload',
            prefix=folder + '/',
            resource_type=resource_type,
            max_results=100 
        )
        return [res['secure_url'] for res in resources.get('resources', [])]

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to list media: {str(e)}")
def delete_media(public_id:str, resource_type: Literal['image', 'video']) -> bool:
    try:
        result = uploader.destroy(public_id, resource_type=resource_type)
        return result.get("result") == "ok"
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete media: {str(e)}")
