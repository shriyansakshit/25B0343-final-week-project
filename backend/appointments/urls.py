from django.urls import path
from . import views

urlpatterns = [
    path('appointments/book/', views.BookAppointmentView.as_view()),
    path('appointments/mine/', views.MyAppointmentsView.as_view()),
    path('appointments/<int:pk>/cancel/', views.CancelAppointmentView.as_view()),
    path('dean/appointments/', views.AllAppointmentsView.as_view()),
]
