from fastapi import FastAPI
from app.routes import project, auth, products, media, contact
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
load_dotenv()

app = FastAPI(
    title="Bussiness API",
)
origin = ["http://localhost:5173",os.getenv("FRONTEND_URL","https://db-site-mu.vercel.app" )]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origin, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(media.router, tags=["Media"])
app.include_router(products.router, prefix="/products", tags=["Products"])
app.include_router(contact.router, tags=["Contact"])
app.include_router(project.router, prefix="/projects", tags=["Projects"])


@app.get("/")
def root():
    return {"message": "Test API is running"}
