from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from .models import ElectricalService, Expert
from .serializers import ElectricalServiceSerializer, UserSerializer
from .permissions import IsSuperUser

class ElectricalServiceViewSet(viewsets.ModelViewSet):
    queryset = ElectricalService.objects.all()
    serializer_class = ElectricalServiceSerializer
    permission_classes = [AllowAny]
    
    def list(self, request, *args, **kwargs):
        """
        ListView Function - Returns all services
        """
        return super().list(request, *args, **kwargs)
    
    def retrieve(self, request, *args, **kwargs):
        """
        DetailView Function - Returns service details
        """
        return super().retrieve(request, *args, **kwargs)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    def list(self, request, *args, **kwargs):
        """
        UserListView Function - Lists all users
        """
        return super().list(request, *args, **kwargs)
    
    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def profile(self, request):
        """
        Get current user's profile
        """
        if not request.user.is_authenticated:
            return Response(
                {'detail': 'Authentication credentials were not provided.'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """
    Register a new user
    """
    try:
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        first_name = request.data.get('first_name', '')
        last_name = request.data.get('last_name', '')
        
        if not username or not email or not password:
            return Response(
                {'detail': 'Username, email, and password are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if User.objects.filter(username=username).exists():
            return Response(
                {'detail': 'Username already exists.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if User.objects.filter(email=email).exists():
            return Response(
                {'detail': 'Email already registered.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name
        )
        
        return Response(
            {'detail': 'User registered successfully.'},
            status=status.HTTP_201_CREATED
        )
    except Exception as e:
        return Response(
            {'detail': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )

