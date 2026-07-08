from django.urls import path
from . import views

urlpatterns = [
    path('emergency/ambulance/', views.AmbulanceRequestView.as_view()),
    path('emergency/book-slot/', views.EmergencySlotBookingView.as_view()),
    path('dean/emergency-queue/', views.DeanEmergencyQueueView.as_view()),
    path('dean/emergency-queue/<int:pk>/resolve/', views.ResolveEmergencyView.as_view()),
]
