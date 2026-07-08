from django.urls import path
from . import views

urlpatterns = [
    path('auth/signup/patient/', views.SignupPatientView.as_view()),
    path('auth/signup/doctor/', views.SignupDoctorView.as_view()),
    path('auth/login/', views.LoginView.as_view()),
    path('auth/logout/', views.LogoutView.as_view()),
    path('auth/me/', views.MeView.as_view()),
]
