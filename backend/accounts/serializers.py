from rest_framework import serializers
from .models import User


class PatientSignupSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=150)
    phone = serializers.CharField(max_length=20)
    address = serializers.CharField(allow_blank=False)
    password = serializers.CharField(min_length=4, write_only=True)


class DoctorSignupSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=150)
    specialty = serializers.CharField(max_length=120)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'role', 'name', 'phone', 'address', 'specialty', 'verified']
