from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response

from apps.convenio.api.serializers.convenio_serializers import ConvenioWebSerializer
from apps.convenio.models import ConvenioWeb


class ConvenioViewSet(viewsets.GenericViewSet):
    model = ConvenioWeb
    serializer_class = ConvenioWebSerializer

    def create(self, request):
        pass

    def list(self, request):
        pass

    def update(self, request, pk=None):
        pass

    def retrieve(self, request, pk=None):
        pass

    def delete(self, request, pk=None):
        pass