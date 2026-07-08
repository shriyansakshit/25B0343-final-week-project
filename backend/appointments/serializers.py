from rest_framework import serializers
from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    """Patient-facing view of their own appointments."""
    doctor_name = serializers.CharField(source='doctor.name', read_only=True)
    specialty = serializers.CharField(source='doctor.specialty', read_only=True)

    class Meta:
        model = Appointment
        fields = ['id', 'doctor', 'doctor_name', 'specialty', 'date', 'time', 'mode', 'status', 'is_emergency']
        read_only_fields = ['id', 'doctor_name', 'specialty', 'status', 'is_emergency']


class DeanAppointmentSerializer(serializers.ModelSerializer):
    """Hospital-wide view for the dean's oversight screen."""
    patient_name = serializers.CharField(source='patient.name', read_only=True)
    doctor_name = serializers.CharField(source='doctor.name', read_only=True)

    class Meta:
        model = Appointment
        fields = ['id', 'patient_name', 'doctor_name', 'date', 'time', 'mode', 'status', 'is_emergency']
