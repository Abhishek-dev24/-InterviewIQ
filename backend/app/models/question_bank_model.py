from pydantic import BaseModel
from typing import List


class QuestionBank(BaseModel):
    role: str
    experience_level: str
    tech_stack: List[str]
    question: str