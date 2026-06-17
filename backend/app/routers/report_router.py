from fastapi import APIRouter, HTTPException

from app.services.report_engine import (
    generate_interview_report
)

from app.services.report_service import (
    get_report_by_session
)

# This router handles endpoints related to generating and retrieving interview reports. It provides functionality for candidates and interviewers to access detailed performance data, including questions, answers, and evaluations. The endpoints are designed to facilitate review and feedback processes in the interview workflow.
router = APIRouter(
    prefix="/report",
    tags=["Report"]
)

#  This endpoint generates a comprehensive interview report for a given session, including question details, candidate answers, and evaluations. It can be used by candidates to review their performance or by interviewers to assess the candidate's strengths and weaknesses.
@router.post(
    "/generate/{session_id}"
)
async def generate_report(
        session_id: str
):

    try:

        report = (
            await generate_interview_report(
                session_id
            )
        )

        return {
            "message":
                "Report Generated Successfully",

            "data":
                report
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


#  This endpoint retrieves the interview report for a specific session, allowing users to access their performance data and feedback. It can be used to review past interviews or to prepare for future ones.
@router.get(
    "/{session_id}"
)
def get_report(
        session_id: str
):

    report = (
        get_report_by_session(
            session_id
        )
    )

    if not report:

        raise HTTPException(
            status_code=404,
            detail="Report not found"
        )

    return {
        "data": report
    }