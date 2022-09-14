"""comercializador URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.views.generic import TemplateView
from django.urls import path, include, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from apps.users.api.views.authentication_views import RegisterUsersFromVersatErpView, ActivationCodeView, Login, Logout

schema_view = get_schema_view(
    openapi.Info(
        title="Comercializador Remoto API",
        default_version='v1',
        description="Web del Comercializador",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="erpuser@datazucar.cu"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

local_urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('rest_framework.urls')),
    path('api-usuarios/', include('apps.users.api.routers')),
    path('api-convenio/', include('apps.convenio.api.routers')),
    path('api-login/', Login.as_view(), name='login'),
    path('api-logout/', Logout.as_view(), name='logout'),
    path('registro-usuarios/', RegisterUsersFromVersatErpView.as_view(),
         name='register_users_from_versaterp'),
    path('activacion/<uidb64>/<token>/',
         ActivationCodeView.as_view(), name='activation_code'),
]

swagger_urlpatterns = [
    # re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger',
         cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc',
         cache_timeout=0), name='schema-redoc'),
]

local_urlpatterns = [
    # admin
    path('admin/', admin.site.urls),
    # template react
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
]

jwt_urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns = local_urlpatterns + swagger_urlpatterns + jwt_urlpatterns
