from fastapi import APIRouter, Depends

from app.models.interview_model import InterviewCreate

from app.services.interview_engine import start_interview_engine

from app.core.dependencies import get_current_user
from app.services.interview_service import (
    end_interview_session
)
from app.models.interview_model import (
    EndInterviewResponse
)
router = APIRouter()


@router.post("/start-interview")
async def start_interview(
    interview: InterviewCreate,
    current_user=Depends(get_current_user)
):

    response = await start_interview_engine(
        interview.dict(),
        current_user["email"]
    )

    return {
        "message": "Interview Started",
        "data": response
    }
    

@router.post(
    "/end-interview/{session_id}",
    response_model=EndInterviewResponse
)
async def end_interview(
    session_id: str,
    current_user=Depends(get_current_user)
):

    result = end_interview_session(
        session_id,
        current_user["email"]
    )

    return result