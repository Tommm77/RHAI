from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Cv, Profil, Candidature, Motivation
from .serializers import CvSerializer, ProfilSerializer, CandidatureSerializer, MotivationSerializer
from .utils import decode_pdf, get_cv_score_and_job, get_motivation_score


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


class EvaluateCV(APIView):
    @swagger_auto_schema(
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
    def post(self, request):
        base64_pdf = request.data.get('pdf')

        if not base64_pdf:
            return Response({'error': 'No PDF provided'}, status=status.HTTP_400_BAD_REQUEST)

        text = decode_pdf(base64_pdf)
        score, job_titles = get_cv_score_and_job(text)

        return Response({'score': score, 'job_titles': job_titles}, status=status.HTTP_200_OK)


class EvaluateMotivation(APIView):
    @swagger_auto_schema(
        operation_description="Upload a motivation letter in base64 format and get a score",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'pdf': openapi.Schema(type=openapi.TYPE_STRING, description='Base64 encoded PDF'),
            },
            required=['pdf']
        ),
        responses={
            200: openapi.Response(
                description="Motivation letter score",
                examples={
                    "application/json": {
                        "score": 90
                    }
                }
            ),
            400: "Bad Request",
            500: "Internal Server Error"
        },
        tags=['evaluate_motivation']
    )
    def post(self, request):
        base64_pdf = request.data.get('pdf')

        if not base64_pdf:
            return Response({'error': 'No PDF provided'}, status=status.HTTP_400_BAD_REQUEST)

        text = decode_pdf(base64_pdf)
        score = get_motivation_score(text)

        return Response({'score': score}, status=status.HTTP_200_OK)
