from django.db import models
from django.contrib.auth.models import User


class TextPreprocessing(models.Model):
    raw_text = models.TextField()
    processed_text = models.TextField()
    attractiveness_score = models.FloatField(null=True, blank=True)
    domain = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='preprocessings')

    def __str__(self):
        return self.raw_text
