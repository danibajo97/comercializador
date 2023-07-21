from django.db import transaction
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.base.response_base import ResponseBase
from apps.users.resources.authenticated_user import authenticated_user


class SolicitudPagoViewSet(viewsets.GenericViewSet):
    responsebase = ResponseBase()

    def list(self, request):
        user = authenticated_user(request)
        url = 'cmz/solicitud_pago_externo/'
        params = {
            'authenticated-user': user.id_erp,
        }
        response = self.responsebase.get(url=url, params=params)
        return Response(response.json(), status=response.status_code)

    @transaction.atomic
    def retrieve(self, request, pk):
        url = 'cmz/solicitud_pago_externo/%s/' % pk
        user = authenticated_user(request)
        params = {
            'authenticated-user': user.id_erp,
        }
        response = self.responsebase.get(url=url, params=params)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'Versat-response': response.json()},
                            status=response.status_code)

    @transaction.atomic
    def destroy(self, request, pk):
        url = 'cmz/solicitud_pago_externo/%s/' % pk
        user = authenticated_user(request)
        params = {
            'authenticated-user': user.id_erp,
        }
        response = self.responsebase.delete(url=url, params=params)
        if response.status_code == 204:
            return Response({'Comercializador-response': 'Eliminado correctamente'},
                            status=response.status_code)
        else:
            return Response({'Versat-response': response.json()},
                            status=response.status_code)

    @transaction.atomic
    def create(self, request):
        user = authenticated_user(request)
        url = 'cmz/solicitud_pago_externo/'
        json_data = {
            'authenticated-user': user.id_erp,
            **request.data,
        }
        response = self.responsebase.post(url=url, json=json_data)
        if response.status_code == 201:
            return Response({'Comercializador-response': 'Creado correctamente'}, status=response.status_code)
        else:
            return Response(response, status=response.status_code)

    @transaction.atomic
    def update(self, request, pk):
        user = authenticated_user(request)
        url = 'cmz/solicitud_pago_externo/%s/' % pk
        json_data = {
            'authenticated-user': user.id_erp,
            **request.data,
        }
        response = self.responsebase.put(url=url, json=json_data)
        if response.status_code == 200:
            return Response({'Comercializador-response': 'Actualizado Correctamente',
                             'versat_response': response.json()}, status=response.status_code)
        else:
            return Response(response, status=response.status_code)

    @action(detail=False, methods=['post'])
    def solicitar_pago(self, request):
        user = authenticated_user(request)
        url = 'cmz/solicitud_pago_externo/solicitar_pago/'
        json_data = {
            'authenticated-user': user.id_erp,
            **request.data,
        }
        response = self.responsebase.post(url=url, json=json_data)
        if response.status_code == 201:
            return Response({'Comercializador-response': 'Solicitado el pago correctamente'},
                            status=response.status_code)
        else:
            return Response(response, status=response.status_code)
