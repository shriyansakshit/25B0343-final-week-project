from django.conf import settings
from django.db import models


class TriageLog(models.Model):
    patient = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True
    )
    body_area = models.CharField(max_length=120)
    symptom = models.CharField(max_length=160)
    department = models.CharField(max_length=120)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.body_area} / {self.symptom} -> {self.department}"
