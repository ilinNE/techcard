from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView)

from .serializers import (TokenObtainPairResponseSerializer,
                          TokenRefreshResponseSerializer, UserSerializer)


@method_decorator(
    name="create",
    decorator=swagger_auto_schema(
        tags=["Пользователь"], operation_id="Создание пользователя"
    ),
)
class UserViewSet(GenericViewSet, CreateModelMixin):
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

    @action(
        detail=False,
        methods=["get"],
        url_path="me",
        permission_classes=[IsAuthenticated],
        serializer_class=UserSerializer,
    )
    @swagger_auto_schema(
        tags=["Пользователь"],
        operation_id="Профиль пользователя",
        operation_description=(
            "Получить информацию об аутентифицированном пользователе"
        ),
    )
    def users_me(self, request):
        user = request.user
        context = {"request": request}
        serializer = self.serializer_class(user, context=context)
        data = serializer.data
        return Response(data, status=status.HTTP_200_OK)


class DecoratedTokenObtainPairView(TokenObtainPairView):
    @swagger_auto_schema(
        tags=["JWT"],
        operation_id="Получить токен",
        operation_description=(
            "Отправляем логин и пароль, получаем access и refresh токены"
        ),
        responses={
            status.HTTP_200_OK: TokenObtainPairResponseSerializer,
        },
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class DecoratedTokenRefreshView(TokenRefreshView):
    @swagger_auto_schema(
        tags=["JWT"],
        operation_id="Обновить токен",
        operation_description=(
            "Отправляем refresh-токен, получаем access, и новый refresh"
        ),
        responses={
            status.HTTP_200_OK: TokenRefreshResponseSerializer,
        },
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
