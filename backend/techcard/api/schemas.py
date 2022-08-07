from drf_spectacular.utils import OpenApiResponse, extend_schema
from drf_spectacular.types import OpenApiTypes

from .serializers import TokenObtainPairResponseSerializer, TagSerializer
import api.examples as examples

UNAUTHORIZED_RESPONSE = OpenApiResponse(
    OpenApiTypes.STR,
    description="Unauthorized",
    examples=[examples.UNAUTHORIZED_EXAMPLE]
)

TAG_RESPONSE = OpenApiResponse(
    TagSerializer,
    description="Ok",
)

TOKEN_OBTAIN_SCHEMA = {
    "tags": ["Аутентификация"],
    "description": "Получить access и refresh токены по username и password",
    "summary": "Получение токена",
    "auth": None,
    "examples": [examples.LOGIN_EXAMPLE], 
    "responses": {
        200: OpenApiResponse(
            TokenObtainPairResponseSerializer,
            description="Ok",
            examples=[examples.TOKEN_EXAMPLE],
        ),
    },
}

TOKEN_REFRESH_SCHEMA = {
    "tags": ["Аутентификация"],
    "description": "Получить новые access и refresh токены по access токену",
    "summary": "Обновление токена",
    "auth": None,
    "examples": [examples.REFRESH_EXAMPLE], 
    "responses": {
        200: OpenApiResponse(
            TokenObtainPairResponseSerializer,
            description="Ok",
            examples=[examples.TOKEN_EXAMPLE],
        )
    },
}
TAGS = {
    "list":extend_schema(
        summary="Список тэгов",
        responses = {
            200: TAG_RESPONSE,
            401: UNAUTHORIZED_RESPONSE
        }
    ),
    "create":extend_schema(
        summary="Создать тэг",
        responses = {
            201: OpenApiResponse(TagSerializer, description='Created'),
            401: UNAUTHORIZED_RESPONSE
        }
    ),
    "retrieve":extend_schema(
        summary="Получить тэг",
        responses = {
            200: TAG_RESPONSE,
            401: UNAUTHORIZED_RESPONSE
        }
    ),
    "update":extend_schema(
        summary="Изменить тэг",
        responses = {
            200: TAG_RESPONSE,
            401: UNAUTHORIZED_RESPONSE
        }
    ),
    "destroy":extend_schema(
        summary="Удалить тэг",
        responses = {
            204: OpenApiResponse(description="No content"),
            401: UNAUTHORIZED_RESPONSE
        }
    ),
}
PRODUCTS = {
    "list":extend_schema(
        summary=""
    ),
    "create":extend_schema(
        summary=""
    ),
    "retrieve":extend_schema(
        summary=""
    ),
    "update":extend_schema(
        summary=""
    ),
    "destroy":extend_schema(
        summary=""
    ),
}
TECHCARDS = {
    "list":extend_schema(
        summary=""
    ),
    "create":extend_schema(
        summary=""
    ),
    "retrieve":extend_schema(
        summary=""
    ),
    "update":extend_schema(
        summary=""
    ),
    "destroy":extend_schema(
        summary=""
    ),
}
