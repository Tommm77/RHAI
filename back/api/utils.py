import base64
from PyPDF2 import PdfReader
from io import BytesIO
import openai
from django.conf import settings


def decode_pdf(base64_string):
    pdf_bytes = base64.b64decode(base64_string)
    pdf = PdfReader(BytesIO(pdf_bytes))
    text = ""
    for page in pdf.pages:
        text += page.extract_text()
    return text


def get_cv_score_and_job(text):
    # Assurez-vous que la clé API est bien chargée
    openai.api_key = settings.OPENAI_API_KEY

    # Utilisez l'API OpenAI pour évaluer le texte
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"Analyze the following CV and provide a score out of 100 and determine the most relevant job title: {text}",
        max_tokens=200
    )

    # Parse the response
    result_text = response.choices[0].text.strip().split('\n')
    score = float(result_text[0].split(':')[1].strip())
    job_titles = result_text[1].split(':')[1].strip()

    return score, job_titles
