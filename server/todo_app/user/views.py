from rest_framework import response, decorators, permissions, status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import UserSerializer, UserLoginSerializer

def get_token(user):
    refresh_token = RefreshToken.for_user(user)
    return str(refresh_token.access_token)


@decorators.api_view(['POST'])
@decorators.permission_classes([permissions.AllowAny])
def registration(request):
    serializer = UserSerializer(data=request.data)
    if not serializer.is_valid():
        return response.Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    user = serializer.save()
    res = {
        'access': get_token(user),
        'id': user.id
    }
    return response.Response(res, status.HTTP_201_CREATED)


class UserLoginView(TokenObtainPairView):
    serializer_class = UserLoginSerializer
