from fastapi import APIRouter, Depends, HTTPException, Request, status
from app.models.auth import Admin, TokenResponse
from app.models.adminlogs import AdminLog
from app.utils.auth import create_access_token
import os
from dotenv import load_dotenv
from app.db import db
from datetime import datetime, timezone

router = APIRouter()
load_dotenv()

admins_collection = db["Admin"]
admin_logs_collection = db["adminLogs"]

ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

# ✅ Login route
@router.post("/admin-db1/login", response_model=TokenResponse)
def admin_login(admin: Admin, request: Request):
    if admin.email == ADMIN_EMAIL and admin.password == ADMIN_PASSWORD:
        access_token = create_access_token(data={"sub": admin.email})
        
        # ✅ Extract IP from headers (Cloudflare, Vercel) or fallback to request.client
        ip_address = request.headers.get("x-forwarded-for", request.client.host)
        
        # ✅ Log the login
        log_entry = AdminLog(
            email=admin.email,
            login_time=datetime.now(timezone.utc),
            ip_address=ip_address
        )
        result = admin_logs_collection.insert_one(log_entry.dict())

        return TokenResponse(access_token=access_token)

    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

