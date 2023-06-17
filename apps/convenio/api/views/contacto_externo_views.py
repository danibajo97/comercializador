from django.db import transaction
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.base.response_base import ResponseBase
from apps.users.resources.authenticated_user import authenticated_user


class ContactoExternoWebViewSet(viewsets.GenericViewSet):
    responsebase = ResponseBase()

    @transaction.atomic
    def create(self, request):
        user = authenticated_user(request)
        url = 'cmz/agregar-contacto-externo/'
        params = {
            'authenticated-user': user.id_erp,
        }
        response = self.responsebase.post(
                url=url, json=request.data, params=params)
        print(response.status_code)
        if response.status_code == 200:
            return Response({'comercializador_response': 'Creado correctamente',
                             'versat_response': response.json()}, status=response.status_code)
        else:
            return Response({'versat_response': response},
                            status=response.status_code)

    @action(methods=['get'], detail=False, url_path='organismos', url_name='organismos')
    def organismos(self, request):
        user = authenticated_user(request)
        url = 'servicio/organismos/'
        params = {
            'authenticated-user': user.id_erp,
        }
        response = self.responsebase.get(url=url, params=params)
        return Response(response.json(), status=response.status_code)
