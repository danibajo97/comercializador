from django.urls import path
from rest_framework.routers import DefaultRouter

from api.seguridad.view.persona import PersonaView
from . import views

router = DefaultRouter()
router.register(prefix='persona', viewset=PersonaView,
                basename='seguridad_persona')


urlpatterns = [
    path('', views.index, name='index'),
]

urlpatterns += router.urls
