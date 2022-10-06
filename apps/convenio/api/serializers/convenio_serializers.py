from rest_framework import serializers

from apps.convenio.models import ConvenioWeb


class ConvenioWebSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConvenioWeb
        fields = '__all__'