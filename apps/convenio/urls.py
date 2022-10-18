from rest_framework.routers import DefaultRouter

from apps.convenio.api.views.contrato_views import ContratoWebViewSet
from apps.convenio.api.views.convenio_views import ConvenioWebViewSet
from apps.convenio.api.views.servicio_contratado_views import ServicioContratadoViewSet
from apps.convenio.api.views.usuario_final_views import UsuarioFinalWebViewSet

router = DefaultRouter()

router.register('convenio', ConvenioWebViewSet, basename="convenio_web")
router.register('contrato', ContratoWebViewSet, basename="contrato_web")
router.register('servicio_contratado', ServicioContratadoViewSet,
                basename="servicio_contratado")
router.register('usuario_final', UsuarioFinalWebViewSet,
                basename="usuario_final")

urlpatterns = router.urls
