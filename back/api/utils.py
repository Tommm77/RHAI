import base64
from PyPDF2 import PdfReader
from io import BytesIO
from openai import OpenAI
from django.conf import settings
import json


# Déjà existantes
def decode_pdf(base64_string):
    pdf_bytes = base64.b64decode(base64_string)
    pdf = PdfReader(BytesIO(pdf_bytes))
    text = ""
    for page in pdf.pages:
        text += page.extract_text()
    return text


def get_cv_score_and_job(text):
    # Assurez-vous que la clé API est bien chargée
    client = OpenAI(api_key=settings.OPENAI_API_KEY)

    # Utilisez la nouvelle API OpenAI pour évaluer le texte
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user",
             "content": f"Analyze the following CV and provide a score out of 100 and the most relevant job title. Respond in JSON format with 'score' and 'job_titles' as keys. Here is the CV: {text}"}
        ],
        max_tokens=100  # Limitez le nombre de tokens pour éviter les réponses trop longues
    )

    # Parse the JSON response encapsulated in the response text
    response_text = completion.choices[0].message.content.strip()
    json_str = response_text.strip('```json').strip('```').strip()
    response_json = json.loads(json_str)
    score = response_json.get('score')
    job_titles = response_json.get('job_titles')

    return score, job_titles


# Nouvelle fonction pour les lettres de motivation
def get_motivation_score(text):
    # Assurez-vous que la clé API est bien chargée
    client = OpenAI(api_key=settings.OPENAI_API_KEY)

    # Utilisez la nouvelle API OpenAI pour évaluer le texte
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user",
             "content": f"Analyze the following motivation letter and provide a score out of 100. Respond in JSON format with 'score' as key. Here is the letter: {text}"}
        ],
        max_tokens=100  # Limitez le nombre de tokens pour éviter les réponses trop longues
    )

    # Parse the JSON response encapsulated in the response text
    response_text = completion.choices[0].message.content.strip()
    json_str = response_text.strip('```json').strip('```').strip()
    response_json = json.loads(json_str)
    score = response_json.get('score')

    return score
