from rest_framework import serializers
from api.seguridad.model.persona import Persona


class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = '__all__'
