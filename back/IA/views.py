from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from .models import TextPreprocessing
from .serializers import TextPreprocessingSerializer
from .preprocessing import (
    preprocess_text, extract_text_from_pdf,
    evaluate_attractiveness, determine_domain
)


class TextPreprocessingListCreate(generics.ListCreateAPIView):
    queryset = TextPreprocessing.objects.all()
    serializer_class = TextPreprocessingSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        pdf_file = self.request.FILES.get('file')
        raw_text = extract_text_from_pdf(pdf_file)
        processed_text = preprocess_text(raw_text)
        attractiveness_score = evaluate_attractiveness(processed_text)
        candidate_labels = ["Data Science", "Software Engineering", "Marketing", "Sales", "Management"]
        domain = determine_domain(processed_text, candidate_labels)
        serializer.save(author=self.request.user, raw_text=raw_text, processed_text=processed_text,
                        attractiveness_score=attractiveness_score, domain=domain)
