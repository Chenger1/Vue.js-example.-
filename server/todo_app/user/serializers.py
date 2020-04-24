from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.contrib.auth.models import User

from task.models import Task


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(min_length=1)
    tasks = serializers.PrimaryKeyRelatedField(many=True, queryset=Task.objects.all(), default=[])

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
                                        validated_data['email'],
                                        validated_data['password'])

        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'tasks')


class UserLoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['id'] = self.user.id

        return data