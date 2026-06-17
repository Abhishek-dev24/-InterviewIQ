from fastapi import HTTPException
from app.database.mongodb import db


def get_interview_summary(session_id: str):

    answers = list(
        db.interview_answers.find(
            {"session_id": session_id}
        )
    )

    if not answers:
        raise HTTPException(
            status_code=404,
            detail="No interview answers found"
        )

    total_questions = len(answers)

    scores = [
        answer.get("score", 0)
        for answer in answers
    ]

    feedbacks = [
        answer.get("feedback")
        for answer in answers
        if answer.get("feedback")
    ]

    average_score = round(
        sum(scores) / total_questions,
        1
    )

    performance_level = _calculate_performance(
        average_score
    )

    return {
        "average_score": average_score,
        "total_questions": total_questions,
        "performance_level": performance_level,
        "feedbacks": feedbacks
    }


def _calculate_performance(score: float):

    if score <= 4:
        return "Poor"

    elif score <= 7:
        return "Average"

    return "Good"