from fastapi import APIRouter,HTTPException
from app.db import db
from app.models.products import Product
from pymongo import ReturnDocument
from typing import List
from bson import ObjectId
router = APIRouter()
products_collection = db["Products"]
@router.post("/", response_model=Product)
def create_product(product: Product):
    result = products_collection.insert_one(product.dict(exclude={"id"}))
    if result.acknowledged:
        product.id = str(result.inserted_id)
        return product
    return {"message": "Failed to create product"}

@router.get("/", response_model=List[Product])
def get_products():
    products = products_collection.find()
    products_list = []
    for p in products:
        p["id"] = str(p["_id"])
        del p["_id"]
        products_list.append(Product(**p))
    return products_list

@router.put("/{id}", response_model=Product)
def update_product(id: str, product: Product):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid product ID")
    update_data= product.dict(exclude_unset=True, exclude={"id"})
    result = products_collection.find_one_and_update({"_id": ObjectId(id)}, {"$set": update_data}, return_document=ReturnDocument.AFTER)
    if result:
        result["id"] = str(result["_id"])
        del result["_id"]
        return Product(**result)
    raise HTTPException(status_code=404, detail="Product not found")

@router.delete("/{id}")
def delete_product(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid product ID")
    result = products_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 1:
        return {"message": "Product deleted successfully"}
    raise HTTPException(status_code=404, detail="Product not found")
  