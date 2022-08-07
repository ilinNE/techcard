from re import S
from drf_spectacular.utils import OpenApiExample

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

UNAUTHORIZED_EXAMPLE = OpenApiExample(
    "Login example",
    description="""В HTTP заголовке не установлен 
                JWT-токен, или установлен неправильно""",
    value={"detail": "Учетные данные не были предоставлены."},
    response_only=True,
    status_codes=[401],
)

