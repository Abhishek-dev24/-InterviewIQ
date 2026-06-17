from app.services.report_service import (
    save_interview_report,
    get_report_by_session
)

from app.services.answer_service import (
    get_answers_by_session
)

from app.services.question_service import (
    get_session_questions
)

from app.services.interview_service import (
    get_session_by_id
)

from app.services.analytics_service import (
    calculate_average_score,
    calculate_overall_score,
    extract_difficulty_progression
)

from app.services.gemini_report_service import (
    generate_ai_report
)


def generate_interview_report(session_id: str):
    """
    Generate final interview analytics report
    """

    # ---------------------------------------------------
    # STEP 1 → Check cached report
    # ---------------------------------------------------

    existing_report = get_report_by_session(
        session_id
    )

    if existing_report:

        # If report already completed, return directly
        if existing_report.get("report_status") == "completed":
            return existing_report

    # ---------------------------------------------------
    # STEP 2 → Validate session
    # ---------------------------------------------------

    session = get_session_by_id(
        session_id
    )

    if not session:
        raise Exception(
            "Interview session not found"
        )

    user_email = session["user_email"]

    # ---------------------------------------------------
    # STEP 3 → Fetch answers
    # ---------------------------------------------------

    answer_documents = get_answers_by_session(
        session_id
    )

    if not answer_documents:
        raise Exception(
            "No interview answers found"
        )

    # ---------------------------------------------------
    # STEP 4 → Fetch questions
    # ---------------------------------------------------

    question_documents = get_session_questions(
        session_id
    )

    if not question_documents:
        raise Exception(
            "No interview questions found"
        )

    # ---------------------------------------------------
    # STEP 5 → Calculate average score
    # ---------------------------------------------------

    average_score = calculate_average_score(
        answer_documents
    )

    # ---------------------------------------------------
    # STEP 6 → Calculate overall score
    # ---------------------------------------------------

    overall_score = calculate_overall_score(
        answer_documents
    )

    # ---------------------------------------------------
    # STEP 7 → Difficulty progression
    # ---------------------------------------------------

    difficulty_progression = (
        extract_difficulty_progression(
            question_documents
        )
    )

    total_questions = len(
        question_documents
    )

    # ---------------------------------------------------
    # STEP 8 → Build interview data for Gemini
    # ---------------------------------------------------

    interview_data = []

    for index in range(
            len(answer_documents)
    ):

        question = ""

        if index < len(question_documents):
            question = question_documents[
                index
            ].get("question", "")

        interview_data.append({

            "question": question,

            "answer": answer_documents[
                index
            ].get("answer", ""),

            "score": answer_documents[
                index
            ].get("score", 0)
        })

    # ---------------------------------------------------
    # STEP 9 → Try Gemini AI report
    # ---------------------------------------------------

    try:

        ai_report = generate_ai_report(
            interview_data
        )

        # ---------------------------------------------------
        # STEP 10 → Build completed report
        # ---------------------------------------------------

        report_data = {

            "session_id": session_id,

            "user_email": user_email,

            "average_score": average_score,

            "overall_score": overall_score,

            "total_questions": total_questions,

            "difficulty_progression":
                difficulty_progression,

            "strengths":
                ai_report["strengths"],

            "weaknesses":
                ai_report["weaknesses"],

            "final_recommendation":
                ai_report[
                    "final_recommendation"
                ],

            "report_status":
                "completed"
        }

    except Exception:

        # ---------------------------------------------------
        # STEP 11 → Gemini failed → save partial report
        # ---------------------------------------------------

        report_data = {

            "session_id": session_id,

            "user_email": user_email,

            "average_score": average_score,

            "overall_score": overall_score,

            "total_questions": total_questions,

            "difficulty_progression":
                difficulty_progression,

            "strengths": None,

            "weaknesses": None,

            "final_recommendation": None,

            "report_status":
                "partial"
        }

    # ---------------------------------------------------
    # STEP 12 → Save report
    # ---------------------------------------------------

    save_interview_report(
        report_data
    )

    # ---------------------------------------------------
    # STEP 13 → Return report
    # ---------------------------------------------------

    return report_data