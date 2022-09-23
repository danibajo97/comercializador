from rest_framework.routers import DefaultRouter

from apps.convenio.api.views.contrato_views import ContratoWebViewSet
from apps.convenio.api.views.convenio_views import ConvenioWebViewSet

router = DefaultRouter()

router.register('convenio', ConvenioWebViewSet, basename="convenio_web")
router.register('contrato', ContratoWebViewSet, basename="contrato_web")
router.register('servicio_contratado', ServicioContratadoViewSet, basename="servicio_contratado")

urlpatterns = router.urls
