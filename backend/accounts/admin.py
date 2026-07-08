from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


class MeridianUserAdmin(UserAdmin):
    list_display = ['username', 'role', 'name', 'phone', 'specialty', 'verified', 'is_active']
    list_filter = ['role', 'verified', 'is_active']
    fieldsets = UserAdmin.fieldsets + (
        ('Hospital info', {
            'fields': ('role', 'name', 'phone', 'address', 'specialty', 'verified', 'weekly_hours'),
        }),
    )


admin.site.register(User, MeridianUserAdmin)
