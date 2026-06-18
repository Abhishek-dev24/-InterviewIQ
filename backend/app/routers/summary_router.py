from fastapi import APIRouter, Depends, HTTPException

from app.services.summary_engine import (
    get_interview_summary
)

from app.models.summary_model import (
    InterviewSummaryResponse
)

from app.core.dependencies import get_current_user
from app.services.interview_service import get_session_by_id

router = APIRouter(
    prefix="/api",
    tags=["Interview Summary"]
)


@router.get(
    "/interview-summary/{session_id}",
    response_model=InterviewSummaryResponse
)
async def interview_summary(
    session_id: str,
    current_user=Depends(get_current_user)
):

    session = get_session_by_id(session_id)

    if not session:
        raise HTTPException(
            status_code=404,
            detail="Interview session not found"
        )

    if session.get("user_email") != current_user["email"]:
        raise HTTPException(
            status_code=403,
            detail="Not authorized to view this summary"
        )

    summary = get_interview_summary(
        session_id
    )

    return summary