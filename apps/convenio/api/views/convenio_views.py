from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response

from apps.convenio.models import ConvenioWeb
from apps.users.models import User


class ConvenioViewSet(viewsets.GenericViewSet):
    pass
