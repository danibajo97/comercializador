from django.db import transaction
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.base.response_base import ResponseBase
from apps.users.resources.authenticated_user import authenticated_user


class RegistroVentaViewSet(viewsets.GenericViewSet):
    responsebase = ResponseBase()

    def list(self, request):
        user = authenticated_user(request)
        url = 'cmz/registro_venta_externo/'
        params = {
            'authenticated-user': user.id_erp,
            'cliente_final': request.GET.get('cliente_final', None),
            'cliente': request.GET.get('cliente', None),
            'fecha_desde': request.GET.get('fecha_desde', None),
            'fecha_hasta': request.GET.get('fecha_hasta', None),
        }
        response = self.responsebase.get(url=url, params=params)
        return Response(response.json(), status=response.status_code)

    @action(detail=False, methods=['get'])
    def servicios_contratados(self, request):
        user = authenticated_user(request)
        url = 'cmz/registro_venta_externo/servicios_contratados/'
        json_data = {
            'authenticated-user': user.id_erp,
            'cliente_final': request.GET.get('cliente_final'),
        }
        response = self.responsebase.get(url=url, params=json_data)
        return Response(response.json(), status=response.status_code)
