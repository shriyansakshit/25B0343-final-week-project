from django.contrib import admin
from .models import AmbulanceRequest


@admin.register(AmbulanceRequest)
class AmbulanceRequestAdmin(admin.ModelAdmin):
    list_display = ['id', 'contact_name', 'contact', 'location', 'status', 'created_at']
    list_filter = ['status']
