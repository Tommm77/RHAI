from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView

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
                        "task_id": "1234-5678-9012"
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
        completion = get_cv_score_and_job(text)

        return Response(completion, status=status.HTTP_200_OK)