import google.generativeai as genai
import json
from app.core.config import settings

genai.configure(api_key=settings.gemini_api_key)


def evaluate_answer(
        question: str,
        answer: str
):

    prompt = f"""

You are a technical interviewer.

Evaluate candidate answer.

Question:
{question}

Candidate Answer:
{answer}

Rules:

1. Score from 1 to 10

2. Give short feedback

3. Decide next difficulty:
easy / medium / hard

Return ONLY valid JSON.

Format:

{{
  "score": number,
  "feedback": "text",
  "difficulty": "easy|medium|hard"
}}

"""

    try:

        model = genai.GenerativeModel(
            "gemini-2.5-flash"
        )

        response = model.generate_content(
            prompt
        )

        print("GEMINI RAW =", response.text)

        # Clean markdown formatting
        clean_text = response.text.strip()

        clean_text = clean_text.replace(
            "```json",
            ""
        )

        clean_text = clean_text.replace(
            "```",
            ""
        )

        clean_text = clean_text.strip()

        print("CLEAN JSON =", clean_text)

        result = json.loads(
            clean_text
        )

        return result

    except Exception as e:

        print("GEMINI ERROR =", e)

        raise Exception(
            f"Evaluation failed: {str(e)}"
        )