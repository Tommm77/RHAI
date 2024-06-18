from rest_framework import viewsets
from .models import Cv, Profil, Candidature, Motivation
from .serializers import CvSerializer, ProfilSerializer, CandidatureSerializer, MotivationSerializer


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
