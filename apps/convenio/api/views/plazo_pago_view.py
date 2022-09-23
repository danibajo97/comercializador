import requests
from django.db import transaction
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.convenio.api.serializers.convenio_serializers import ConvenioWebSerializer, PlazoPagoSerializer, PlazoPagoServicioSerializer
from apps.convenio.models import ConvenioWeb
from apps.users.resources.authenticated_user import authenticated_user


class PlazoPagoViewSet(viewsets.GenericViewSet):
    model = PlazoPago
    serializer_class = PlazoPagoSerializer

    @transaction.atomic
    def create(self, request):
        url = 'http://127.0.0.1:8000/cmz/plazo_pago/'
        response = request.post(url, json=request.data)
        if response.status_code == 201:
            serializer = PlazoPagoSerializer(data=response.json())
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(response.request.data, status=response.status_code)
        else:
            return Response({'message':'Hubo problemas al conectar con el servidor'},
                            status=response.status_code)


    def list(self, request):
        user = authenticated_user(request)
        url = 'http://127.0.0.1:8000/cmz/plazo_pago/'
        params = {
            'id_contacto' : user.id_erp
        }
        response = request.get(url, params=params)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'message':"Hubo problemas al conectar con el servidor"},
                             status=response.status_code)


    @transaction.atomic
    def update(self, request, pk=None):
        pass

    def retrieve(self, request, pk=None):
        url = 'http://127.0.0.1:8000/cmz/plazo_pago/' + request.GET.get('id')
        response = request.get(url)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'message':"Hubo problemas al conectar con el servidor"},
                            status=response.status_code)


    @transaction.atomic
    def delete(self,request, pk=None):
        pass
        # url = 'http://127.0.0.1:8000/cmz/plazo_pago/' + request.GET.get('id')
        # response = request.delete(url)
        # if response.status_code == 204: