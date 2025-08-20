
from pydantic import BaseModel, EmailStr, Field

class ContactForm(BaseModel):
    email: EmailStr = Field(..., description="Email address of the sender")
    message: str = Field(..., min_length=5, max_length=2000, description="Message content")
    name: str = Field(..., min_length=2, max_length=100, description="Full name of the sender")
    phone:str = Field(None, min_length=7, max_length=15, description="Phone number of the sender (optional)")
