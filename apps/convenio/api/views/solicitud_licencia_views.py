from django.db import transaction
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from apps.base.response_base import ResponseBase
from apps.users.resources.authenticated_user import authenticated_user


class SolicitudLicenciaViewSet(viewsets.GenericViewSet):
    responsebase = ResponseBase()

    @transaction.atomic
    def create(self, request):
        # request.data = {'venta': bool, ..... (atributos de la solicitud)}
        user = authenticated_user(request)
        url = 'cmz/solicitud_licencia_externo/'
        params = {
            'authenticated-user': user.id_erp,
        }
        response = self.responsebase.post(
            url=url, json=request.data, params=params)
        if response.status_code == 201:
            return Response({'Comercializador-response': 'Creado correctamente',
                             'Versat-response': response.json()}, status=response.status_code)
        else:
            return Response({'Versat-response': response.json()},
                            status=response.status_code)

    def list(self, request):
        user = authenticated_user(request)

        url = 'cmz/solicitud_licencia_externo/'
        params = {
            'authenticated-user': user.id_erp,
        }
        response = self.responsebase.get(url=url, params=params)
        return Response(data=response.json(), status=response.status_code)

    @transaction.atomic
    def update(self, request, pk):
        user = authenticated_user(request)
        params = {
            'authenticated-user': user.id_erp,
        }
        url = 'cmz/solicitud_licencia_externo/%s/' % pk
        response = self.responsebase.put(
            url=url, json=request.data, params=params)
        if response.status_code == 200:
            return Response({'Comercializador-response': 'Actualizado Correctamente',
                             'Versat-response': response.json()}, status=response.status_code)
        else:
            return Response({'Versat-response': response.json()},
                            status=response.status_code)

    @transaction.atomic
    def retrieve(self, request, pk):
        url = 'cmz/solicitud_licencia_externo/%s/' % pk
        response = self.responsebase.get(url=url)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'Versat-response': response.json()},
                            status=response.status_code)

    @transaction.atomic
    def destroy(self, request, pk):
        url = 'cmz/solicitud_licencia_externo/%s/' % pk
        response = self.responsebase.delete(url=url)
        if response.status_code == 204:
            return Response({'Comercializador-response': 'Eliminado correctamente'},
                            status=response.status_code)
        else:
            return Response({'Versat-response': response.json()},
                            status=response.status_code)

    @action(detail=False, methods=['put'])
    def otorgar_licencia(self, request):
        # request.data = [ iddetalle, .....]  lista con los iddetalle de las solicitudes a generar
        url = 'cmz/solicitud_licencia_externo/otorgar_licencia'
        response = self.responsebase.get(url=url, json=request.data)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'Versat-response': response.json()},
                            status=response.status_code)
