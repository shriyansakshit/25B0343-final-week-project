from rest_framework import serializers
from .models import TriageLog


class TriageLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = TriageLog
        fields = ['id', 'body_area', 'symptom', 'department', 'created_at']
