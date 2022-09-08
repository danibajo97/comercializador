from rest_framework.routers import DefaultRouter

from apps.convenio.api.views.convenio_views import *

router = DefaultRouter()

router.register('', UserViewSet, basename="users")

urlpatterns = router.urls
