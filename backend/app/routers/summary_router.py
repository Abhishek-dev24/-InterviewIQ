from fastapi import APIRouter

from app.services.summary_engine import (
    get_interview_summary
)

from app.models.summary_model import (
    InterviewSummaryResponse
)

router = APIRouter(
    prefix="/api",
    tags=["Interview Summary"]
)


@router.get(
    "/interview-summary/{session_id}",
    response_model=InterviewSummaryResponse
)
async def interview_summary(session_id: str):

    summary = get_interview_summary(
        session_id
    )

    return summary