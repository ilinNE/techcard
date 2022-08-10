from dataclasses import dataclass

from drf_spectacular.utils import OpenApiResponse, extend_schema
from drf_spectacular.types import OpenApiTypes
from rest_framework.serializers import ModelSerializer
from .serializers import (SendMailSerializer, TokenObtainPairResponseSerializer, TagSerializer,
                          ProductSerializer, TechCardSerializer)

import api.examples as examples

UNAUTHORIZED_RESPONSE = OpenApiResponse(
    OpenApiTypes.STR,
    examples=[examples.UNAUTHORIZED_EXAMPLE, examples.INVALID_TOKEN_EXAMPLE]
)
NOT_FOUND_RESPONSE = OpenApiResponse(
    OpenApiTypes.STR,
    examples=[examples.NOT_FOUND_EXAMPLE]
)
NOT_ALLOWED_RESPONSE = OpenApiResponse(
    OpenApiTypes.STR,
    examples=[examples.METHOD_NOT_ALLOWED_EXAMPLE]
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

SEND_MAIL_SCHEMA = {
    "tags": ["Почта"],
    "summary": "Отправка почты",
    "examples": [examples.SEND_MAIL_EXAMPLE],
    "request": SendMailSerializer,
    "responses": {
        200: OpenApiResponse(
            str, examples=[examples.SEND_MAIL_RESPONSE_EXAMPLE]
        ),
        401: UNAUTHORIZED_RESPONSE,
        405: NOT_ALLOWED_RESPONSE,

    },
}


@dataclass
class SchemaParams():
    serializer: ModelSerializer

    def get_params(self) -> dict:
        params = {
            "list": extend_schema(
                summary="Список",
                responses = {
                    200: self.serializer,
                    401: UNAUTHORIZED_RESPONSE,
                    405: NOT_ALLOWED_RESPONSE,
                }
            ),
            "create": extend_schema(
                summary="Создать",
                responses = {
                    201: self.serializer,
                    401: UNAUTHORIZED_RESPONSE,
                    405: NOT_ALLOWED_RESPONSE,
                }
            ),
            "retrieve": extend_schema(
                summary="Получить",
                responses = {
                    200: self.serializer,
                    401: UNAUTHORIZED_RESPONSE,
                    404: NOT_FOUND_RESPONSE,
                    405: NOT_ALLOWED_RESPONSE,
                }
            ),
            "update": extend_schema(
                summary="Изменить",
                responses = {
                    200: self.serializer,
                    401: UNAUTHORIZED_RESPONSE,
                    404: NOT_FOUND_RESPONSE,
                    405: NOT_ALLOWED_RESPONSE,
                }
            ),
            "destroy": extend_schema(
                summary="Удалить",
                responses = {
                    204: None,
                    401: UNAUTHORIZED_RESPONSE,
                    404: NOT_FOUND_RESPONSE,
                    405: NOT_ALLOWED_RESPONSE,
                }
            ),
        }
        return params

TAG_SCHEMA = SchemaParams(TagSerializer)
PRODUCT_SCHEMA = SchemaParams(ProductSerializer)
TECHCARD_SCHEMA = SchemaParams(TechCardSerializer)
