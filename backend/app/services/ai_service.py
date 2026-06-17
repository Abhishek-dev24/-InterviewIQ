from openai import OpenAI
from app.core.config import settings

client = OpenAI(api_key=settings.openai_api_key)


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
    - Question should match experience level
    - Question should be technical
    - Do not return explanation
    
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    question = response.choices[0].message.content

    return question