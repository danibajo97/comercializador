from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.base.response_base import ResponseBase
from apps.users.resources.authenticated_user import authenticated_user


class UsuarioFinalWebViewSet(viewsets.GenericViewSet):
    responsebase = ResponseBase()

    def list(self, request):
        user = authenticated_user(request)
        url = 'cmz/usuario_final/'
        params = {
            'id_contacto': user.id_erp,
        }
        response = self.responsebase.get(url=url, params=params)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)


