from django.db import transaction
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.base.response_base import ResponseBase
from apps.users.resources.authenticated_user import authenticated_user


class UsuarioFinalWebViewSet(viewsets.GenericViewSet):
    responsebase = ResponseBase()

    def list(self, request):
        user = authenticated_user(request)
        url = 'cmz/usuario_final/'
        params = {
            'authenticated-user': user.id_erp,
            'negocio': request.GET.get('id_convenio')
        }
        response = self.responsebase.get(url=url, params=params)
        return Response(response.json(), status=response.status_code)

    @transaction.atomic
    def create(self, request):
        user = authenticated_user(request)
        url = 'cmz/usuario_final/'
        if request.GET.get('id_contacto'):
            params = {
                'authenticated-user': user.id_erp,
                'contacto_existe': request.GET.get('id_contacto'),
            }
            response = self.responsebase.post(
                url=url, params=params)
        else:
            params = {
                'authenticated-user': user.id_erp,
            }
            response = self.responsebase.post(
                url=url, json=request.data, params=params)
        if response.status_code == 201:
            return Response({'Comercializador-response': 'Creado correctamente',
                             'Versat-response': response.json()}, status=response.status_code)
        else:
            return Response({'Versat-response': response.json()},
                            status=response.status_code)

    @transaction.atomic
    def update(self, request, pk):
        user = authenticated_user(request)
        url = 'cmz/usuario_final/%s/' % pk
        if request.GET.get('id_contacto'):
            params = {
                'authenticated-user': user.id_erp,
                'contacto_existe': request.GET.get('id_contacto'),
            }
            response = self.responsebase.put(
                url=url, params=params)
        else:
            params = {
                'authenticated-user': user.id_erp,
            }
            response = self.responsebase.put(
                url=url, json=request.data, params=params)
        if response.status_code == 200:
            return Response({'Comercializador-response': 'Actualizado Correctamente',
                             'Versat-response': response.json()}, status=response.status_code)
        else:
            return Response({'Versat-response': response.json()},
                            status=response.status_code)

    @transaction.atomic
    def retrieve(self, request, pk):
        url = 'cmz/usuario_final/%s/' % pk
        response = self.responsebase.get(url=url)
        if response.status_code == 200:
            return Response({'Versat-response': response.json()}, status=response.status_code)
        else:
            return Response({'Versat-response': response.json()},
                            status=response.status_code)

    @transaction.atomic
    def destroy(self, request, pk):
        user = authenticated_user(request)
        url = 'cmz/usuario_final/%s/' % pk
        params = {
            'authenticated-user': user.id_erp,
        }
        response = self.responsebase.delete(url=url, params=params)
        if response.status_code == 204:
            return Response({'Comercializador-response': 'Eliminado correctamente'},
                            status=response.status_code)
        else:
            return Response({'Versat-response': response.json()},
                            status=response.status_code)

    @action(methods=['get'], detail=False)
    def lista_clientes_finales(self, request):
        user = authenticated_user(request)
        url = '%s' % ('cmz/cliente_final/lista_clientes_finales/')
        params = {
            'authenticated-user': user.id_erp,
            'negocio_plazo': request.GET.get('id_convenio'),
            'plazopagoservicio': request.GET.get('plazo_pago_servicio')
        }
        response = self.responsebase.get(url=url, params=params)
        if response.status_code == 200:
            return Response(data=response.json(), status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)

    @action(methods=['get'], detail=False)
    def lista_contactos(self, request):
        user = authenticated_user(request)
        url = 'cmz/servicio/contactos/'
        params = {
            'authenticated-user': user.id_erp,
        }
        response = self.responsebase.get(url=url, params=params)
        if response.status_code == 200:
            return Response({'Versat-response': response.json()}, status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)

    @action(methods=['get'], detail=False)
    def lista_personas_asociadas(self, request):
        url = 'cmz/cliente_final/personas_asociadas/'
        params = {
            'cliente': request.GET.get('cliente'),
            'negocio': request.GET.get('convenio')
        }
        response = self.responsebase.get(url=url, params=params)
        if response.status_code == 200:
            return Response({'response': response.json()}, status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)

    @action(methods=['put'], detail=False, url_path='aceptar_cliente_final', url_name='aceptar_cliente_final')
    def aceptar_cliente_final(self, request):
        user = authenticated_user(request)
        url = 'cmz/cliente_final/aceptar_cliente_final/'
        params = {
            'authenticated-user': user.id_erp,
        }
        response = self.responsebase.put(
            url=url, json=request.data, params=params)
        if response.status_code == 200:
            return Response({'Comercializador-response': 'Actualizado correctamente'},
                            status=response.status_code)
        else:
            return Response({'Versat-response': response.json()},
                            status=response.status_code)

    @action(methods=['get'], detail=False, url_path='paises', url_name='paises')
    def paises(self, request):
        user = authenticated_user(request)
        url = 'servicio/pais_list/'
        params = {
            'authenticated-user': user.id_erp,
        }
        response = self.responsebase.get(url=url, params=params)
        return Response(response.json(), status=response.status_code)

    @action(methods=['get'], detail=False, url_path='provincias_municipios', url_name='provincias_municipios')
    def provincias_municipios(self, request):
        provincias = self.__provinciasAll()
        municipios = self.__municipiosAll()

        result = []
        for p in provincias:
            muni = self.__searchByProvincia(
                municipios=municipios, provinciaId=p.get('id'))
            for m in muni:
                result.append({
                    'provincia': p.get('nombre'),
                    'municipio_nombre': m.get('nombre'),
                    'municipio_id': m.get('id')
                })
        return Response(result)

    def __provinciasAll(self):
        url = 'servicio/provincias/'
        response = self.responsebase.get(url=url)
        return response.json()

    def __municipiosAll(self):
        url = 'servicio/municipios/'
        response = self.responsebase.get(url=url)
        return response.json()

    def __searchByProvincia(self, municipios, provinciaId):
        result = []
        for m in municipios:
            if str(m.get('provincia')) == str(provinciaId):
                result.append(m)
        return result

    @action(methods=['get'], detail=False)
    def gestionados_por(self, request):
        user = authenticated_user(request)
        url = '%s' % ('cmz/usuario_final/gestionado_por/')
        params = {
            'authenticated-user': user.id_erp,
            'cliente': user.id_erp,
        }
        response = self.responsebase.get(url=url, params=params)
        if response.status_code == 200:
            return Response(data=response.json(), status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)
