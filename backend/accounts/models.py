from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    ROLE_CHOICES = [
        ('patient', 'Patient'),
        ('doctor', 'Doctor'),
        ('dean', 'Dean'),
    ]

    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    # Shared display name (patients, doctors; dean defaults to "Dean")
    name = models.CharField(max_length=150, blank=True)

    # Patient-only fields
    phone = models.CharField(max_length=20, unique=True, null=True, blank=True)
    address = models.TextField(blank=True)

    # Doctor-only fields
    specialty = models.CharField(max_length=120, blank=True)
    verified = models.BooleanField(default=False)

    # Doctor's standard weekly hours, e.g. {"Mon": "9:00 AM - 1:00 PM", ...}
    # Days with no entry are treated as a day off.
    weekly_hours = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return f"{self.get_role_display()}: {self.name or self.username}"
