from django.urls import path
from . import views

urlpatterns = [
    path('triage/log/', views.LogTriageView.as_view()),
]
