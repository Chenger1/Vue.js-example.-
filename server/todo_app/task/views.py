from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.exceptions import PermissionDenied

from .models import Task
from .serializers import TaskSerializer
# Create your views here.


class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = (IsOwner,)

    def get_queryset(self):
        print(self.request.user)
        user = self.request.user
        if user.is_authenticated:
            return Task.objects.filter(user=user)
        else:
            raise PermissionDenied()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)