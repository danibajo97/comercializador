from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny

from apps.users.api.serializers.users_serializers import (
    ChangePasswordSerializer, RegisterSerializer, UpdateUserSerializer
)
from apps.users.models import User


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


class UpdateProfileView(generics.UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UpdateUserSerializer


class ChangePasswordView(generics.UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangePasswordSerializer
