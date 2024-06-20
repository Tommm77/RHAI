from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Cv, Profil, Candidature, Motivation
from .serializers import CvSerializer, ProfilSerializer, CandidatureSerializer, MotivationSerializer
from .utils import decode_pdf, get_cv_score_and_job


class CvViewSet(viewsets.ModelViewSet):
    queryset = Cv.objects.all()
    serializer_class = CvSerializer


class ProfilViewSet(viewsets.ModelViewSet):
    queryset = Profil.objects.all()
    serializer_class = ProfilSerializer


class CandidatureViewSet(viewsets.ModelViewSet):
    queryset = Candidature.objects.all()
    serializer_class = CandidatureSerializer


class MotivationViewSet(viewsets.ModelViewSet):
    queryset = Motivation.objects.all()
    serializer_class = MotivationSerializer


@api_view(['POST'])
def evaluate_cv(request):
    try:
        base64_pdf = request.data.get('pdf')

        if not base64_pdf:
            return Response({'error': 'No PDF provided'}, status=status.HTTP_400_BAD_REQUEST)

        text = decode_pdf(base64_pdf)
        score, job_titles = get_cv_score_and_job(text)

        return Response({
            'score': score,
            'job_titles': job_titles
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
