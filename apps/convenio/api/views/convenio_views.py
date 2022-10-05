from django.db import transaction
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.base.generic_requests import *
from apps.convenio.api.serializers.convenio_serializers import ConvenioWebSerializer
from apps.convenio.models import ConvenioWeb
from apps.users.resources.authenticated_user import authenticated_user


class ConvenioWebViewSet(viewsets.GenericViewSet):
    model = ConvenioWeb
    serializer_class = ConvenioWebSerializer

    @transaction.atomic
    def create(self, request):
        url = 'cmz/convenio_externo/'
        response = post(url, json=request.data)
        if response.status_code == 201:
            serializer = ConvenioWebSerializer(data=response.json())
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)

    def list(self, request):
        user = authenticated_user(request)
        url = 'cmz/convenio_externo/'
        params = {
            'id_contacto': user.id_erp,
        }
        response = get(url, params=params)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)

    @transaction.atomic
    def update(self, request, pk=None):
        pass

    def retrieve(self, request, pk=None):
        url = 'cmz/convenio_externo/' + request.GET.get('id_convenio')
        response = get(url)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)

    @transaction.atomic
    def delete(self, request, pk=None):
        url = 'cmz/convenio_externo/' + request.GET.get('id_convenio'),
        response = delete(url)
        if response.status_code == 204:
            convenio = ConvenioWeb.objects.filter(name=request.data['id_convenio']).first()
            convenio.delete()
            return Response(status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)

    @action(detail=False, methods=['get'])
    def usuarios_finales(self, request):
        user = authenticated_user(request)
        params = {
            'idcontacto': user.id_erp,
        }
        url = 'cmz/convenio_externo/usuarios_finales/'
        response = get(url, params=params)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)

    @action(detail=False, methods=['get'])
    def list_servicios(self, request):
        user = authenticated_user(request)
        params = {
            'idcontacto': user.id_erp,
            'idplazopago': request.GET.get('id_plazopago'),
            'idconvenio': request.GET.get('id_convenio'),
        }
        url = 'cmz/convenio_externo/list_servicios/'
        response = requests.get(url, params=params)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)

    @action(detail=False, methods=['put'])
    def validar_convenio(self, request):
        user = authenticated_user(request)
        params = {
            'idcontacto': user.id_erp,
            'idconvenio': request.GET.get('id_convenio'),
        }
        url = 'cmz/convenio_externo/validar_convenio/'
        response = get(url, params=params)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)

    @action(detail=False, methods=['put'])
    def confirmar_convenio(self, request):
        user = authenticated_user(request)
        params = {
            'idcontacto': user.id_erp,
            'idconvenio': request.GET.get('id_convenio'),
        }
        url = 'cmz/convenio_externo/confirmar_convenio/'
        response = get(url, params=params)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)
