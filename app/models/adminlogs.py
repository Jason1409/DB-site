from pydantic import BaseModel
from datetime import datetime

class AdminLog(BaseModel):
    email: str
    login_time: datetime
    ip_address: str | None = None  # Optional: to log IP
    