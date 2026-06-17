import google.generativeai as genai
import json
from app.core.config import settings


genai.configure(
    api_key=settings.GEMINI_API_KEY
)


def generate_ai_report(interview_data: list):

    model = genai.GenerativeModel(
        "gemini-2.5-flash"
    )

    prompt = f"""
    Analyze this interview performance.

    Interview Data:
    {interview_data}

    Return JSON format only.

    {{
        "strengths": ["point1", "point2"],
        "weaknesses": ["point1", "point2"],
        "final_recommendation": "text"
    }}
    """

    response = model.generate_content(
        prompt
    )

    clean_text = (
        response.text
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )

    result = json.loads(clean_text)

    return result