import base64
from PyPDF2 import PdfFileReader
from io import BytesIO
from transformers import pipeline


def decode_pdf(base64_string):
    pdf_bytes = base64.b64decode(base64_string)
    pdf = PdfFileReader(BytesIO(pdf_bytes))
    text = ""
    for page_num in range(pdf.numPages):
        page = pdf.getPage(page_num)
        text += page.extractText()
    return text


def get_cv_score_and_job(text):
    # Utilisez un modèle pré-entraîné pour l'analyse de texte
    classifier = pipeline("zero-shot-classification")

    # Définir les labels comme des exemples de ce que vous cherchez
    labels = ["data scientist", "software engineer", "project manager", "designer"]

    # Effectuer la classification
    result = classifier(text, candidate_labels=labels)

    # Extraire le poste visé
    job_titles = result['labels'][0]

    # Calculer un score fictif (vous pouvez personnaliser cela)
    score = result['scores'][0] * 100

    return score, job_titles
