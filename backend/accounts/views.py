from django.utils.text import slugify
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from django.conf import settings

from .models import User
from .serializers import PatientSignupSerializer, DoctorSignupSerializer, UserSerializer


def _issue_session(user):
    token, _ = Token.objects.get_or_create(user=user)
    return {'token': token.key, 'user': UserSerializer(user).data}


class SignupPatientView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PatientSignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        if User.objects.filter(phone=data['phone']).exists():
            return Response(
                {'detail': 'An account with this phone number already exists.'},
                status=400,
            )

        user = User.objects.create_user(
            username=data['phone'],
            password=data['password'],
            role='patient',
            name=data['name'],
            phone=data['phone'],
            address=data['address'],
        )
        return Response(_issue_session(user), status=201)


class SignupDoctorView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = DoctorSignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        base_username = slugify(f"{data['name']}-{data['specialty']}") or 'doctor'
        username = base_username
        suffix = 2
        while User.objects.filter(username=username).exists():
            username = f"{base_username}-{suffix}"
            suffix += 1

        user = User.objects.create_user(
            username=username,
            password=settings.DOCTOR_SHARED_PASSWORD,
            role='doctor',
            name=data['name'],
            specialty=data['specialty'],
            verified=False,
        )
        return Response(_issue_session(user), status=201)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        role = request.data.get('role')
        password = request.data.get('password', '')

        if role == 'patient':
            phone = request.data.get('phone', '')
            user = User.objects.filter(role='patient', phone=phone).first()
        elif role == 'doctor':
            name = request.data.get('name', '').strip()
            specialty = request.data.get('specialty', '')
            user = User.objects.filter(
                role='doctor', name__iexact=name, specialty=specialty
            ).first()
        elif role == 'dean':
            user = User.objects.filter(role='dean').first()
        else:
            return Response({'detail': 'Unknown role.'}, status=400)

        if user is None or not user.check_password(password):
            return Response({'detail': 'Invalid credentials.'}, status=400)
        if not user.is_active:
            return Response({'detail': 'This account is inactive.'}, status=400)

        return Response(_issue_session(user))


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        Token.objects.filter(user=request.user).delete()
        return Response(status=204)


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)
