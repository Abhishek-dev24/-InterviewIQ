from app.database.mongodb import db
from bson import ObjectId

question_collection = db["interview_questions"]

# This service talks ONLY to interview_questions collection
def save_question(question_data: dict):

    result = question_collection.insert_one(
        question_data
    )

    return str(result.inserted_id)

# This function is used to fetch all questions for a given interview session, which can be useful for displaying the interview history or for review purposes.
def get_session_questions(session_id: str):

    questions = list(
        question_collection.find(
            {"session_id": session_id}
        )
    )

    return questions

# This function is not currently used but can be useful for future features like fetching a specific question by its ID for review or editing purposes.
def get_question_by_id(question_id: str):

    question = question_collection.find_one(
        {
            "_id": ObjectId(question_id)
        }
    )

    return question
# prupose of this function is to final exact question for a given session and question number, which can be useful for displaying the currentt question during an interview session or for review purpose .


# Verify question belongs to session
def verify_question_session(
        question_id: str,
        session_id: str
):

    question = question_collection.find_one(
        {
            "_id": ObjectId(question_id),
            "session_id": session_id
        }
    )

    return question