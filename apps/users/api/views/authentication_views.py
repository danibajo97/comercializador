from django.contrib.auth.tokens import default_token_generator
from django.db import transaction
from django.utils.http import urlsafe_base64_decode
from rest_framework import status, generics
from rest_framework.response import Response

from apps.users.api.serializers.users_serializers import UserSerializer
from apps.users.models import User
from apps.users.resources.activate_code import activate_code


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


class AuthenticatedUser(generics.GenericAPIView):

    def get(self, request):
        current_user = request.user
        if current_user:
            return Response({
                'email': current_user.email,
                'name': current_user.name,
                'last_name': current_user.last_name,
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'message': 'No hay usuario autenticado en el sistema.'
            }, status=status.HTTP_400_BAD_REQUEST)
