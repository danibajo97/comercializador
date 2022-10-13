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
        if request.GET.get('id_usuario_final'):
            url = '%s%s/' % ('cmz/usuario_final/',
                             request.GET.get('id_usuario_final'))
        else:
            url = 'cmz/usuario_final/'
        params = {
            'authenticated-user': user.id_erp,
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
        url = '%s%s/' % ('cmz/cliente_final/lista_clientes_finales/',
                         request.GET.get('id_convenio'))
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
    def lista_contactos(self, request):
        user = authenticated_user(request)
        url = 'servicio/contactos/'
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
        user = authenticated_user(request)
        url = '%s%s/' % ('cmz/cliente_final/personas_asociadas/',
                         request.GET.get('id_convenio'))
        params = {
            'authenticated-user': user.id_erp,
        }
        response = self.responsebase.get(url=url, params=params)
        if response.status_code == 200:
            return Response({'Versat-response': response.json()}, status=response.status_code)
        else:
            return Response({'message': "Hubo problemas al conectar con el servidor"},
                            status=response.status_code)

    @action(methods=['put'], detail=False, url_path='aceptar_cliente_final', url_name='aceptar_cliente_final')
    def aceptar_cliente_final(self, request):
        '''
        http://localhost:8000/cmz/cliente_final/aceptar_cliente_final/
        json: {
            "negocio":"c0be9863-704d-416d-a292-87051bff106a",
            "clienteData":["0ed6bd54-c3e1-5163-89f8-c670efc9414d","6f91502b-69c1-54b6-a56a-064f372132e2"]
            }
        '''
        user = authenticated_user(request)
        url = 'cmz/usuario_final/aceptar_cliente_final/'
        params = request.query_params  # no se si es asi,
        # Si es creando a partir de un contacto seleccionado, mandar parametro
        # contacto_existe = contacto seleccionado, en otro caso no pasar el parametro
        params['id_contacto'] = user.id_erp
        response = self.responsebase.put(
            url=url, params=params, json=request.data)
        if response.status_code == 200:
            return Response({'Comercializador-response': 'Actualizado Correctamente',
                             'Versat-response': response.json()}, status=response.status_code)
        else:
            return Response({'Versat-response': response.json()},
                            status=response.status_code)
