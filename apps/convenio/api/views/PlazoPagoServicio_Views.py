

class PlazoPagoServicioViewSet(viewsets.GenericViewSet):

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