from django.urls import path
from . import views

urlpatterns = [
    path('notifications/mine/', views.MyNotificationsView.as_view()),
]
