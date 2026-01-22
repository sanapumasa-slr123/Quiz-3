from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import ElectricalServiceViewSet, UserViewSet, register

router = DefaultRouter()
router.register(r'services', ElectricalServiceViewSet, basename='service')
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
    path('service/<int:pk>/', ElectricalServiceViewSet.as_view({'get': 'retrieve'}), name='service-detail'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', register, name='register'),
]

