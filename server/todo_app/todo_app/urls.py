"""todo_app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt import views as jwt_views

from main import views
from user.views import UserLoginView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name="index"),
    path('tasks/', include('task.urls')),
    path('users/', include('user.urls')),
    #path('api_token_auth/', obtain_auth_token)
    path('api/token/', UserLoginView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh')
]
