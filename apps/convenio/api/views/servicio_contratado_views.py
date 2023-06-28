from django.db import transaction
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.base.response_base import ResponseBase
from apps.users.resources.authenticated_user import authenticated_user


class ServicioContratadoViewSet(viewsets.GenericViewSet):
    responsebase = ResponseBase()

    def list(self, request):
        user = authenticated_user(request)
        url = 'cmz/servicio_contratado_externo/'
        params = {
            'authenticated-user': user.id_erp,
            'convenio': request.GET.get('id_convenio')
        }
        response = self.responsebase.get(url=url, params=params)
        return Response(response.json(), status=response.status_code)

    @transaction.atomic
    def retrieve(self, request, pk):
        url = 'cmz/servicio_contratado_externo/%s/' % pk
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
        url = 'cmz/servicio_contratado_externo/%s/' % pk
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
    @action(methods=['post'], detail=False, url_path='crear_o_actualizar', url_name='crear_o_actualizar')
    def create_or_update(self, request):
        user = authenticated_user(request)
        url = 'cmz/servicio_contratado_externo/crear_o_actualizar/'
        params = {
            'authenticated-user': user.id_erp,
        }
        response = self.responsebase.post(
            url=url, json=request.data, params=params)
        if response.status_code == 200:
            return Response({'Comercializador-response': 'Creado correctamente'},
                            status=response.status_code)
        else:
            return Response({'Versat-response': response.json()},
                            status=response.status_code)
