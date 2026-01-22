"""
URL configuration for services_project.
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.http import JsonResponse

def home_view(request):
    return JsonResponse({
        'message': 'WiFi, CCTV & Light Services API',
        'admin': 'http://localhost:8000/admin',
        'api': 'http://localhost:8000/api'
    })

urlpatterns = [
    path('', home_view, name='home'),
    path('admin/', admin.site.urls),
    path('api/', include('services_app.urls')),
]
