import datetime

from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import User
from core.permissions import IsPatient, IsDean
from doctors.models import AvailabilityChangeLog
from doctors.services import slots_for_doctor_on_date
from notifications.services import notify_deans

from .models import AmbulanceRequest
from .serializers import AmbulanceRequestSerializer


class AmbulanceRequestView(APIView):
    # Deliberately open to unauthenticated visitors — an emergency shouldn't
    # require an account first.
    permission_classes = [AllowAny]

    def post(self, request):
        location = request.data.get('location', '')
        contact = request.data.get('contact', '')
        situation = request.data.get('situation', '')

        if not (location and contact and situation):
            return Response({'detail': 'location, contact and situation are required.'}, status=400)

        user = request.user if request.user.is_authenticated else None
        req = AmbulanceRequest.objects.create(
            requested_by=user,
            contact_name=user.name if user else '',
            contact=contact,
            location=location,
            situation=situation,
        )
        notify_deans(
            title='Ambulance requested',
            message=f"{req.contact_name or 'A visitor'} requested an ambulance at {location}.",
        )
        return Response(AmbulanceRequestSerializer(req).data, status=201)


class EmergencySlotBookingView(APIView):
    # Booking creates a real Appointment tied to a patient record, so this
    # does require a logged-in patient account. Anyone in true crisis should
    # use the ambulance option above instead, which needs no account.
    permission_classes = [IsPatient]

    def post(self, request):
        from appointments.models import Appointment

        today = datetime.date.today()
        emergency_doctors = User.objects.filter(
            role='doctor', specialty='Emergency Medicine', verified=True
        )

        for doctor in emergency_doctors:
            free_slots = slots_for_doctor_on_date(doctor, today, AvailabilityChangeLog, Appointment)
            if free_slots:
                appointment = Appointment.objects.create(
                    patient=request.user,
                    doctor=doctor,
                    date=today,
                    time=sorted(free_slots)[0],
                    mode='in-person',
                    is_emergency=True,
                )
                return Response(
                    {'doctor_name': doctor.name, 'time': appointment.time}, status=201
                )

        return Response(
            {'detail': 'No emergency doctor has an open slot right now — please use the ambulance option.'},
            status=400,
        )


class DeanEmergencyQueueView(generics.ListAPIView):
    permission_classes = [IsDean]
    serializer_class = AmbulanceRequestSerializer

    def get_queryset(self):
        return AmbulanceRequest.objects.filter(status='open')


class ResolveEmergencyView(APIView):
    permission_classes = [IsDean]

    def post(self, request, pk):
        req = get_object_or_404(AmbulanceRequest, pk=pk)
        req.status = 'resolved'
        req.save(update_fields=['status'])
        return Response(AmbulanceRequestSerializer(req).data)
