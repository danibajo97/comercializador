from django.contrib.auth.tokens import default_token_generator
from django.db import transaction
from django.utils.http import urlsafe_base64_decode
from rest_framework import status, generics
from rest_framework.response import Response

from apps.base.response_base import ResponseBase
from apps.users.api.serializers.authentication_serializers import ActivateUserSerializer
from apps.users.models import User
from apps.users.resources.activate_code import activate_code


class RegisterUsersFromVersatErpView(generics.GenericAPIView):
    model = User

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
            user_serializer = self.serializer_class(
                data=request.data, many=True)
        if user_serializer.is_valid():
            user_serializer.save()
            for email in emails:
                user = self.model.objects.filter(email=email).first()
                activate_code(user, request)
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class ActivationCodeView(generics.GenericAPIView):
    model = User
    serializer_class = ActivateUserSerializer

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
                                     'email': current_user.email,
                                     'name': current_user.name,
                                     'last_name': current_user.last_name,
                                     'is_distribuidor': current_user.is_distribuidor,
                                 }
                                 },
                                status=response.status_code)
            else:
                return Response({'comercializador': 'Error al conectar con el Servidor'},
                                status=response.status_code)
        else:
            return Response({'comercializador': 'No hay usuario autenticado en el sistema'},
                            status=status.HTTP_400_BAD_REQUEST)
