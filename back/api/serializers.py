from rest_framework import serializers
from .models import Cv, Profil, Candidature, Motivation


class CvSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cv
        fields = '__all__'


class ProfilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profil
        fields = '__all__'


class CandidatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidature
        fields = '__all__'


class MotivationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Motivation
        fields = '__all__'
