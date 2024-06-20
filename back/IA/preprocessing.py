import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from PyPDF2 import PdfFileReader
from transformers import pipeline

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')


def preprocess_text(text):
    # Tokenize text
    words = word_tokenize(text)

    # Remove stop words
    stop_words = set(stopwords.words('english'))
    words = [word for word in words if word.lower() not in stop_words]

    # Lemmatize words
    lemmatizer = WordNetLemmatizer()
    words = [lemmatizer.lemmatize(word) for word in words]

    # Join words back into a single string
    processed_text = ' '.join(words)
    return processed_text


def extract_text_from_pdf(pdf_file):
    reader = PdfFileReader(pdf_file)
    text = ""
    for page_num in range(reader.getNumPages()):
        page = reader.getPage(page_num)
        text += page.extract_text()
    return text


# Charger le modèle Huggingface pour l'évaluation de l'attractivité et la détermination du domaine
attractiveness_model = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english", revision="af0f99b")
domain_model = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")


def evaluate_attractiveness(text):
    result = attractiveness_model(text)
    # Extrait le score de la réponse
    score = result[0]['score'] if result else 0.0
    return score


def determine_domain(text, candidate_labels):
    result = domain_model(text, candidate_labels)
    # Extrait le domaine ayant la plus haute probabilité
    domain = result['labels'][0] if result else "Unknown"
    return domain
