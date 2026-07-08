from django.conf import settings
from django.core.management.base import BaseCommand

from accounts.models import User

SAMPLE_DOCTORS = [
    {
        'name': 'Dr. Ananya Rao',
        'specialty': 'General Medicine',
        'weekly_hours': {'Mon': '9:00 AM - 1:00 PM', 'Wed': '9:00 AM - 1:00 PM', 'Fri': '9:00 AM - 1:00 PM'},
    },
    {
        'name': 'Dr. Vikram Nair',
        'specialty': 'Cardiology',
        'weekly_hours': {'Tue': '10:00 AM - 2:00 PM', 'Thu': '10:00 AM - 2:00 PM'},
    },
    {
        'name': 'Dr. Priya Menon',
        'specialty': 'Pediatrics',
        'weekly_hours': {'Mon': '2:00 PM - 6:00 PM', 'Tue': '2:00 PM - 6:00 PM', 'Thu': '2:00 PM - 6:00 PM'},
    },
    {
        'name': 'Dr. Sanjay Iyer',
        'specialty': 'Orthopedics',
        'weekly_hours': {'Wed': '11:00 AM - 3:00 PM', 'Sat': '9:00 AM - 12:00 PM'},
    },
    {
        'name': 'Dr. Meera Pillai',
        'specialty': 'Emergency Medicine',
        'weekly_hours': {
            'Mon': '12:00 AM - 11:59 PM', 'Tue': '12:00 AM - 11:59 PM', 'Wed': '12:00 AM - 11:59 PM',
            'Thu': '12:00 AM - 11:59 PM', 'Fri': '12:00 AM - 11:59 PM', 'Sat': '12:00 AM - 11:59 PM',
            'Sun': '12:00 AM - 11:59 PM',
        },
    },
    {
        'name': 'Dr. Rohan Deshmukh',
        'specialty': 'Dermatology',
        'weekly_hours': {'Mon': '9:00 AM - 1:00 PM', 'Wed': '9:00 AM - 1:00 PM', 'Fri': '9:00 AM - 1:00 PM'},
    },
    {
        'name': 'Dr. Kavita Sharma',
        'specialty': 'Gynecology',
        'weekly_hours': {'Tue': '2:00 PM - 6:00 PM', 'Thu': '2:00 PM - 6:00 PM', 'Sat': '9:00 AM - 1:00 PM'},
    },
    {
        'name': 'Dr. Arshad Khan',
        'specialty': 'ENT (Ear, Nose & Throat)',
        'weekly_hours': {'Mon': '10:00 AM - 2:00 PM', 'Wed': '10:00 AM - 2:00 PM', 'Thu': '10:00 AM - 2:00 PM'},
    },
    {
        'name': 'Dr. Shalini Reddy',
        'specialty': 'Neurology',
        'weekly_hours': {'Tue': '4:00 PM - 8:00 PM', 'Fri': '4:00 PM - 8:00 PM'},
    },
    {
        'name': 'Dr. Amit Joshi',
        'specialty': 'Ophthalmology',
        'weekly_hours': {'Mon': '9:00 AM - 12:00 PM', 'Tue': '9:00 AM - 12:00 PM', 'Wed': '9:00 AM - 12:00 PM', 'Thu': '9:00 AM - 12:00 PM'},
    },
    {
        'name': 'Dr. Sunita Kapoor',
        'specialty': 'Psychiatry',
        'weekly_hours': {'Wed': '3:00 PM - 7:00 PM', 'Sat': '2:00 PM - 6:00 PM'},
    },
    {
        'name': 'Dr. Rajesh Verma',
        'specialty': 'Dentistry',
        'weekly_hours': {'Mon': '11:00 AM - 3:00 PM', 'Tue': '11:00 AM - 3:00 PM', 'Thu': '11:00 AM - 3:00 PM', 'Fri': '11:00 AM - 3:00 PM'},
    },
    {
        'name': 'Dr. Neha Malhotra',
        'specialty': 'General Medicine',
        'weekly_hours': {'Tue': '9:00 AM - 1:00 PM', 'Thu': '9:00 AM - 1:00 PM', 'Sat': '9:00 AM - 1:00 PM'},
    },
    {
        'name': 'Dr. Vivek Saxena',
        'specialty': 'Cardiology',
        'weekly_hours': {'Mon': '1:00 PM - 5:00 PM', 'Wed': '1:00 PM - 5:00 PM', 'Fri': '1:00 PM - 5:00 PM'},
    },
    {
        'name': 'Dr. Sandeep Hegde',
        'specialty': 'Orthopedics',
        'weekly_hours': {'Tue': '10:00 AM - 2:00 PM', 'Thu': '10:00 AM - 2:00 PM', 'Sat': '2:00 PM - 6:00 PM'},
    },
    {
        'name': 'Dr. Pooja Choudhary',
        'specialty': 'Pediatrics',
        'weekly_hours': {'Mon': '9:00 AM - 1:00 PM', 'Wed': '2:00 PM - 6:00 PM', 'Fri': '9:00 AM - 1:00 PM'},
    },
    {
        'name': 'Dr. Nitin Mishra',
        'specialty': 'Dermatology',
        'weekly_hours': {'Tue': '3:00 PM - 7:00 PM', 'Thu': '3:00 PM - 7:00 PM'},
    },
    {
        'name': 'Dr. Divya Teja',
        'specialty': 'Gynecology',
        'weekly_hours': {'Mon': '2:00 PM - 6:00 PM', 'Wed': '2:00 PM - 6:00 PM', 'Fri': '2:00 PM - 6:00 PM'},
    },
    {
        'name': 'Dr. Alok Tripathi',
        'specialty': 'ENT (Ear, Nose & Throat)',
        'weekly_hours': {'Tue': '9:00 AM - 1:00 PM', 'Fri': '10:00 AM - 2:00 PM', 'Sat': '10:00 AM - 2:00 PM'},
    },
    {
        'name': 'Dr. Kiran Mazumdar',
        'specialty': 'Neurology',
        'weekly_hours': {'Mon': '3:00 PM - 7:00 PM', 'Wed': '3:00 PM - 7:00 PM'},
    },
    {
        'name': 'Dr. Rahul Bose',
        'specialty': 'Ophthalmology',
        'weekly_hours': {'Tue': '1:00 PM - 5:00 PM', 'Thu': '1:00 PM - 5:00 PM', 'Sat': '9:00 AM - 1:00 PM'},
    },
    {
        'name': 'Dr. Meenakshi Iyer',
        'specialty': 'Psychiatry',
        'weekly_hours': {'Mon': '4:00 PM - 8:00 PM', 'Thu': '4:00 PM - 8:00 PM'},
    },
    {
        'name': 'Dr. Gaganpreet Singh',
        'specialty': 'Dentistry',
        'weekly_hours': {'Wed': '9:00 AM - 1:00 PM', 'Fri': '9:00 AM - 1:00 PM', 'Sat': '3:00 PM - 7:00 PM'},
    },
    {
        'name': 'Dr. Anjali Desai',
        'specialty': 'General Medicine',
        'weekly_hours': {'Mon': '2:00 PM - 6:00 PM', 'Wed': '2:00 PM - 6:00 PM', 'Fri': '2:00 PM - 6:00 PM'},
    },
    {
        'name': 'Dr. Abhay Deol',
        'specialty': 'Cardiology',
        'weekly_hours': {'Tue': '9:00 AM - 1:00 PM', 'Thu': '9:00 AM - 1:00 PM', 'Sat': '9:00 AM - 1:00 PM'},
    },
    {
        'name': 'Dr. Preeti Shenoy',
        'specialty': 'Orthopedics',
        'weekly_hours': {'Mon': '10:00 AM - 2:00 PM', 'Thu': '3:00 PM - 7:00 PM'},
    },
    {
        'name': 'Dr. Manoj Bajpayee',
        'specialty': 'Pediatrics',
        'weekly_hours': {'Tue': '9:00 AM - 1:00 PM', 'Wed': '9:00 AM - 1:00 PM', 'Thu': '9:00 AM - 1:00 PM'},
    },
    {
        'name': 'Dr. Swati Piramal',
        'specialty': 'Dermatology',
        'weekly_hours': {'Mon': '4:00 PM - 8:00 PM', 'Fri': '4:00 PM - 8:00 PM'},
    },
    {
        'name': 'Dr. Deepak Shetty',
        'specialty': 'Gynecology',
        'weekly_hours': {'Wed': '10:00 AM - 2:00 PM', 'Thu': '10:00 AM - 2:00 PM', 'Sat': '11:00 AM - 3:00 PM'},
    },
    {
        'name': 'Dr. Ritu Karidhal',
        'specialty': 'ENT (Ear, Nose & Throat)',
        'weekly_hours': {'Mon': '1:00 PM - 5:00 PM', 'Wed': '1:00 PM - 5:00 PM'},
    },
    {
        'name': 'Dr. Suresh Raina',
        'specialty': 'Neurology',
        'weekly_hours': {'Tue': '11:00 AM - 3:00 PM', 'Thu': '11:00 AM - 3:00 PM'},
    },
    {
        'name': 'Dr. Pallavi Joshi',
        'specialty': 'Ophthalmology',
        'weekly_hours': {'Mon': '2:00 PM - 6:00 PM', 'Wed': '9:00 AM - 1:00 PM', 'Fri': '2:00 PM - 6:00 PM'},
    },
    {
        'name': 'Dr. Vinay Pathak',
        'specialty': 'Psychiatry',
        'weekly_hours': {'Tue': '10:00 AM - 2:00 PM', 'Fri': '10:00 AM - 2:00 PM'},
    },
    {
        'name': 'Dr. Shruti Haasan',
        'specialty': 'Dentistry',
        'weekly_hours': {'Mon': '9:00 AM - 1:00 PM', 'Wed': '9:00 AM - 1:00 PM', 'Fri': '3:00 PM - 7:00 PM'},
    },
    {
        'name': 'Dr. Harish Salve',
        'specialty': 'General Medicine',
        'weekly_hours': {'Tue': '2:00 PM - 6:00 PM', 'Thu': '2:00 PM - 6:00 PM', 'Sat': '2:00 PM - 6:00 PM'},
    },
    {
        'name': 'Dr. Archana Bhattacharya',
        'specialty': 'Cardiology',
        'weekly_hours': {'Mon': '4:00 PM - 8:00 PM', 'Wed': '4:00 PM - 8:00 PM'},
    },
    {
        'name': 'Dr. Pranav Mistry',
        'specialty': 'Orthopedics',
        'weekly_hours': {'Tue': '1:00 PM - 5:00 PM', 'Fri': '1:00 PM - 5:00 PM', 'Sat': '9:00 AM - 1:00 PM'},
    },
    {
        'name': 'Dr. Tanvi Shah',
        'specialty': 'Pediatrics',
        'weekly_hours': {'Mon': '3:00 PM - 7:00 PM', 'Wed': '3:00 PM - 7:00 PM', 'Sat': '10:00 AM - 2:00 PM'},
    },
    {
        'name': 'Dr. Kunal Kamra',
        'specialty': 'Dermatology',
        'weekly_hours': {'Wed': '9:00 AM - 1:00 PM', 'Thu': '9:00 AM - 1:00 PM', 'Fri': '9:00 AM - 1:00 PM'},
    },
    {
        'name': 'Dr. Radhika Apte',
        'specialty': 'Gynecology',
        'weekly_hours': {'Mon': '9:00 AM - 1:00 PM', 'Tue': '9:00 AM - 1:00 PM', 'Thu': '4:00 PM - 8:00 PM'},
    },
    {
        'name': 'Dr. Milind Soman',
        'specialty': 'ENT (Ear, Nose & Throat)',
        'weekly_hours': {'Tue': '2:00 PM - 6:00 PM', 'Sat': '9:00 AM - 1:00 PM'},
    },
    {
        'name': 'Dr. Vidya Balan',
        'specialty': 'Neurology',
        'weekly_hours': {'Wed': '10:00 AM - 2:00 PM', 'Fri': '10:00 AM - 2:00 PM'},
    },
    {
        'name': 'Dr. Chetan Bhagat',
        'specialty': 'Ophthalmology',
        'weekly_hours': {'Mon': '4:00 PM - 8:00 PM', 'Thu': '4:00 PM - 8:00 PM'},
    },
    {
        'name': 'Dr. Arundhati Roy',
        'specialty': 'Psychiatry',
        'weekly_hours': {'Tue': '1:00 PM - 5:00 PM', 'Sat': '1:00 PM - 5:00 PM'},
    },
    {
        'name': 'Dr. Raghuram Rajan',
        'specialty': 'Dentistry',
        'weekly_hours': {'Mon': '10:00 AM - 2:00 PM', 'Wed': '10:00 AM - 2:00 PM', 'Fri': '10:00 AM - 2:00 PM'},
    },
    {
        'name': 'Dr. Sudha Murty',
        'specialty': 'General Medicine',
        'weekly_hours': {'Mon': '9:00 AM - 12:00 PM', 'Wed': '9:00 AM - 12:00 PM', 'Fri': '9:00 AM - 12:00 PM', 'Sat': '9:00 AM - 12:00 PM'},
    },
    {
        'name': 'Dr. Shashi Tharoor',
        'specialty': 'Cardiology',
        'weekly_hours': {'Tue': '3:00 PM - 7:00 PM', 'Thu': '3:00 PM - 7:00 PM'},
    },
    {
        'name': 'Dr. Kiran Bedi',
        'specialty': 'Orthopedics',
        'weekly_hours': {'Mon': '2:00 PM - 6:00 PM', 'Wed': '2:00 PM - 6:00 PM', 'Fri': '10:00 AM - 2:00 PM'},
    },
    {
        'name': 'Dr. Kailash Satyarthi',
        'specialty': 'Pediatrics',
        'weekly_hours': {'Tue': '4:00 PM - 8:00 PM', 'Thu': '4:00 PM - 8:00 PM', 'Sat': '3:00 PM - 7:00 PM'},
    },
    {
        'name': 'Dr. Mary Kom',
        'specialty': 'Emergency Medicine',
        'weekly_hours': {'Mon': '9:00 AM - 5:00 PM', 'Tue': '9:00 AM - 5:00 PM', 'Wed': '9:00 AM - 5:00 PM', 'Thu': '9:00 AM - 5:00 PM'},
    },
]


class Command(BaseCommand):
    help = 'Creates a handful of pre-verified sample doctors so booking can be demoed immediately.'

    def handle(self, *args, **options):
        created = 0
        for entry in SAMPLE_DOCTORS:
            username = entry['name'].lower().replace(' ', '-').replace('.', '')
            if User.objects.filter(username=username).exists():
                continue
            User.objects.create_user(
                username=username,
                password=settings.DOCTOR_SHARED_PASSWORD,
                role='doctor',
                name=entry['name'],
                specialty=entry['specialty'],
                verified=True,
                weekly_hours=entry['weekly_hours'],
            )
            created += 1

        self.stdout.write(self.style.SUCCESS(f'Created {created} sample doctor account(s).'))
