import pytest
from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.mark.django_db()
def test_auth(client):
    user_count = User.objects.count()
    response = client.post(
        "/api/user/",
        data={"username": "john2","email":"mail@example.ru", "password": "1234567"},
    )
    assert (
        response.status_code != 404
    ), "Страница `/api/v1/api-token-auth/` не найдена, проверьте этот адрес в *urls.py*"
    assert (
        User.objects.count() == user_count + 1
    ), "Пользователь не создается"

