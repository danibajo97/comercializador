from rest_framework.routers import DefaultRouter

from apps.convenio.api.views.convenio_views import ConvenioWebViewSet

router = DefaultRouter()

router.register('', ConvenioWebViewSet, basename="convenio_web")

urlpatterns = router.urls
