from django.conf.urls import url
from django.contrib import admin
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

from cards.views import index

schema_view = get_schema_view(
    openapi.Info(
        title="Techcard API",
        default_version="v1",
        description="Документация для приложения проекта Techcards",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("api/", include("api.urls")),
    path("auth/", include("users.urls")),
    path("cards/", include("cards.urls")),
    path("admin/", admin.site.urls),
    path("auth/", include("django.contrib.auth.urls")),
    path("about/", include("about.urls")),
    path("", index, name="index"),
]

urlpatterns += [
    url(
        r"^swagger(?P<format>\.json|\.yaml)$",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    url(
        r"^swagger/$",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    url(
        r"^redoc/$",
        schema_view.with_ui("redoc", cache_timeout=0),
        name="schema-redoc",
    ),
]
