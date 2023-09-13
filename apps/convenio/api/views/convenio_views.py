from django.db import transaction
from django.http import HttpResponse
from django.template.loader import get_template
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from xhtml2pdf import pisa

from apps.base.response_base import ResponseBase
from apps.base.swagger_schema import parameter
from apps.users.resources.authenticated_user import authenticated_user


class ConvenioWebViewSet(viewsets.GenericViewSet):
    responsebase = ResponseBase()
    id = parameter(
        name='id', description="Id de convenio", type=openapi.TYPE_STRING)

    @transaction.atomic
    def create(self, request):
        user = authenticated_user(request)
        url = 'cmz/convenio_externo/'
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

    def list(self, request):
        user = authenticated_user(request)
        url = 'cmz/convenio_externo/'
        params = {
            'authenticated-user': user.id_erp,
            **request.GET
        }
        response = self.responsebase.get(url=url, params=params)
        return Response(response.json(), status=response.status_code)

    @transaction.atomic
    def update(self, request, pk):
        user = authenticated_user(request)
        params = {
            'authenticated-user': user.id_erp,
        }
        url = 'cmz/convenio_externo/%s/' % pk
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
        user = authenticated_user(request)
        params = {
            'authenticated-user': user.id_erp,
        }
        url = 'cmz/convenio_externo/%s/' % pk
        response = self.responsebase.get(url=url, params=params)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'Versat-response': response.json()},
                            status=response.status_code)

    @transaction.atomic
    def destroy(self, request, pk):
        user = authenticated_user(request)
        params = {
            'authenticated-user': user.id_erp,
        }
        url = 'cmz/convenio_externo/%s/' % pk
        response = self.responsebase.delete(url=url, params=params)
        if response.status_code == 204:
            return Response({'Comercializador-response': 'Eliminado correctamente'},
                            status=response.status_code)
        else:
            return Response({'Versat-response': response.json()},
                            status=response.status_code)

    @action(detail=False, methods=['get'])
    def usuarios_finales(self, request):
        user = authenticated_user(request)
        params = {
            'authenticated-user': user.id_erp,
            'idcontacto': user.id_erp,
        }
        url = 'cmz/convenio_externo/usuarios_finales/'
        response = self.responsebase.get(url=url, params=params)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'Versat-response': response.json()},
                            status=response.status_code)

    @action(detail=False, methods=['get'])
    def list_servicios(self, request):
        user = authenticated_user(request)
        params = {
            'authenticated-user': user.id_erp,
            'idcontacto': user.id_erp,
            'idplazopago': request.GET.get('id_plazopago'),
            'idconvenio': request.GET.get('id_convenio'),
        }
        url = 'cmz/convenio_externo/lista-servicios/'
        response = self.responsebase.get(url=url, params=params)
        if response.status_code == 200:
            return Response(response.json(), status=response.status_code)
        else:
            return Response({'Versat-response': response.json()},
                            status=response.status_code)

    @swagger_auto_schema(manual_parameters=[id])
    @action(detail=False, methods=['get'])
    def validar_convenio(self, request):
        user = authenticated_user(request)
        params = {
            'authenticated-user': user.id_erp,
            'id': request.GET.get('id'),
        }
        url = 'cmz/convenio_externo/validar_convenio/'
        response = self.responsebase.get(url=url, params=params)
        if response.status_code == 202:
            return Response(status=response.status_code)
        else:
            return Response({'Versat-response': response.json()},
                            status=response.status_code)

    @swagger_auto_schema(manual_parameters=[id])
    @action(detail=False, methods=['get'])
    def terminar_convenio(self, request):
        user = authenticated_user(request)
        params = {
            'authenticated-user': user.id_erp,
            'id': request.GET.get('id'),
        }
        url = 'cmz/convenio_externo/terminar_convenio/'
        response = self.responsebase.get(url=url, params=params)
        if response.status_code == 202:
            return Response(status=response.status_code)
        else:
            return Response({'Versat-response': response.json()},
                            status=response.status_code)

    @action(detail=False, methods=['get'])
    def widges_info(self, request):
        user = authenticated_user(request)
        url = 'cmz/convenio_externo/widges_info/'
        params = {
            'authenticated-user': user.id_erp,
        }
        response = self.responsebase.get(url=url, params=params)
        return Response(response.json(), status=response.status_code)

    @action(detail=False, methods=['get'])
    def convenio_pdf(self, request):
        user = authenticated_user(request)
        params = {
            'authenticated-user': user.id_erp,
            'idconvenio': request.GET.get('id_convenio'),
        }
        url = 'cmz/convenio_externo/convenio_pdf/'
        response = self.responsebase.get(url=url, params=params)
        if response.status_code == 200:
            template = get_template('pdf_template/convenio_pdf_template.html')
            context = {
                'convenio_dict': response.json()['convenio_dict'],
                'plazo_pago_list': response.json()['plazo_pago_list']
            }
            html = template.render(context)

            response_pdf = HttpResponse(content_type='application/pdf')
            response_pdf['Content-Disposition'] = 'attachment; filename="report.pdf"'

            pisa_status = pisa.CreatePDF(
                html, dest=response_pdf,
                encoding='utf-8'
            )

            if pisa_status.err:
                return HttpResponse('Error al generar el PDF', content_type='text/plain')
            return response_pdf
        else:
            return Response({'Versat-response': response.json()},
                            status=response.status_code)
