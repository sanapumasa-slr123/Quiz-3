from django.db import models
from django.contrib.auth.models import User

class Expert(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='expert_profile')
    bio = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"
    
    class Meta:
        ordering = ['-created_at']

class ElectricalService(models.Model):
    SERVICE_CATEGORIES = [
        ('installation', 'Installation'),
        ('maintenance', 'Maintenance'),
        ('repair', 'Repair'),
    ]
    
    service_name = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=SERVICE_CATEGORIES)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration_of_service = models.CharField(max_length=100)
    rating = models.FloatField(default=5.0)
    sample_image = models.URLField(blank=True, null=True)
    name_of_the_expert = models.CharField(max_length=255)
    expert = models.ForeignKey(Expert, on_delete=models.CASCADE, related_name='services', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.service_name
    
    class Meta:
        ordering = ['-created_at']
