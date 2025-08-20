from fastapi import APIRouter,HTTPException
from app.db import db
from app.models.project import Project
from typing import List
from bson import ObjectId
from pymongo import ReturnDocument
router = APIRouter()
projects_collection = db["Projects"]

@router.post("/", response_model=Project)
def create_project(project: Project):
    result = projects_collection.insert_one(project.dict(exclude={"id"}))
    if result.acknowledged:
        project.id = str(result.inserted_id)
        return project
    return {"message": "Failed to create project"}
@router.get("/", response_model=List[Project])
def get_projects():
    projects = projects_collection.find()
    prj=[]
    try:
        
         for p in projects:
            p["id"] = str(p["_id"])
            del p["_id"]
            prj.append(Project(**p))
    except Exception as e:
         print(f"[SKIPPED] Project ID {p.get('_id')} - Validation failed: {e}")     
    return prj
@router.put("/{id}", response_model=Project)
def update_project(id: str, project: Project):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid project ID")
    update_data = project.dict(exclude_unset=True, exclude={"id"})
    result = projects_collection.find_one_and_update({"_id": ObjectId(id)}, {"$set": update_data}, return_document=ReturnDocument.AFTER)
    if result:
        result["id"] = str(result["_id"])
        del result["_id"]
        return Project(**result)
    raise HTTPException(status_code=404, detail="Project not found")

@router.delete("/{id}")
def delete_project(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid project ID")
    result = projects_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 1:
        return {"message": "Project deleted successfully"}
    raise HTTPException(status_code=404, detail="Project not found")
