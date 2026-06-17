import google.generativeai as genai
from dotenv import load_dotenv
from os import getenv

load_dotenv()

genai.configure(api_key=getenv("GEMINI_API_KEY"))

for model in genai.list_models():
    print(model.name)