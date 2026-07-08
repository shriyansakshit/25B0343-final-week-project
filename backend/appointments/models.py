from django.conf import settings
from django.db import models


class Appointment(models.Model):
    MODE_CHOICES = [
        ('in-person', 'In person'),
        ('online', 'Online'),
    ]
    STATUS_CHOICES = [
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]

    patient = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='patient_appointments'
    )
    doctor = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='doctor_appointments'
    )
    date = models.DateField()
    time = models.CharField(max_length=5)  # 24h "HH:MM"
    mode = models.CharField(max_length=10, choices=MODE_CHOICES, default='in-person')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='confirmed')
    is_emergency = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date', '-time']

    def __str__(self):
        return f"{self.patient.name} with {self.doctor.name} on {self.date} {self.time}"
