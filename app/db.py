from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

# Connect to MongoDB
client = MongoClient(os.getenv("MONGO_URI"))
db = client[os.getenv("MONGO_DB")]