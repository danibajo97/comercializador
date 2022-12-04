from rest_framework.response import Response
from rest_framework import viewsets
from django.db import transaction

from apps.base.response_base import ResponseBase


class PlazoPagoServicioViewSet(viewsets.GenericViewSet):
    responsebase = ResponseBase()

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
    def create(self, request):
        url = 'cmz/plazo_pago_servicio/'
        response = self.responsebase.post(url, json=request.data)
        if response.status_code == 201:
            return Response(status=response.status_code)
        else:
            json_data = response.json()
            return Response({'message': json_data.get('non_field_errors')[0]},
                            status=response.status_code)

    @transaction.atomic
    def update(self, request, pk=None):
        url = 'cmz/plazo_pago_servicio/%s' % pk
        response = self.responsebase.put(url, json=request.data)
        print(response)
        if response.status_code == 200:
            return Response(status=response.status_code)
        else:
            json_data = response.json()
            print(json_data)
            return Response({'message': json_data.get('non_field_errors')[0]},
                            status=response.status_code)

    def retrieve(self, request, pk=None):
        url = 'cmz/plazo_pago_servicio/' + request.GET.get('id')
        response = self.responsebase.get(url)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)

    @transaction.atomic
    def delete(self, request, pk=None):
        url = 'cmz/plazo_pago_servicio/' + pk
        response = self.responsebase.delete(url)
        if response.status_code == 204:
            return Response(status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar al servidor"},
                            status=response.status_code)
