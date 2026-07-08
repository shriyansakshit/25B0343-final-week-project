from django.conf import settings
from django.db import models


class AvailabilityChangeLog(models.Model):
    STATUS_CHOICES = [
        ('available', 'Added availability'),
        ('unavailable', 'Marked unavailable'),
    ]

    doctor = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='availability_changes'
    )
    date = models.DateField()
    status = models.CharField(max_length=12, choices=STATUS_CHOICES)
    note = models.TextField(blank=True)
    reverted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.doctor.name} - {self.date} - {self.status}"
