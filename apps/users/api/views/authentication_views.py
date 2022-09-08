from django.contrib.auth import authenticate
from django.contrib.auth.tokens import default_token_generator
from django.db import transaction
from django.utils.http import urlsafe_base64_decode
from rest_framework import status, generics
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from apps.users.activate_code import activate_code
from apps.users.api.serializers.authentication_serializers import (
    CustomTokenObtainPairSerializer, CustomUserSerializer
)
from apps.users.api.serializers.users_serializers import UserSerializer
from apps.users.models import User


class Login(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get('email', '')
        password = request.data.get('password', '')
        user = authenticate(
            username=username,
            password=password
        )

        if user:
            login_serializer = self.serializer_class(data=request.data)
            if login_serializer.is_valid():
                user_serializer = CustomUserSerializer(user)
                return Response({
                    'token': login_serializer.validated_data.get('access'),
                    'refresh_token': login_serializer.validated_data.get('refresh'),
                    'user': user_serializer.data,
                    'message': 'Inicio de Sesion Existoso'
                }, status=status.HTTP_200_OK)
            return Response({'error': 'Contraseña o nombre de usuario incorrectos'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Contraseña o nombre de usuario incorrectos'}, status=status.HTTP_400_BAD_REQUEST)


class Logout(GenericAPIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'message': 'Sesion cerrada exitosamente!'}, status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response({'error': 'Error al cerrar sesion'}, status=status.HTTP_400_BAD_REQUEST)


class RegisterUsersFromVersatErpView(generics.GenericAPIView):
    model = User
    serializer_class = UserSerializer

    @transaction.atomic
    def post(self, request):
        emails = []
        request_type = isinstance(request.data, dict)
        if request_type:
            if self.model.objects.filter(email=request.data['email']).exists():
                pass
            else:
                emails.append(request.data['email'])
            user_serializer = self.serializer_class(data=request.data)
        else:
            for user in request.data:
                if self.model.objects.filter(email=user['email']).exists():
                    pass
                else:
                    emails.append(user['email'])
            user_serializer = self.serializer_class(data=request.data, many=True)
        if user_serializer.is_valid():
            user_serializer.save()
            for email in emails:
                user = self.model.objects.filter(email=email).first()
                activate_code(user, request)
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class ActivationCodeView(generics.GenericAPIView):
    model = User

    def get(self, request, uidb64, token):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = self.model.objects.filter(pk=uid).first()
        except(TypeError, ValueError, OverflowError, self.model.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return Response({
                'message': 'Su cuenta ha sido activada correctamente.',
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'message': 'Usted no esta registrado en el sistema.'
            }, status=status.HTTP_400_BAD_REQUEST)
