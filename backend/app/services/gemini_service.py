import google.generativeai as genai
from app.core.config import settings


genai.configure(api_key=settings.gemini_api_key)


model = genai.GenerativeModel("gemini-2.5-flash")


async def generate_interview_question(
    role,
    experience_level,
    tech_stack
):

    prompt = f"""
    
    Generate ONE technical interview question.

    Role: {role}

    Experience Level: {experience_level}

    Tech Stack: {tech_stack}

    Rules:
    - Return only one question
    - Technical question only
    - No explanation
    
    """

    response = model.generate_content(prompt)

    return response.text


# Generate next question based on difficulty
async def generate_adaptive_question(
        role,
        tech_stack,
        difficulty
):
    prompt = f"""

    Generate ONE interview question.

    Role: {role}

    Tech Stack: {tech_stack}

    Difficulty Level: {difficulty}

    Rules:

    If difficulty = easy
    → Ask beginner level question

    If difficulty = medium
    → Ask intermediate question

    If difficulty = hard
    → Ask advanced question

    Return ONLY question text

    No explanation

    """

    response = model.generate_content(prompt)

    return response.text