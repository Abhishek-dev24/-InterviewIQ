from pydantic import BaseModel, Field
from typing import List
from datetime import datetime


class ReportModel(BaseModel):

    session_id: str

    user_email: str

    overall_score: float

    strengths: List[str]

    weaknesses: List[str]

    communication_score: float

    technical_score: float

    confidence_level: str

    hiring_recommendation: str

    final_feedback: str

    created_at: datetime = Field(
        default_factory=datetime.utcnow
    )