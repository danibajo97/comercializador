from rest_framework.response import Response
from rest_framework import viewsets
from django.db import transaction

from apps.base.response_base import ResponseBase


class PlazoPagoServicioViewSet(viewsets.GenericViewSet):
    responsebase = ResponseBase()

    @transaction.atomic
    def create(self, request):
        url = 'cmz/plazo_pago/'
        response = self.responsebase.post(url, json=request.data)
        if response.status_code == 201:
            return Response(response.request.data, status=response.status_code)
        else:
            return Response({'message': 'Hubo problemas al conectar con el servidor'},
                            status=response.status_code)

    def list(self, request):
        url = 'cmz/plazo_pago_servicio/'
        params = {
            'plazo': request.GET.get('plazoPagoId'),
        }
        response = self.responsebase.get(url, params)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)

    @transaction.atomic
    def update(self, request, pk=None):
        url = 'cmz/plazo_pago/'
        response = self.responsebase.patch(url, request)
        if response.status_code == 204:
            return Response(status=response.status_code)
        else:
            return Response({'message': "Hubo problema al conectar al servidor"},
                            status=response.status_code)

    def retrieve(self, request, pk=None):
        url = 'cmz/plazo_pago/' + request.GET.get('id')
        response = self.responsebase.get(url)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)

    @transaction.atomic
    def delete(self, request, pk=None):
        url = 'cmz/plazo_pago/' + request.GET.get('id')
        response = self.responsebase.delete(url)
        if response.status_code == 204:
            return Response(status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar al servidor"},
                            status=response.status_code)
