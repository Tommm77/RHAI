from rest_framework import serializers
from .models import TextPreprocessing


class TextPreprocessingSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = TextPreprocessing
        fields = ['id', 'raw_text', 'processed_text', 'created_at', 'author']
