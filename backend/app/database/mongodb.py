from pymongo import MongoClient
from os import getenv
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = getenv("MONGO_URI")
DATABASE_NAME = getenv("DATABASE_NAME")

client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)

db = client[DATABASE_NAME]