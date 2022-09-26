import requests
from django.db import transaction
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response


class ServicioContratadoViewSet(viewsets.GenericViewSet):

    @transaction.atomic
    def create(self, request):
        url = 'http://127.0.0.1:8000/cmz/servicio_contratado_externo/add-servicio'
        response = requests.post(url, json=request.data)
        if response.status_code == 201:

            return Response(response.request.data, status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)

    def list(self, request):

        url = 'http://127.0.0.1:8000/cmz/servicio_contratado_externo/lista-servicios'
        response = requests.get(url, request)

        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)

    @transaction.atomic
    def update(self, request):

        url = 'http://127.0.0.1:8000/cmz/servicio_contratado_externo/'
        response = requests.patch(url, request)

        if response.status_code == 204:
            return Response(status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)

    def retrieve(self, request):

        url = 'http://127.0.0.1:8000/cmz/servicio_contratado_externo/' + request.GET.get('id_servicio_contratado')
        response = requests.get(url)

        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)

    @transaction.atomic
    def delete(self, request):

        url = 'http://127.0.0.1:8000/cmz/servicio_contratado_externo/' + request.GET.get('id_servicio_contratado')
        response = requests.delete(url)

        if response.status_code == 204:
            return Response(status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)