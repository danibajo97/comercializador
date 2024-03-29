from django.db import transaction
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.base.response_base import ResponseBase
from apps.users.resources.authenticated_user import authenticated_user
from apps.users.resources.solicitud_licencia_correo import solicitud_licencia_correo


class SolicitudLicenciaViewSet(viewsets.GenericViewSet):
    responsebase = ResponseBase()

    @transaction.atomic
    def create(self, request):
        user = authenticated_user(request)
        url = 'cmz/solicitud_licencia_externo/'
        json_data = {
            'authenticated-user': user.id_erp,
            **request.data,
            'cliente_solicita': user.id_erp
        }
        response = self.responsebase.post(url=url, json=json_data)
        if response.status_code == 201:
            return Response({'Comercializador-response': 'Creado correctamente'}, status=response.status_code)
        else:
            return Response(response, status=response.status_code)

    def list(self, request):
        user = authenticated_user(request)
        url = 'cmz/solicitud_licencia_externo/'
        params = {
            'authenticated-user': user.id_erp,
            **request.GET
        }
        response = self.responsebase.get(url=url, params=params)
        return Response(data=response.json(), status=response.status_code)

    @transaction.atomic
    def update(self, request, pk):
        user = authenticated_user(request)
        url = 'cmz/solicitud_licencia_externo/%s/' % pk
        json_data = {
            'authenticated-user': user.id_erp,
            **request.data,
            'cliente_solicita': user.id_erp
        }
        response = self.responsebase.put(url=url, json=json_data)
        if response.status_code == 200:
            return Response({'Comercializador-response': 'Actualizado Correctamente',
                             'versat_response': response.json()}, status=response.status_code)
        else:
            return Response(response, status=response.status_code)

    @transaction.atomic
    def retrieve(self, request, pk):
        url = 'cmz/solicitud_licencia_externo/%s/' % pk
        user = authenticated_user(request)
        params = {
            'authenticated-user': user.id_erp,
        }
        response = self.responsebase.get(url=url, params=params)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'Versat-response': response.json()},
                            status=response.status_code)

    @transaction.atomic
    def destroy(self, request, pk):
        url = 'cmz/solicitud_licencia_externo/%s/' % pk
        user = authenticated_user(request)
        params = {
            'authenticated-user': user.id_erp,
        }
        response = self.responsebase.delete(url=url, params=params)
        if response.status_code == 204:
            return Response({'Comercializador-response': 'Eliminado correctamente'},
                            status=response.status_code)
        else:
            return Response(
                status=response.status_code)

    @action(detail=False, methods=['put'])
    def otorgar_licencia(self, request):
        url = 'cmz/solicitud_licencia_externo/otorgar_licencia/'
        user = authenticated_user(request)
        params = {
            'authenticated-user': user.id_erp,
        }
        response = self.responsebase.put(url=url, json=request.data, params=params)
        if response.status_code == 200:
            return Response(status=response.status_code)
        else:
            return Response({'Versat-response': response.json()},
                            status=response.status_code)

    @action(methods=['get'], detail=False)
    def servicios_actualizacion(self, request):
        user = authenticated_user(request)
        url = '%s' % ('cmz/solicitud_licencia_externo/servicios/')
        params = {
            'authenticated-user': user.id_erp,
            'cliente': request.GET.get('cliente'),
        }
        response = self.responsebase.get(url=url, params=params)
        if response.status_code == 200:
            return Response(data=response.json(), status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)

    @action(methods=['get'], detail=False)
    def servicios_venta(self, request):
        user = authenticated_user(request)
        url = '%s' % ('cmz/solicitud_licencia_externo/servicios_venta/')
        params = {
            'authenticated-user': user.id_erp,
            'convenio': request.GET.get('convenio'),
        }
        response = self.responsebase.get(url=url, params=params)
        if response.status_code == 200:
            return Response(data=response.json(), status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"}, status=response.status_code)

    @action(detail=False, methods=['get'])
    def widges_info(self, request):
        user = authenticated_user(request)
        url = 'cmz/solicitud_licencia_externo/widges_info/'
        params = {
            'authenticated-user': user.id_erp,
        }
        response = self.responsebase.get(url=url, params=params)
        return Response(response.json(), status=response.status_code)

    @action(detail=False, methods=['get'])
    def solicitud_licencia_correo(self, request):
        solicitud_licencia = request.GET.get('solicitud_licencia')
        url = 'cmz/solicitud_licencia_externo/%s/' % solicitud_licencia
        user = authenticated_user(request)
        params = {
            'authenticated-user': user.id_erp,
        }
        response = self.responsebase.get(url=url, params=params)
        if response.status_code == 200:
            if not response.json()['cliente_final_correo']:
                return Response(
                    {'Versat-response': 'El cliente: {} no tiene correo'.format(response.json()['cliente_final_nombre'])},
                    status=status.HTTP_400_BAD_REQUEST)
            else:
                solicitud_licencia_correo(response.json(), request)
                return Response({'message': 'Correo enviado correctamente!'}, status=status.HTTP_200_OK)
        else:
            return Response({'Versat-response': response.json()},
                            status=response.status_code)
