from rest_framework import permissions

class IsAuthenticated(permissions.BasePermission):
    """
    Custom permission to check if user is authenticated
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

class IsSuperUser(permissions.BasePermission):
    """
    Custom permission to check if user is a superuser
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_superuser)
