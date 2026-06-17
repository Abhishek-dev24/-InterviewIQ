from pydantic import BaseModel


class SubmitAnswerRequest(BaseModel):
    session_id: str
    question_id: str
    answer: str


class InterviewAnswer(BaseModel):
    session_id: str
    question_id: str
    question_text: str
    user_answer: str
    score: int
    feedback: str
    difficulty_assigned: str
    evaluation_status: str


class AnswerResponse(BaseModel):
    score: int
    feedback: str
    next_question: str
    question_number: int