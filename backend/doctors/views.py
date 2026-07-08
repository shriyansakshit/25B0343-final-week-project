import datetime

from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import User
from accounts.serializers import UserSerializer
from core.permissions import IsDoctor, IsDean
from notifications.services import notify, notify_deans

from .models import AvailabilityChangeLog
from .serializers import DoctorListSerializer, DoctorDetailSerializer, AvailabilityLogSerializer
from .services import slots_for_doctor_on_date


class DoctorListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = DoctorListSerializer

    def get_queryset(self):
        qs = User.objects.filter(role='doctor', verified=True)
        department = self.request.query_params.get('department')
        if department:
            qs = qs.filter(specialty=department)
        return qs.order_by('name')


class DoctorDetailView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = DoctorDetailSerializer
    queryset = User.objects.filter(role='doctor')


class DoctorSlotsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        from appointments.models import Appointment

        doctor = get_object_or_404(User, pk=pk, role='doctor')
        date_str = request.query_params.get('date')
        if not date_str:
            return Response({'detail': 'date query param is required.'}, status=400)

        date_obj = datetime.date.fromisoformat(date_str)
        slots = slots_for_doctor_on_date(doctor, date_obj, AvailabilityChangeLog, Appointment)
        return Response({'slots': slots})


class MyScheduleView(APIView):
    permission_classes = [IsDoctor]

    def get(self, request):
        from appointments.models import Appointment

        today = datetime.date.today()
        todays_appointments = Appointment.objects.filter(
            doctor=request.user, date=today, status='confirmed'
        ).order_by('time')

        today_data = [
            {'id': a.id, 'patient_name': a.patient.name, 'time': a.time, 'mode': a.mode}
            for a in todays_appointments
        ]
        return Response({'weekly': request.user.weekly_hours or {}, 'today': today_data})


class MyAvailabilityView(generics.ListAPIView):
    permission_classes = [IsDoctor]
    serializer_class = AvailabilityLogSerializer

    def get_queryset(self):
        return AvailabilityChangeLog.objects.filter(doctor=self.request.user)


class AvailabilityRequestView(APIView):
    permission_classes = [IsDoctor]

    def post(self, request):
        date_str = request.data.get('date')
        status_val = request.data.get('status')
        note = request.data.get('note', '')

        if status_val not in ('available', 'unavailable'):
            return Response({'detail': 'status must be "available" or "unavailable".'}, status=400)
        if not date_str:
            return Response({'detail': 'date is required.'}, status=400)

        date_obj = datetime.date.fromisoformat(date_str)
        log = AvailabilityChangeLog.objects.create(
            doctor=request.user, date=date_obj, status=status_val, note=note,
        )

        action = 'added extra availability' if status_val == 'available' else 'marked unavailable'
        notify_deans(
            title=f"{request.user.name} updated availability",
            message=f"{request.user.name} {action} for {date_obj.isoformat()}: {note}",
        )
        return Response(AvailabilityLogSerializer(log).data, status=201)


class PendingDoctorsView(generics.ListAPIView):
    permission_classes = [IsDean]
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(role='doctor', verified=False).order_by('-date_joined')


class VerifyDoctorView(APIView):
    permission_classes = [IsDean]

    def post(self, request, pk):
        doctor = get_object_or_404(User, pk=pk, role='doctor')
        doctor.verified = True
        doctor.save(update_fields=['verified'])
        notify(doctor, 'Account verified', 'The dean has verified your account — you now appear in the doctor directory.')
        return Response(UserSerializer(doctor).data)


class RejectDoctorView(APIView):
    permission_classes = [IsDean]

    def post(self, request, pk):
        doctor = get_object_or_404(User, pk=pk, role='doctor', verified=False)
        doctor.delete()
        return Response(status=204)


class AvailabilityLogListView(generics.ListAPIView):
    permission_classes = [IsDean]
    serializer_class = AvailabilityLogSerializer
    queryset = AvailabilityChangeLog.objects.all()


class RevertAvailabilityView(APIView):
    permission_classes = [IsDean]

    def post(self, request, pk):
        log = get_object_or_404(AvailabilityChangeLog, pk=pk)
        log.reverted = True
        log.save(update_fields=['reverted'])
        notify(
            log.doctor,
            'Availability change reverted',
            f"The dean reverted your {log.get_status_display().lower()} entry for {log.date.isoformat()}.",
        )
        return Response(AvailabilityLogSerializer(log).data)
