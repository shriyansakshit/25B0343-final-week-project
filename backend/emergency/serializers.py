from rest_framework import serializers
from .models import AmbulanceRequest


class AmbulanceRequestSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()

    class Meta:
        model = AmbulanceRequest
        fields = ['id', 'type', 'contact_name', 'contact', 'location', 'situation', 'status', 'created_at']

    def get_type(self, obj):
        return 'ambulance'
