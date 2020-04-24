from django.urls import path
from rest_framework import routers

from .views import TaskViewSet

router = routers.DefaultRouter()
router.register('tasks_view', TaskViewSet, basename='tasks_view_url')

urlpatterns = router.urls