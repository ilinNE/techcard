from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (DecoratedTokenObtainPairView, DecoratedTokenRefreshView,
                    UserViewSet, TagViewSet, ProductViewSet, SendMailApiView, TechCardViewSet)
                    

app_name = "api"
router = DefaultRouter()
router.register("users", UserViewSet, basename="users")
router.register("tags", TagViewSet, basename="tags")
router.register("products", ProductViewSet, basename="products")
router.register("techcards", TechCardViewSet, basename="techcards")

urlpatterns = [
    path("", include(router.urls)),
    path("send_mail/", SendMailApiView.as_view(), name='send_mail' ),
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

