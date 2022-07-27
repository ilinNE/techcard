from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (DecoratedTokenObtainPairView, DecoratedTokenRefreshView,
                    UserViewSet)

app_name = "api"
router = DefaultRouter()
router.register("user", UserViewSet, basename="users")

urlpatterns = [
    path("", include(router.urls)),
    path(
        "auth/jwt/create/",
        DecoratedTokenObtainPairView.as_view(),
        name="obtain_token",
    ),
    path(
        "auth/jwt/refresh/",
        DecoratedTokenRefreshView.as_view(),
        name="refresh_token",
    ),
]
