from pydantic import BaseModel
from typing import List



class InterviewCreate(BaseModel):

    role: str

    experience_level: str

    tech_stack: List[str]

    total_questions: int
    
    
class EndInterviewResponse(BaseModel):
    message: str
    session_id: str
    status: str