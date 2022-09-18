import requests
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.users.resources.authenticated_user import authenticated_user


class ContratoWebViewSet(viewsets.GenericViewSet):
    @action(detail=False, methods=['get'])
    def buscar_contrato(self, request):
        user = authenticated_user(request)
        params = {
            'idcontacto': user.id_erp,
            'numero': request.GET.get('contrato'),
        }
        url = 'http://127.0.0.1:8000/cmz/contrato_externo/buscar_contrato/'
        response = requests.get(url, params=params)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)

    @action(detail=False, methods=['get'])
    def cliente_final(self, request):
        user = authenticated_user(request)
        params = {
            'idcontacto': user.id_erp,
        }
        url = 'http://127.0.0.1:8000/cmz/contrato_externo/cliente_final/'
        response = requests.get(url, params=params)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)
