from app.services.interview_service import create_interview_session

from app.services.interview_service import (
    get_session_by_id,
    update_current_question_number,
    update_session_status
)

from app.services.gemini_service import (
    generate_adaptive_question
)

from app.services.question_bank_service import (
    find_existing_question,
    save_question_bank
)

from app.services.gemini_service import generate_interview_question

from app.services.question_service import save_question


async def start_interview_engine(
    interview_data,
    user_email
):

    session_id = create_interview_session(
        interview_data,
        user_email
    )

    existing_question = find_existing_question(
        interview_data["role"],
        interview_data["experience_level"],
        interview_data["tech_stack"]
    )

    if existing_question:

        question_text = existing_question["question"]

    else:

        question_text = await generate_interview_question(
            interview_data["role"],
            interview_data["experience_level"],
            interview_data["tech_stack"]
        )
        
        print(question_text)
        print(type(question_text))

        save_question_bank({

            "role": interview_data["role"],

            "experience_level":
                interview_data["experience_level"],

            "tech_stack":
                interview_data["tech_stack"],

            "question": question_text
        })

    question_id = save_question({

        "session_id": session_id,

        "question_number": 1,

        "question": question_text,

        "status": "asked"
    })

    return {

        "session_id": session_id,
        
        "question_id": question_id,

        "question": question_text
    }
    
    

from fastapi import HTTPException

#  This function generates the next question in the interview based on the current session and the difficulty level of the previous answer. It validates the session, checks if the interview is completed, generates a new question using an AI service, saves it, and updates the session progress.
async def generate_next_question(
        session_id: str,
        difficulty: str
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

    # Step 2 → Extract data
    role = session["role"]

    tech_stack = session["tech_stack"]

    current_question_number = session[
        "current_question_number"
    ]

    total_questions = session[
        "total_questions"
    ]

    # Step 3 → Check interview completed
    if current_question_number >= total_questions:

        update_session_status(
            session_id,
            "completed"
        )

        return {
            "completed": True,
            "message": "Interview completed"
        }

    # Step 4 → Generate adaptive question
    try:

        question_text = await generate_adaptive_question(
            role,
            tech_stack,
            difficulty
        )

    except Exception:

        raise HTTPException(
            status_code=500,
            detail="AI question generation failed"
        )

    # Step 5 → Increment number
    next_question_number = (
        current_question_number + 1
    )

    # Step 6 → Save question
    question_id = save_question({

        "session_id": session_id,

        "question_number":
            next_question_number,

        "question": question_text,

        "status": "asked"
    })

    # Step 7 → Update session progress
    update_current_question_number(
        session_id,
        next_question_number
    )

    # Step 8 → Return response
    return {

        "question_id": question_id,

        "next_question": question_text,

        "question_number":
            next_question_number
    }