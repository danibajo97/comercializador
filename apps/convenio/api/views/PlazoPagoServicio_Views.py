

class PlazoPagoServicioViewSet(viewsets.GenericViewSet):

    @transaction.atomic
    def create(self, request):
        url = 'http://127.0.0.1:8000/cmz/plazo_pago/'
        response = request.post(url, json=request.data)
        if response.status_code == 201:
            return Response(response.request.data, status=response.status_code)
        else:
            return Response({'message': 'Hubo problemas al conectar con el servidor'},
                            status=response.status_code)

    def list(self,request):
        url = 'http://127.0.0.1:8000/cmz/plazo_pago/'
        response = request.get(url, request)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)

    @transaction.atomic
    def update(self, request, pk=None):
        url = 'http://127.0.0.1:8000/cmz/plazo_pago/'
        response = request.patch(url, request)
        if response.status_code == 204:
            return Response(status=response.status_code)
        else:
            return Response({'message': "Hubo problema al conectar al servidor"},
                            status=response.status_code)

    def retrieve(self, request, pk=None):
        url = 'http://127.0.0.1:8000/cmz/plazo_pago/' + request.GET.get('id')
        response = request.get(url)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)

    @transaction.atomic
    def delete(self, request, pk=None):
        url = 'http://127.0.0.1:8000/cmz/plazo_pago/' + request.GET.get('id')
        response = request.delete(url)
        if response.status_code == 204:
            return Response(status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar al servidor"},
                            status=response.status_code)