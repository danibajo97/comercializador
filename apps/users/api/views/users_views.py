from django.contrib.auth import authenticate
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.users.api.serializers.users_serializers import (
    ChangePasswordSerializer, UpdateUserSerializer
)
from apps.users.models import User


class UpdateProfileView(generics.UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UpdateUserSerializer


class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Contraseña incorrecta."]}, status=status.HTTP_400_BAD_REQUEST)
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Contraseña cambiada exitosamente',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordUser(generics.GenericAPIView):

    def get(self, request):
        password = request.GET.get('password')
        current_user = request.user
        user = authenticate(request, username=current_user, password=password)
        if user is None:
            return Response({"response": "No User exist"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"response": "correct Password"}, status=status.HTTP_200_OK)