import os
from typing import Literal, List, Optional

import cloudinary
from cloudinary import uploader, api
from fastapi import UploadFile, HTTPException
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)

# Allowed file extensions for validation
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp', 'mp4', 'webm'}


def upload_media(
    folder: str,
    resource_type: Literal['image', 'video'],
    files: List[UploadFile]
) -> List[dict]:
    # Upload multiple media files to Cloudinary
    uploaded = []

    for file in files:
        filename = file.filename.lower()
        extension = filename.split('.')[-1]

        # Validate file extension
        if extension not in ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=400,
                detail=f"File type '{extension}' is not allowed. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}"
            )

        try:
            # Upload to Cloudinary
            upload_result = uploader.upload(
                file.file,
                folder=folder,
                resource_type=resource_type,
                use_filename=True,
                unique_filename=True,
                overwrite=False
            )
            # Store upload details
            uploaded.append({
                "public_id": upload_result.get("public_id"),
                "secure_url": upload_result.get("secure_url"),
            })

        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Cloudinary upload failed: {str(e)}")

    return uploaded


def list_media(
    folder: str,
    resource_type: Literal['image', 'video'],
    max_results: int = 50,
    next_cursor: Optional[str] = None
) -> dict:
    # List media with optional pagination support
    try:
        # Fetch media resources from Cloudinary
        resources = api.resources(
            type='upload',
            prefix=folder + '/',
            resource_type=resource_type,
            max_results=max_results,
            next_cursor=next_cursor
        )

        # Return media URLs + pagination cursor if present
        return {
            "media": [res['secure_url'] for res in resources.get('resources', [])],
            "next_cursor": resources.get('next_cursor')
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to list media: {str(e)}")


def delete_media(public_id: str, resource_type: Literal['image', 'video']) -> bool:
    # Delete a media file from Cloudinary
    try:
        result = uploader.destroy(public_id, resource_type=resource_type)
        return result.get("result") == "ok"
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete media: {str(e)}")
