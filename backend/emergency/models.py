from django.conf import settings
from django.db import models


class AmbulanceRequest(models.Model):
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('resolved', 'Resolved'),
    ]

    requested_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True
    )
    contact_name = models.CharField(max_length=150, blank=True)
    contact = models.CharField(max_length=30)
    location = models.CharField(max_length=255)
    situation = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='open')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"Ambulance request from {self.contact_name or 'guest'} ({self.status})"
