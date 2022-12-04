import requests
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.base.response_base import ResponseBase
from apps.base.swagger_schema import parameter
from apps.users.resources.authenticated_user import authenticated_user

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


class ContratoWebViewSet(viewsets.GenericViewSet):
    responsebase = ResponseBase()

    contrato = parameter(
        name='contrato', description="Numero de contrato", type=openapi.TYPE_STRING)

    @swagger_auto_schema(manual_parameters=[contrato])
    @action(detail=False, methods=['get'])
    def buscar_contrato(self, request):
        user = authenticated_user(request)
        params = {
            'idcontacto': user.id_erp,
            'numero': request.GET.get('contrato'),
        }
        url = 'cmz/contrato_externo/buscar_contrato/'
        response = self.responsebase.get(url=url, params=params)
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
        url = 'cmz/contrato_externo/cliente_final/'
        response = self.responsebase.get(url=url, params=params)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)
