from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.user_router import router as user_router
from app.routers.interview_router import router as interview_router

from app.routers.answer_router import router as answer_router
from app.routers.summary_router import router as summary_router
from app.routers.report_router import router as report_router

app = FastAPI(
    title="InterviewIQ API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "InterviewIQ Backend Running"
    }

@app.get("/health")
async def health():
    return {
        "status": "healthy"
    }

app.include_router(user_router, prefix="/api/users", tags=["Users"])

app.include_router(
    interview_router,
    prefix="/api/interview",
    
)

app.include_router(
    answer_router,
    prefix="/api"
)

app.include_router(summary_router)

app.include_router(
    report_router,
    prefix="/api"
)

