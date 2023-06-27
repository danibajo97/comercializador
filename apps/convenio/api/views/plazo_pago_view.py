from django.db import transaction
from rest_framework import viewsets
from rest_framework.response import Response

from apps.base.response_base import ResponseBase
from apps.users.resources.authenticated_user import authenticated_user


class PlazoPagoViewSet(viewsets.GenericViewSet):
    responsebase = ResponseBase()

    @transaction.atomic
    def create(self, request):
        url = 'cmz/plazo_pago/'
        user = authenticated_user(request)
        params = {
            'authenticated-user': user.id_erp,
        }
        response = self.responsebase.post(url, json=request.data, params=params)
        if response.status_code == 201:
            return Response(status=response.status_code)
        else:
            return Response({'message': 'Hubo problemas al conectar con el servidor'},
                            status=response.status_code)

    def list(self, request):
        url = 'cmz/plazo_pago/'
        user = authenticated_user(request)
        params = {
            'authenticated-user': user.id_erp,
            'negocio': request.GET.get('id_convenio'),
        }
        response = self.responsebase.get(url, params=params)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)

    @transaction.atomic
    def update(self, request, pk=None):
        url = 'cmz/plazo_pago/%s/' % pk
        user = authenticated_user(request)
        params = {
            'authenticated-user': user.id_erp,
        }
        response = self.responsebase.put(url, json=request.data, params=params)
        if response.status_code == 204:
            return Response(status=response.status_code)
        else:
            return Response({'message': "Hubo problema al conectar al servidor"},
                            status=response.status_code)

    def retrieve(self, request, pk=None):
        url = 'cmz/plazo_pago/' + request.GET.get('id')
        user = authenticated_user(request)
        params = {
            'authenticated-user': user.id_erp,
        }
        response = self.responsebase.get(url, params=params)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)

    @transaction.atomic
    def delete(self, request, pk=None):
        url = 'cmz/plazo_pago/%s/' % pk
        user = authenticated_user(request)
        params = {
            'authenticated-user': user.id_erp,
        }
        response = self.responsebase.delete(url, params=params)
        if response.status_code == 204:
            return Response(status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar al servidor"},
                            status=response.status_code)
