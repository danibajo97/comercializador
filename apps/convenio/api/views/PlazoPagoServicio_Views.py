from apps.convenio.models import PlazoPagoServicio
from apps.convenio.api.serializers.convenio_serializers import PlazoPagoServicioSerializer

class PlazoPagoServicioViewSet(viewsets.GenericViewSet):
    model = PlazoPagoServicio
    serializer_class = PlazoPagoServicioSerializer

    @transaction.atomic
    def create(self, request):
        pass

    def list(self,request):
        pass

    @transaction.atomic
    def update(self, request, pk=None):
        pass

    def retrieve(self, request, pk=None):
        pass

    @transaction.atomic
    def delete(self, request, pk=None):
        pass