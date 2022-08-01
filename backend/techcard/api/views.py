from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status, exceptions
from rest_framework.decorators import action
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from django.core.mail import send_mail
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView)

from .serializers import (ProductSerializer, TokenObtainPairResponseSerializer,
                          TokenRefreshResponseSerializer, UserSerializer, TagSerializer, SendMailSerializer,
                          TechCardSerializer,)
from cards.models import Product, Tag, TechCard 
from .filters import ProductFilterSet                         


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

   
class TagViewSet(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = TagSerializer
    http_method_names = ['get', 'post', 'head', 'put', 'delete']

    def get_queryset(self):
        queryset = Tag.objects.filter(owner__id=self.request.user.id)
        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ProductViewSet(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = ProductSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ProductFilterSet
    http_method_names = ['get', 'post', 'head', 'put', 'delete']

    def get_queryset(self):
        queryset = Product.objects.filter(owner__id=self.request.user.id)
        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class SendMailApiView(APIView):
    permission_classes = (AllowAny,)
    
    @swagger_auto_schema(
        tags=("Почта",),
        operation_id="Отправка обратной связи",
        request_body=SendMailSerializer,
        responses={
            status.HTTP_200_OK: "Сообщение отправленно"
        })
    def post(self, request):
        try:
            title = self.request.data["title"]
            message = self.request.data["message"]
            return_address = self.request.data["return_address"]
        except KeyError:
            raise exceptions.ValidationError("Отсутствует необходимые поля")
        message += f'\n Адрес отправителя: {return_address}'
        send_mail(title, message, None, ['kikume34@gmail.com'])
        return Response(status=status.HTTP_200_OK, data='Сообщение отправленно')

        
class TechCardViewSet(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = TechCardSerializer
    http_method_names = ['get', 'post', 'head', 'put', 'delete']

    def get_queryset(self):
        queryset = TechCard.objects.filter(owner__id=self.request.user.id)
        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# def download_xlsx(request, id):
#     output = io.BytesIO()
#     workbook = Workbook(output, {"in_memory": True})
#     make_xlsx(workbook, id)
#     workbook.close()
#     output.seek(0)
#     response = HttpResponse(
#         output.read(),
#         content_type=(
#             "application/vnd.openxmlformats-officedocument"
#             ".spreadsheetml.sheet;"
#         ),
#     )
#     response[
#         "Content-Disposition"
#     ] = f"attachment; filename=techcard-{id}.xlsx;"
#     output.close()
#     return response