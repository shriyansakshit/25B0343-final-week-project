import datetime

from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import User
from core.permissions import IsPatient, IsDean
from doctors.models import AvailabilityChangeLog
from doctors.services import slots_for_doctor_on_date

from .models import Appointment
from .serializers import AppointmentSerializer, DeanAppointmentSerializer


class BookAppointmentView(APIView):
    permission_classes = [IsPatient]

    def post(self, request):
        doctor_id = request.data.get('doctor')
        date_str = request.data.get('date')
        time_str = request.data.get('time')
        mode = request.data.get('mode', 'in-person')

        if not (doctor_id and date_str and time_str):
            return Response({'detail': 'doctor, date and time are required.'}, status=400)

        doctor = get_object_or_404(User, pk=doctor_id, role='doctor', verified=True)
        date_obj = datetime.date.fromisoformat(date_str)

        # Re-check the slot is still genuinely open (handles race conditions
        # and blocks anything outside the doctor's actual availability).
        open_slots = slots_for_doctor_on_date(doctor, date_obj, AvailabilityChangeLog, Appointment)
        if time_str not in open_slots:
            return Response({'detail': 'That slot is no longer available — pick another.'}, status=400)

        appointment = Appointment.objects.create(
            patient=request.user, doctor=doctor, date=date_obj, time=time_str, mode=mode,
        )
        return Response(AppointmentSerializer(appointment).data, status=201)


class MyAppointmentsView(generics.ListAPIView):
    permission_classes = [IsPatient]
    serializer_class = AppointmentSerializer

    def get_queryset(self):
        return Appointment.objects.filter(patient=self.request.user)


class CancelAppointmentView(APIView):
    permission_classes = [IsPatient]

    def post(self, request, pk):
        appointment = get_object_or_404(Appointment, pk=pk, patient=request.user)
        appointment.status = 'cancelled'
        appointment.save(update_fields=['status'])
        return Response(AppointmentSerializer(appointment).data)


class AllAppointmentsView(generics.ListAPIView):
    permission_classes = [IsDean]
    serializer_class = DeanAppointmentSerializer
    queryset = Appointment.objects.all()
