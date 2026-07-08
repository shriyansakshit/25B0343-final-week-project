from rest_framework import serializers
from accounts.models import User
from .models import AvailabilityChangeLog


class DoctorListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'specialty', 'verified']


class DoctorDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'specialty', 'verified', 'weekly_hours']


class AvailabilityLogSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source='doctor.name', read_only=True)

    class Meta:
        model = AvailabilityChangeLog
        fields = ['id', 'doctor', 'doctor_name', 'date', 'status', 'note', 'reverted', 'created_at']
        read_only_fields = ['id', 'doctor', 'doctor_name', 'reverted', 'created_at']
