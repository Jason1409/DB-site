from pydantic import BaseModel,Field
from typing import Optional, List

class Mediaitm(BaseModel):
    secure_url: str
    public_id: str

class Project(BaseModel):
    id: Optional[str] = None
    title: str
    client: Optional[str]
    description: str
    category: Optional[str] = None
    Partners: Optional[List[str]] = []
    status: str  # "ongoing" or "completed"
    images: Optional[List[Mediaitm]] = Field(default_factory=list, example=[])
    videos: Optional[List[Mediaitm]] = Field(default_factory=list, example=[])
  