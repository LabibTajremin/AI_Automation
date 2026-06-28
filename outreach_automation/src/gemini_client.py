import os
import time

import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

_MODEL_NAME = "gemini-1.5-flash"
_model = None


def get_model():
    global _model
    if _model is None:
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            raise RuntimeError(
                "GEMINI_API_KEY not set. Copy .env.example to .env and add your free key "
                "from https://aistudio.google.com/app/apikey"
            )
        genai.configure(api_key=api_key)
        _model = genai.GenerativeModel(_MODEL_NAME)
    return _model


def generate(prompt: str, retries: int = 3) -> str:
    model = get_model()
    last_error = None
    for attempt in range(retries):
        try:
            response = model.generate_content(prompt)
            return response.text.strip()
        except Exception as exc:
            last_error = exc
            time.sleep(2 ** attempt)
    raise RuntimeError(f"Gemini generation failed after {retries} attempts: {last_error}")
