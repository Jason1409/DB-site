from fastapi import APIRouter, HTTPException, Query
from app.db import db
from app.models.project import Project
from typing import List, Optional
from bson import ObjectId
from pymongo import ReturnDocument

router = APIRouter( tags=["Projects"])
projects_collection = db["Projects"]


@router.post("/", response_model=Project)
def create_project(project: Project):
    # Insert project into the database
    result = projects_collection.insert_one(project.dict(exclude={"id"}))
    if result.acknowledged:
        project.id = str(result.inserted_id)
        return project
    raise HTTPException(status_code=500, detail="Failed to create project")


@router.get("/", response_model=List[Project])
def get_projects(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, le=100),
    fields: Optional[str] = None
):
    # Define projection matching the Project model fields
    projection = {
        "_id": 1,
        "title": 1,
        "client": 1,
        "description": 1,
        "category": 1,
        "Partners": 1,
        "status": 1,
        "images": 1,
        "videos": 1
    }

    # Optional: allow selecting specific fields with ?fields=title,client,status
    if fields:
        projection = {f: 1 for f in fields.split(",")}
        projection["_id"] = 1

    # Fetch projects with pagination
    cursor = (
        projects_collection.find({}, projection)
        .skip(skip)
        .limit(limit)
    )

    projects = []
    for p in cursor:
        p["id"] = str(p["_id"])  # Convert ObjectId to string
        del p["_id"]
        projects.append(Project(**p))
    return projects


@router.put("/{id}", response_model=Project)
def update_project(id: str, project: Project):
    # Validate ObjectId
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid project ID")

    # Update only the fields provided in the request
    update_data = project.dict(exclude_unset=True, exclude={"id"})

    # Update project and return updated document
    result = projects_collection.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$set": update_data},
        return_document=ReturnDocument.AFTER,
        projection={
            "_id": 1,
            "title": 1,
            "client": 1,
            "description": 1,
            "category": 1,
            "Partners": 1,
            "status": 1,
            "images": 1,
            "videos": 1
        }
    )

    if result:
        result["id"] = str(result["_id"])
        del result["_id"]
        return Project(**result)
    raise HTTPException(status_code=404, detail="Project not found")


@router.delete("/{id}")
def delete_project(id: str):
    # Validate ObjectId
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid project ID")

    # Delete project from database
    result = projects_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 1:
        return {"message": "Project deleted successfully"}
    raise HTTPException(status_code=404, detail="Project not found")
