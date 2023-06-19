from rest_framework.routers import DefaultRouter

from apps.convenio.api.views.contacto_externo_views import ContactoExternoWebViewSet
from apps.convenio.api.views.contrato_views import ContratoWebViewSet
from apps.convenio.api.views.convenio_views import ConvenioWebViewSet
from apps.convenio.api.views.servicio_contratado_views import ServicioContratadoViewSet
from apps.convenio.api.views.plazo_pago_servicio_views import PlazoPagoServicioViewSet
from apps.convenio.api.views.plazo_pago_view import PlazoPagoViewSet
from apps.convenio.api.views.usuario_final_views import UsuarioFinalWebViewSet
from apps.convenio.api.views.solicitud_licencia_views import SolicitudLicenciaViewSet

router = DefaultRouter()

router.register('convenio', ConvenioWebViewSet, basename="convenio_web")
router.register('contrato', ContratoWebViewSet, basename="contrato_web")
router.register('servicio_contratado', ServicioContratadoViewSet,
                basename="servicio_contratado")
router.register('plazo_pago', PlazoPagoViewSet, basename="plazo_pago")
router.register('plazo_pago_servicio', PlazoPagoServicioViewSet,
                basename="plazo_pago_servicio")
router.register('usuario_final', UsuarioFinalWebViewSet,
                basename="usuario_final")
router.register('solicitud_licencia', SolicitudLicenciaViewSet,
                basename="solicitud_licencia")
router.register('contacto_externo', ContactoExternoWebViewSet,
                basename="contacto_externo")

urlpatterns = router.urls
