# answer_service.py ONLY handles database operations

from app.database.mongodb import db
from bson import ObjectId

# This service talks ONLY to interview_answers collection
def save_answer(answer_data: dict):

    result = db.interview_answers.insert_one(answer_data)

    return str(result.inserted_id)

# update the answer evalauation with score, feedback, and difficulty 
def update_answer_evaluation(
        answer_id: str,
        score: int,
        feedback: str,
        difficulty: str
):

     db.interview_answers.update_one(
        {"_id": ObjectId(answer_id)},
        {
            "$set": {
                "score": score,
                "feedback": feedback,
                "difficulty_assigned": difficulty,
                "evaluation_status": "evaluated"
            }
        }
    )
    

def get_answers_by_session(session_id: str):

    answers = list(
        db.interview_answers.find(
            {"session_id": session_id}
        )
    )

    return answers


# Check duplicate submission. This can be used to prevent users from submitting multiple answers for the same question, which can help maintain the integrity of the evaluation process and ensure that each question is answered only once per session.
def check_answer_exists(
        session_id: str,
        question_id: str
):

    answer = db.interview_answers.find_one(
        {
            "session_id": session_id,
            "question_id": question_id
        }
    )

    return answer