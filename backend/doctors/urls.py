from django.urls import path
from . import views

urlpatterns = [
    path('doctors/', views.DoctorListView.as_view()),
    path('doctors/<int:pk>/', views.DoctorDetailView.as_view()),
    path('doctors/<int:pk>/slots/', views.DoctorSlotsView.as_view()),

    path('doctor/schedule/mine/', views.MyScheduleView.as_view()),
    path('doctor/availability/mine/', views.MyAvailabilityView.as_view()),
    path('doctor/availability/request/', views.AvailabilityRequestView.as_view()),

    path('dean/doctors/pending/', views.PendingDoctorsView.as_view()),
    path('dean/doctors/<int:pk>/verify/', views.VerifyDoctorView.as_view()),
    path('dean/doctors/<int:pk>/reject/', views.RejectDoctorView.as_view()),
    path('dean/availability-log/', views.AvailabilityLogListView.as_view()),
    path('dean/availability-log/<int:pk>/revert/', views.RevertAvailabilityView.as_view()),
]
