from rest_framework import routers
from django.urls import path

from .views import registration

urlpatterns = [
    path('register/', registration, name='register')
]