from django.utils.decorators import method_decorator
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
from drf_spectacular.utils import extend_schema, extend_schema_view, OpenApiResponse

from .serializers import (ProductSerializer, TokenObtainPairResponseSerializer,
                          TokenRefreshResponseSerializer, UserSerializer, TagSerializer, SendMailSerializer,
                          TechCardSerializer,)
from cards.models import Product, Tag, TechCard 
from .filters import ProductFilterSet
import api.schemas as schemas                
import api.examples as examples  

@extend_schema(tags=["Пользователи"])
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
    def users_me(self, request):
        user = request.user
        context = {"request": request}
        serializer = self.serializer_class(user, context=context)
        data = serializer.data
        return Response(data, status=status.HTTP_200_OK)


class DecoratedTokenObtainPairView(TokenObtainPairView):
    @extend_schema(**schemas.TOKEN_OBTAIN_SCHEMA)
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class DecoratedTokenRefreshView(TokenRefreshView):
    @extend_schema(**schemas.TOKEN_REFRESH_SCHEMA)
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


@extend_schema(tags=["Тэги"])
@extend_schema_view(**schemas.TAGS)
class TagViewSet(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = TagSerializer
    http_method_names = ['get', 'post', 'head', 'put', 'delete']

    def get_queryset(self):
        queryset = Tag.objects.filter(owner__id=self.request.user.id)
        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


@extend_schema(tags=["Продукты"])
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

    @extend_schema(tags=["Почта"], summary="Отправка почты")    
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


@extend_schema(tags=["Техкарты"])     
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