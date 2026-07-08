from accounts.models import User
from .models import Notification


def notify(user, title, message):
    return Notification.objects.create(recipient=user, title=title, message=message)


def notify_deans(title, message):
    deans = User.objects.filter(role='dean')
    Notification.objects.bulk_create([
        Notification(recipient=dean, title=title, message=message) for dean in deans
    ])
