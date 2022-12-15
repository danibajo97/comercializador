from django.contrib.auth.tokens import default_token_generator
from django.db import transaction
from django.utils.http import urlsafe_base64_decode
from rest_framework import status, generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from apps.base.response_base import ResponseBase
from apps.users.api.serializers.authentication_serializers import ActivateUserSerializer
from apps.users.api.serializers.users_serializers import RegisterSerializer
from apps.users.models import User
from apps.users.resources.activate_code import activate_code
from apps.users.resources.random_user import generate_username


class RegisterUsersFromVersatErpView(generics.GenericAPIView):
    model = User
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)

    @transaction.atomic
    def post(self, request):
        msg = []
        usernames = []
        request_type = isinstance(request.data, dict)
        if request_type:
            if self.model.objects.filter(email=request.data['email'], is_resetpwd=True).exists():
                msg.append("El usuario %s ya existe en el sistema" %
                           request.data['email'])
            else:
                request.data._mutable = True
                request.data['username'] = generate_username()
                request.data._mutable = False
                usernames.append(request.data['username'])
            user_serializer = self.serializer_class(data=request.data)
        else:
            for user in request.data:
                if self.model.objects.filter(email=user['email'], is_resetpwd=True).exists():
                    msg.append("El usuario %s ya existe en el sistema" %
                               user['email'])
                else:
                    request.data._mutable = True
                    request.data['username'] = generate_username()
                    request.data._mutable = False
                    usernames.append(user['username'])
            user_serializer = self.serializer_class(
                data=request.data, many=True)
        if user_serializer.is_valid(raise_exception=True):
            user_serializer.save()
            users = self.model.objects.filter(username__in=usernames)
            for user in users:
                activate_code(user, request)
            return Response(status=status.HTTP_201_CREATED)
        return Response({'error': msg}, status=status.HTTP_400_BAD_REQUEST)


class ActivationCodeView(generics.GenericAPIView):
    model = User
    serializer_class = ActivateUserSerializer
    permission_classes = (AllowAny,)

    @transaction.atomic()
    def post(self, request, uidb64, token):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = self.model.objects.filter(pk=uid).first()
        except (TypeError, ValueError, OverflowError, self.model.DoesNotExist):
            user = None

        serializer = ActivateUserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            if default_token_generator.check_token(user, token):
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
    responsebase = ResponseBase()

    def get(self, request):
        current_user = request.user
        if current_user:
            url = '%s%s/' % ('cmz/contacto_externo/', current_user.id_erp)
            response = self.responsebase.get(url=url)
            if response.status_code == 200:
                return Response({'versat': response.json(),
                                 'comercializador': {
                                     'id': current_user.pk,
                                     'email': current_user.email,
                                     'name': current_user.name,
                                     'last_name': current_user.last_name,
                                     'rol': 'ROL_DISTRIBUIDOR' if current_user.is_distribuidor else 'ROL_CLIENTE',
                }}, status=response.status_code)
            else:
                return Response({'comercializador': 'Error al conectar con el Servidor'},
                                status=response.status_code)
        else:
            return Response({'comercializador': 'No hay usuario autenticado en el sistema'},
                            status=status.HTTP_400_BAD_REQUEST)
