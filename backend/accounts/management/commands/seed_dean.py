from django.conf import settings
from django.core.management.base import BaseCommand

from accounts.models import User


class Command(BaseCommand):
    help = "Creates the single fixed dean account (username 'dean') if it doesn't exist."

    def handle(self, *args, **options):
        if User.objects.filter(role='dean').exists():
            self.stdout.write(self.style.WARNING('A dean account already exists — skipping.'))
            return

        User.objects.create_user(
            username='dean',
            password=settings.DEAN_PASSWORD,
            role='dean',
            name='Dean',
            is_staff=True,
            is_superuser=True,
        )
        self.stdout.write(self.style.SUCCESS(
            f"Dean account created (position: Dean, password: {settings.DEAN_PASSWORD})."
        ))
