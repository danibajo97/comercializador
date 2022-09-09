import requests
from django.db import transaction
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.convenio.api.serializers.convenio_serializers import ConvenioWebSerializer
from apps.convenio.models import ConvenioWeb
from apps.users.resources.authenticated_user import authenticated_user


class ConvenioWebViewSet(viewsets.GenericViewSet):
    model = ConvenioWeb
    serializer_class = ConvenioWebSerializer

    @transaction.atomic
    def create(self, request):
        user = authenticated_user(request)
        data = {
            'id_contacto': user.id_erp,
            'contrato': request.data['contrato'],
            'cantidad_bd': request.data['cantidad_bd'],
            'cliente_final': request.data['cliente_final'],
            'facturese_a': request.data['facturese_a'],
            'fecha_emision': request.data['fecha_emision'],
            'fecha_final': request.data['fecha_final'],
            'fecha_inicial': request.data['fecha_inicial'],
            'no_convenio': request.data['no_convenio'],
            'observaciones': request.data['observaciones'],
            'solicitado_por': request.data['solicitado_por'],
        }
        url = 'http://127.0.0.1:8000/cmz/negocio_tercero/'
        response = requests.post(url, json=data)
        if response.status_code == 200:
            convenio = ConvenioWeb()
            convenio.name = request.data['no_convenio']
            convenio.save()
            return Response(response.request.data, status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)

    def list(self, request):
        user = authenticated_user(request)
        url = 'http://127.0.0.1:8000/cmz/negocio_tercero/'
        params = {
            'id_contacto': user.id_erp,
        }
        response = requests.get(url, params=params)
        if response.status_code == 200:
            return Response(response.request.data, status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)

    @transaction.atomic
    def update(self, request, pk=None):
        pass

    def retrieve(self, request, pk=None):
        user = authenticated_user(request)
        params = {
            'id_contacto': user.id_erp,
            'no_convenio': request.GET.get('no_convenio'),
        }
        url = 'http://127.0.0.1:8000/cmz/negocio_tercero/buscar_contrato/'
        response = requests.get(url, params=params)
        if response.status_code == 200:
            return Response(response.request.data, status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)

    @transaction.atomic
    def delete(self, request, pk=None):
        user = authenticated_user(request)
        params = {
            'id_contacto': user.id_erp,
            'no_convenio': request.GET.get('no_convenio'),
        }
        url = 'http://127.0.0.1:8000/cmz/negocio_tercero/buscar_contrato/'
        response = requests.get(url, params=params)
        if response.status_code == 200:
            convenio = ConvenioWeb.objects.filter(name=request.data['no_convenio']).first()
            convenio.delete()
            return Response(status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)

    @action(detail=False, methods=['get'])
    def buscar_contrato(self, request):
        user = authenticated_user(request)
        params = {
            'id_contacto': user.id_erp,
            'contrato': request.GET.get('contrato'),
        }
        url = 'http://127.0.0.1:8000/cmz/negocio_tercero/buscar_contrato/'
        response = requests.get(url, params=params)
        if response.status_code == 200:
            return Response(response.request.data, status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)
