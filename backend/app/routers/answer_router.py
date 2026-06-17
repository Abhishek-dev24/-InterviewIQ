from fastapi import APIRouter, Depends

from app.models.answer_model import (
    SubmitAnswerRequest
)

from app.core.dependencies import (
    get_current_user
)

from app.services.answer_engine import (
    process_answer
)


router = APIRouter(
    prefix="/answer",
    tags=["Answer Engine"]
)


@router.post("/submit-answer")
async def submit_answer(
        request: SubmitAnswerRequest,
        current_user=Depends(get_current_user)
):

    result = await process_answer(
        request.session_id,
        request.question_id,
        request.answer
    )

    return result