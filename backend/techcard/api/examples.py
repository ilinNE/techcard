from re import S
from drf_spectacular.utils import OpenApiExample
from pyrsistent import v

LOGIN_EXAMPLE = OpenApiExample(
    "Login example",
    value={"username": "nikita", "password": "e4@id2M94"},
    request_only=True,
)

TOKEN_EXAMPLE = OpenApiExample(
    "Token example",
    value={
        "refresh": (
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmV"
            "mcmVzaCIsImV4cCI6MTY2MjQ2NjYxNSwianRpIjoiMzVmNmY2ZmRhMmYzNGI"
            "1OTk4ZDgzZTZhNzdjMzIzM2YiLCJ1c2VyX2lkIjoxfQ.O9iTUD6ZfoWtScQE"
            "v8IppPBgcft3UqWzq-Ts6KhiQ8Y"
        ),
        "access": (
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWN"
            "jZXNzIiwiZXhwIjoxNjU5OTYxMDE1LCJqdGkiOiJjYThkZTNhOGQ3MmU0Nzl"
            "hOGIzMmM5ZGFjMWJhNzU2YiIsInVzZXJfaWQiOjF9.nxnMUDBdREXSp4cWZd"
            "GsiiFqnvJ98tvKde_BRKGo0Rw"
        ),
    },
)

REFRESH_EXAMPLE = OpenApiExample(
    "Refresh example",
    value={
        "refresh": (
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmV"
            "mcmVzaCIsImV4cCI6MTY2MjQ2NjYxNSwianRpIjoiMzVmNmY2ZmRhMmYzNGI"
            "1OTk4ZDgzZTZhNzdjMzIzM2YiLCJ1c2VyX2lkIjoxfQ.O9iTUD6ZfoWtScQE"
            "v8IppPBgcft3UqWzq-Ts6KhiQ8Y"
        ),
    },
    request_only=True,
)
METHOD_NOT_ALLOWED_EXAMPLE = OpenApiExample(
    "Метод недоступен",
    value={
        "detail": "Метод \"<Название метода>\" не разрешен."
    },
    response_only=True,
    status_codes=[405],
)
NOT_FOUND_EXAMPLE = OpenApiExample(
    "Not found",
    description="""Элемент с указанным id не существует,
                или не принадлежит текущему пользователю""",
    value={"detail": "Страница не найдена."},
    response_only=True,
    status_codes=[404],
)

UNAUTHORIZED_EXAMPLE = OpenApiExample(
    "Ошибка авторизации",
    description="""В HTTP заголовке не установлен 
                JWT-токен, или установлен неправильно""",
    value={"detail": "Учетные данные не были предоставлены."},
    response_only=True,
    status_codes=[401],
)

INVALID_TOKEN_EXAMPLE = OpenApiExample(
    "Недействительный токен",
    description="""Истёк срок действия токена""",
    value={
        "detail": "Given token not valid for any token type",
        "code": "token_not_valid",
        "messages": [
            {
                "token_class": "AccessToken",
                "token_type": "access",
                "message": "Token is invalid or expired"
            }
        ]
    },
    response_only=True,
    status_codes=[401],
)

SEND_MAIL_EXAMPLE = OpenApiExample(
    "Отправка сообщения",
    value= {
        "title": "Заголовок",
        "message": "Здарвствуйте! Досвидания!",
        "return_address": "example@mail.ru"
    },
    request_only=True,
)

SEND_MAIL_RESPONSE_EXAMPLE = OpenApiExample(
    "Удачная отправка",
    value= ['Сообщение отправленно'],
    response_only=True,
)

TAG_RESPONSE_EXAMPLE = OpenApiExample(
    'Tag response example',
    value={
        'id': 4,
        'name': "yellow",
        'color': "#ffff00",
    },
    response_only=True,
)

TAG_REQUEST_EXAMPLE = OpenApiExample(
    'Tag request example',
    value={
        'name': "yellow",
        'color': "#ffff00",
    },
    request_only=True,
)

PRODUCT_PIECES_EXAMPLE = OpenApiExample(
    'Создание/обновление штучного продукта',
    value={
        "name": "Яйцо куриное",
        "unit": "Шт",
        "unit_weight": "0.050",
        "price": "6.90",
        "tags": [2, 3]
    },
    request_only=True,
)

PRODUCT_WEIGHT_EXAMPLE = OpenApiExample(
    'Создание/обновление весового продукта',
    value={
        "name": "Картофель",
        "price": "6.90",
        "tags": [2,3]
    },
    request_only=True,
)

PRODUCT_RESPONSE_EXAMPLE = OpenApiExample(
    'Product response example',
    value={
        "id": 18,
        "name": "Яйцо куриное",
        "unit": "Шт",
        "unit_weight": "0.050",
        "price": "6.90",
        "tags": [2, 3]
    },
    response_only=True,
)

TECHCARD_REQUEST_EXAMPLE = OpenApiExample(
    'Создание техкарты',
    value={
        "ingredients": [
            {
                "product": 2,
                "amount": "1.00",
                "cold_waste": "0",
                "hot_waste": "0"
            }
        ],
    "name": "Яичница",
    "description": "Разбить яйца и пожарить",
    "is_semifabricate": False,
    "weight": "0",
    "tags": [2, 9 ]
    },
    request_only=True,
)

TECHCARD_RESPONSE_EXAMPLE = OpenApiExample(
    'Техкарта',
    value={
        "id": 20,
        "ingredients": [
            {
                "product": 2,
                "unit": "Шт",
                "amount": "1.000",
                "cold_waste": "0.000",
                "hot_waste": "0.000"
            }
        ],
        "name": "Яичница",
        "create_date": "2022-08-09",
        "modified_date": "2022-08-09T23:53:04.270071Z",
        "description": "Разбить яйца и пожарить",
        "is_semifabricate": False,
        "weight": "0.000",
        "semifabricate": None,
        "tags": [2, 9]
    },
    response_only=True,
)
