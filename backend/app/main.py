from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pymongo.errors import PyMongoError, ServerSelectionTimeoutError

from app.routers.user_router import router as user_router
from app.routers.interview_router import router as interview_router
from app.routers.answer_router import router as answer_router
from app.routers.summary_router import router as summary_router
from app.routers.report_router import router as report_router
from app.database.mongodb import get_database_status

app = FastAPI(
    title="InterviewIQ API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(ServerSelectionTimeoutError)
async def mongodb_timeout_handler(
    request: Request,
    exc: ServerSelectionTimeoutError,
):
    return JSONResponse(
        status_code=503,
        content={
            "detail": (
                "Database unavailable. Start MongoDB locally or verify "
                "MONGO_URI / mongodb_url in backend/.env."
            )
        },
    )


@app.exception_handler(PyMongoError)
async def mongodb_error_handler(
    request: Request,
    exc: PyMongoError,
):
    return JSONResponse(
        status_code=503,
        content={
            "detail": "Database error. Please try again later.",
        },
    )


@app.on_event("startup")
async def verify_database_connection():
    status = get_database_status()
    if status["connected"]:
        print(
            f"MongoDB connected: database={status['database']} "
            f"host={status['url']}"
        )
    else:
        print(
            "WARNING: MongoDB connection failed on startup. "
            f"Auth and data routes will return 503 until fixed. "
            f"Error: {status['error']}"
        )


@app.get("/")
async def root():
    return {
        "message": "InterviewIQ Backend Running",
    }


@app.get("/health")
async def health():
    db_status = get_database_status()

    return {
        "status": "healthy" if db_status["connected"] else "degraded",
        "database": db_status,
    }


app.include_router(user_router, prefix="/api/users", tags=["Users"])

app.include_router(
    interview_router,
    prefix="/api/interview",
)

app.include_router(
    answer_router,
    prefix="/api",
)

app.include_router(summary_router)

app.include_router(
    report_router,
    prefix="/api",
)
