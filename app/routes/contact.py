# routes/contact_routes.py
from fastapi import APIRouter, BackgroundTasks, HTTPException
from datetime import datetime
from app.db import db
from app.models.contacts import ContactForm
from app.utils.email_utils import send_contact_email

router = APIRouter()
contacts_collection = db["Contacts"]
@router.post("/contact")
async def submit_contact(contact: ContactForm, background_tasks: BackgroundTasks):
    # Save to MongoDB
    try:
        contacts_collection.insert_one({
            "name": contact.name,
            "email": contact.email,
            "message": contact.message,
            "created_at": datetime.utcnow()
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to save contact message")

    # Send email in background
    background_tasks.add_task(send_contact_email, contact)

    # Success response for frontend toast
    return {"message": "Contact form submitted successfully"}

@router.get("/contact")
async def get_contacts():
    try:
        contacts = list(contacts_collection.find({}, {"_id": 0}))
        return {"contacts": contacts}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to retrieve contacts")
