import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'services_project.settings')
django.setup()

from django.contrib.auth.models import User

# Create superuser
username = 'admin123'
password = '123'
email = 'admin123@example.com'

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username, email, password)
    print(f'Superuser "{username}" created successfully!')
else:
    # Update existing user to be superuser
    user = User.objects.get(username=username)
    user.set_password(password)
    user.is_superuser = True
    user.is_staff = True
    user.save()
    print(f'Superuser "{username}" updated successfully!')
