import pytest
from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.mark.django_db()
def test_user_create(client):
    user_count = User.objects.count()
    response = client.post(
        "/api/users/",
        data={
            "username": "john2",
            "email": "mail@example.ru",
            "password": "1234567",
        },
    )
    assert (
        response.status_code != 404
    ), "Эндпоинт `/api/users/` не найден"
    assert User.objects.count() == user_count + 1, "Пользователь не создается"

@pytest.mark.django_db()
def test_invalid_data_user_create(client):
    user_count = User.objects.count()
    response = client.post(
        "/api/users/",
        data={
            "email": "mail@example.ru",
            "password": "1234567",
        },
    )
    assert response.status_code == 400, "Неверный ответ сервера"
    assert User.objects.count() == user_count, "Пользователь не должен быть создан "
