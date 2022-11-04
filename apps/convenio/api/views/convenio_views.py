from django.db import transaction
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.base.response_base import ResponseBase
from apps.users.resources.authenticated_user import authenticated_user


class ConvenioWebViewSet(viewsets.GenericViewSet):
    responsebase = ResponseBase()

    @transaction.atomic
    def create(self, request):
        user = authenticated_user(request)
        url = 'cmz/convenio_externo/'
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
        if request.GET.get('id_convenio'):
            url = '%s%s/' % ('cmz/convenio_externo/',
                             request.GET.get('id_convenio'))
        else:
            url = 'cmz/convenio_externo/'
        params = {
            'authenticated-user': user.id_erp,
        }
        response = self.responsebase.get(url=url, params=params)
        return Response(response.json(), status=response.status_code)

    @transaction.atomic
    def update(self, request, pk):
        user = authenticated_user(request)
        params = {
            'authenticated-user': user.id_erp,
        }
        url = 'cmz/convenio_externo/%s/' % pk
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
        url = 'cmz/convenio_externo/%s/' % pk
        response = self.responsebase.get(url=url)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'Versat-response': response.json()},
                            status=response.status_code)

    @transaction.atomic
    def destroy(self, request, pk):
        url = 'cmz/convenio_externo/%s/' % pk
        response = self.responsebase.delete(url=url)
        if response.status_code == 204:
            return Response({'Comercializador-response': 'Eliminado correctamente'},
                            status=response.status_code)
        else:
            return Response({'Versat-response': response.json()},
                            status=response.status_code)

    @action(detail=False, methods=['get'])
    def usuarios_finales(self, request):
        user = authenticated_user(request)
        params = {
            'idcontacto': user.id_erp,
        }
        url = 'cmz/convenio_externo/usuarios_finales/'
        response = self.responsebase.get(url=url, params=params)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'Versat-response': response.json()},
                            status=response.status_code)

    @action(detail=False, methods=['get'])
    def list_servicios(self, request):
        user = authenticated_user(request)
        params = {
            'idcontacto': user.id_erp,
            'idplazopago': request.GET.get('id_plazopago'),
            'idconvenio': request.GET.get('id_convenio'),
        }
        url = 'cmz/convenio_externo/lista-servicios/'
        response = self.responsebase.get(url=url, params=params)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'Versat-response': response.json()},
                            status=response.status_code)

    @action(detail=False, methods=['get'])
    def validar_convenio(self, request):
        user = authenticated_user(request)
        params = {
            'idcontacto': user.id_erp,
            'id_convenio': request.GET.get('id_convenio'),
        }
        url = 'cmz/convenio_externo/validar_convenio/'
        response = self.responsebase.get(url=url, params=params)
        return Response({'Versat-response': response.json()},
                        status=response.status_code)

    @action(detail=False, methods=['get'])
    def terminar_convenio(self, request):
        user = authenticated_user(request)
        params = {
            'idcontacto': user.id_erp,
            'id_convenio': request.GET.get('id_convenio'),
        }
        url = 'cmz/convenio_externo/terminar_convenio/'
        response = self.responsebase.get(url=url, params=params)
        return Response({'Versat-response': response.json()},
                        status=response.status_code)
