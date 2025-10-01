from fastapi import APIRouter, HTTPException, Query
from app.db import db
from app.models.products import Product
from typing import List, Optional
from bson import ObjectId
from pymongo import ReturnDocument

router = APIRouter(prefix="/products", tags=["Products"])
products_collection = db["Products"]


@router.post("/", response_model=Product)
def create_product(product: Product):
    # Convert Pydantic model to dict and exclude `id` because MongoDB will generate _id
    result = products_collection.insert_one(product.dict(exclude={"id"}))
    if result.acknowledged:
        product.id = str(result.inserted_id)
        return product
    raise HTTPException(status_code=500, detail="Failed to create product")


@router.get("/", response_model=List[Product])
def get_products(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, le=100),
    fields: Optional[str] = None
):
    # Default projection matching Product model fields
    projection = {
        "_id": 1,
        "title": 1,
        "description": 1,
        "category": 1,
        "images": 1,
        "videos": 1
    }

    # Optional: allow selecting specific fields with ?fields=title,category
    if fields:
        projection = {f: 1 for f in fields.split(",")}
        projection["_id"] = 1

    # Fetch products with pagination and projection
    cursor = (
        products_collection.find({}, projection)
        .skip(skip)
        .limit(limit)
    )

    products = []
    for p in cursor:
        p["id"] = str(p["_id"])  # Convert ObjectId to string
        del p["_id"]
        products.append(Product(**p))
    return products


@router.put("/{id}", response_model=Product)
def update_product(id: str, product: Product):
    # Validate MongoDB ObjectId
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid product ID")

    # Only update provided fields (exclude unset fields and `id`)
    update_data = product.dict(exclude_unset=True, exclude={"id"})

    # Update document and return the updated version
    result = products_collection.find_one_and_update(
        {"_id": ObjectId(id)},
        {"$set": update_data},
        return_document=ReturnDocument.AFTER,
        projection={
            "_id": 1,
            "title": 1,
            "description": 1,
            "category": 1,
            "images": 1,
            "videos": 1
        }
    )

    # Return updated product or 404 if not found
    if result:
        result["id"] = str(result["_id"])
        del result["_id"]
        return Product(**result)
    raise HTTPException(status_code=404, detail="Product not found")


@router.delete("/{id}")
def delete_product(id: str):
    # Validate MongoDB ObjectId
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid product ID")

    # Delete the product by ID
    result = products_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 1:
        return {"message": "Product deleted successfully"}
    raise HTTPException(status_code=404, detail="Product not found")
