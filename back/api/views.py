from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
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


@swagger_auto_schema(
    method='post',
    operation_description="Upload a CV in base64 format and get a score and job titles",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'pdf': openapi.Schema(type=openapi.TYPE_STRING, description='Base64 encoded PDF'),
        },
        required=['pdf']
    ),
    responses={
        200: openapi.Response(
            description="CV score and job titles",
            examples={
                "application/json": {
                    "score": 85.0,
                    "job_titles": "Software Engineer"
                }
            }
        ),
        400: "Bad Request",
        500: "Internal Server Error"
    },
    tags=['evaluate_cv']
)
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
