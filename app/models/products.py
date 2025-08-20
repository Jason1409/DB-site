from pydantic import BaseModel, Field
from typing import Optional, List

class MediaItem(BaseModel):
    secure_url: str
    public_id: str

class Product(BaseModel):
    id: Optional[str] = None
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    images: List[MediaItem] = Field(default_factory=list, example=[])
    videos: List[MediaItem] = Field(default_factory=list, example=[])
