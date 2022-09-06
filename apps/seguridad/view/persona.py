from api.seguridad.serializer.persona import PersonaSerializer
from api.seguridad.model.persona import Persona

from rest_framework import viewsets


class PersonaView(viewsets.ModelViewSet):
    serializer_class = PersonaSerializer
    queryset = Persona.objects.all()
    filter_fields = '__all__'
    ordering_fields = '__all__'
