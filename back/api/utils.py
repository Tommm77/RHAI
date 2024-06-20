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
    classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

    labels = ["data scientist", "software engineer", "project manager", "designer"]
    result = classifier(text, candidate_labels=labels)

    job_titles = result['labels'][0]
    score = result['scores'][0] * 100

    return score, job_titles
