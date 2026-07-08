from django.contrib import admin
from .models import Appointment


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ['id', 'patient', 'doctor', 'date', 'time', 'mode', 'status', 'is_emergency']
    list_filter = ['status', 'mode', 'is_emergency']
