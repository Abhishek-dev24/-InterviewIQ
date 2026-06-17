from pydantic import BaseModel
from typing import List


class InterviewSummaryResponse(BaseModel):
    average_score: float
    total_questions: int
    performance_level: str
    feedbacks: List[str]