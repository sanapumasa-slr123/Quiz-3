from rest_framework import serializers
from django.contrib.auth.models import User
from .models import ElectricalService, Expert

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'username']
        read_only_fields = ['id']

class ExpertSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Expert
        fields = ['id', 'user', 'bio', 'created_at']
        read_only_fields = ['id', 'created_at']

class ElectricalServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ElectricalService
        fields = [
            'id',
            'service_name',
            'description',
            'category',
            'price',
            'duration_of_service',
            'rating',
            'sample_image',
            'name_of_the_expert',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
