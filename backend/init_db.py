import os
import sys
import django
from pathlib import Path

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'services_project.settings')
django.setup()

from django.contrib.auth.models import User
from services_app.models import ElectricalService, Expert

# Create superuser if doesn't exist
if not User.objects.filter(username='admin').exists():
    user = User.objects.create_superuser(
        username='admin',
        email='admin@electrical.com',
        password='admin123',
        first_name='Admin',
        last_name='User'
    )
    print(f"Created superuser: {user.username}")
else:
    user = User.objects.get(username='admin')
    print(f"Superuser already exists: {user.username}")

# Create expert profile if doesn't exist
if not Expert.objects.filter(user=user).exists():
    expert = Expert.objects.create(
        user=user,
        bio="Senior electrician with 15+ years of professional experience in residential and commercial electrical services."
    )
    print(f"Created expert profile for {expert.user.get_full_name()}")
else:
    expert = Expert.objects.get(user=user)
    print(f"Expert profile already exists")

# Sample electrical services data
services_data = [
    {
        "service_name": "WiFi Installation",
        "description": "Professional WiFi installation service for residential and commercial properties. We provide high-speed internet connectivity setup with optimal router placement, network configuration, and signal optimization to ensure seamless coverage throughout your premises.",
        "category": "installation",
        "price": 200.00,
        "duration_of_service": "1-2 hours",
        "rating": 4.9,
        "name_of_the_expert": "John Smith",
        "sample_image": "https://images.unsplash.com/photo-1606017954857-03f2b7e487b9?w=400&h=300&fit=crop"
    },
    {
        "service_name": "CCTV Installation",
        "description": "Complete CCTV camera system installation for security and surveillance. Includes professional camera placement, wiring, DVR/NVR setup, and cloud integration for 24/7 monitoring. We ensure comprehensive coverage of all critical areas and provide expert guidance on system maintenance.",
        "category": "installation",
        "price": 350.00,
        "duration_of_service": "3-4 hours",
        "rating": 4.8,
        "name_of_the_expert": "Jane Doe",
        "sample_image": "https://images.unsplash.com/photo-1561487281-d3fee72d55c2?w=400&h=300&fit=crop"
    },
    {
        "service_name": "Light Installation",
        "description": "Expert light installation service covering residential and commercial spaces. From LED fixtures to decorative lighting, we handle all aspects including electrical wiring, fixture mounting, and system testing. Our team ensures proper lighting design and energy efficiency.",
        "category": "installation",
        "price": 150.00,
        "duration_of_service": "2-3 hours",
        "rating": 4.7,
        "name_of_the_expert": "Mike Johnson",
        "sample_image": "https://images.unsplash.com/photo-1565636192335-14c0edc5c000?w=400&h=300&fit=crop"
    }
]

# Add services if they don't exist
for service_data in services_data:
    if not ElectricalService.objects.filter(service_name=service_data['service_name']).exists():
        ElectricalService.objects.create(**service_data)
        print(f"Created service: {service_data['service_name']}")
    else:
        print(f"Service already exists: {service_data['service_name']}")

print("\nDatabase initialization completed!")
