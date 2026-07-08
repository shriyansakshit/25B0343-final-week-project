from django.contrib import admin
from .models import AvailabilityChangeLog


@admin.register(AvailabilityChangeLog)
class AvailabilityChangeLogAdmin(admin.ModelAdmin):
    list_display = ['doctor', 'date', 'status', 'reverted', 'created_at']
    list_filter = ['status', 'reverted']
