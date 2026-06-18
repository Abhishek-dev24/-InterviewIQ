from app.database.mongodb import db
from datetime import datetime
from bson import ObjectId
from fastapi import HTTPException



# from app.services.interview_service import (
#     get_session_by_id,
#     update_current_question_number,
#     update_session_status
# )

interview_collection = db["interview_sessions"]

# This service talks ONLY to interview_sessions collection
def create_interview_session(
    interview_data: dict,
    user_email: str
):

    interview_data["user_email"] = user_email

    interview_data["status"] = "started"

    interview_data["current_question_number"] = 1

    interview_data["created_at"] = datetime.utcnow()

    result = interview_collection.insert_one(
        interview_data
    )

    return str(result.inserted_id)

# Validate session exists.
def get_session_by_id(session_id: str):

    session = interview_collection.find_one(
        {
            "_id": ObjectId(session_id)
        }
    )

    return session


# Update current question number
def update_current_question_number(
        session_id: str,
        question_number: int
):

     interview_collection.update_one(
        {
            "_id": ObjectId(session_id)
        },

        {
            "$set": {
                "current_question_number": question_number
            }
        }
    )
     
     
# Update session status
def update_session_status(
        session_id: str,
        status: str
):

    interview_collection.update_one(
        {
            "_id": ObjectId(session_id)
        },

        {
            "$set": {
                "status": status
            }
        }
    )
   
   
# This function is used to end an interview session by updating its status to "completed" and setting the ended_at timestamp. It also includes error handling to ensure that the session exists and is not already completed before attempting to update it. This can be useful for finalizing the interview process and preventing any further interactions with a completed session.
def end_interview_session(session_id: str, user_email: str = None):

    session = interview_collection.find_one(
        {"_id": ObjectId(session_id)}
    )

    if not session:
        raise HTTPException(
            status_code=404,
            detail="Interview session not found"
        )

    if user_email and session.get("user_email") != user_email:
        raise HTTPException(
            status_code=403,
            detail="Not authorized to end this interview"
        )

    if session.get("status") == "completed":
        raise HTTPException(
            status_code=400,
            detail="Interview already completed"
        )

    interview_collection.update_one(
        {"_id": ObjectId(session_id)},
        {
            "$set": {
                "status": "completed",
                "ended_at": datetime.utcnow()
            }
        }
    )

    return {
        "message": "Interview ended successfully",
        "session_id": session_id,
        "status": "completed"
    } 
    
