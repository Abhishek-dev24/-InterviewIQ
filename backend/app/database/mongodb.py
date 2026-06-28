from pymongo import MongoClient
from pymongo.errors import PyMongoError

from app.core.config import settings

client = MongoClient(
    settings.mongodb_url,
    serverSelectionTimeoutMS=5000,
)

db = client[settings.database_name]


def ping_database():
    client.admin.command("ping")
    return True


def get_database_status():
    try:
        ping_database()
        return {
            "connected": True,
            "database": settings.database_name,
            "url": settings.mongodb_url.split("@")[-1],
        }
    except PyMongoError as exc:
        return {
            "connected": False,
            "database": settings.database_name,
            "error": str(exc),
        }
