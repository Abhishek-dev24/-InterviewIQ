from fastapi import HTTPException
from bson import ObjectId

from app.database.mongodb import db

from app.services.interview_engine import (
    generate_next_question
)

from app.services.interview_service import (
    get_session_by_id
)

from app.services.question_service import (
    verify_question_session
)

from app.services.answer_service import (
    save_answer,
    update_answer_evaluation,
    check_answer_exists
)

from app.services.evaluation_service import (
    evaluate_answer
)


async def process_answer(
        session_id: str,
        question_id: str,
        answer: str
):

    # Step 1 → Validate session
    session = get_session_by_id(
        session_id
    )

    if not session:
        raise HTTPException(
            status_code=404,
            detail="Interview session not found"
        )

    # Step 2 → Validate question belongs to session
    question = verify_question_session(
        question_id,
        session_id
    )

    if not question:
        raise HTTPException(
            status_code=400,
            detail="Invalid question for this session"
        )

    # Step 3 → Prevent duplicate answer
    existing_answer = check_answer_exists(
        session_id,
        question_id
    )

    if existing_answer:
        raise HTTPException(
            status_code=400,
            detail="Question already answered"
        )

    # Step 4 → Get question text
    question_text = question["question"]

    # Step 5 → Save raw answer
    answer_data = {
        "session_id": session_id,
        "question_id": question_id,
        "question_text": question_text,
        "user_answer": answer,
        "score": None,
        "feedback": None,
        "difficulty_assigned": None,
        "evaluation_status": "pending"
    }

    answer_id = save_answer(
        answer_data
    )

    # Step 6 → Evaluate answer safely
    try:

        evaluation = evaluate_answer(
            question_text,
            answer
        )

    except Exception as e:

        print("EVALUATION ERROR =", e)

        # rollback answer insert
        db.interview_answers.delete_one(
            {
                "_id": ObjectId(answer_id)
            }
        )

        raise HTTPException(
            status_code=500,
            detail="Answer evaluation failed"
        )

    # Step 7 → Extract difficulty
    difficulty = evaluation.get(
        "difficulty",
        "medium"
    )

    # Step 8 → Update answer evaluation
    update_answer_evaluation(
        answer_id,
        evaluation["score"],
        evaluation["feedback"],
        difficulty
    )

    # Step 9 → Generate adaptive next question
    next_question = await generate_next_question(
        session_id=session_id,
        difficulty=difficulty
    )

    # Step 10 → Return final response
    return {
        "score": evaluation["score"],
        "feedback": evaluation["feedback"],
        "next_question": next_question
    }