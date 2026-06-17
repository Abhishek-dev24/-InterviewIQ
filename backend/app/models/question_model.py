from pydantic import BaseModel


class QuestionCreate(BaseModel):

    session_id: str

    question_number: int

    question: str

    status: str