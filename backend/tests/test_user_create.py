import pytest
from django.contrib.auth import get_user_model

User = get_user_model()


class TestUserCreate:
    url = "/api/users/"

    @pytest.mark.django_db()
    def test_user_create__valid_data(self, client):
        user_count = User.objects.count()
        valid_data = {
                "username": "john2",
                "email": "mail@example.ru",
                "password": "1234567",
            }
        response = client.post(self.url, data=valid_data)
        assert response.status_code != 404, (
            "Эндпоинт `/api/users/` не найден"
        )
        assert User.objects.count() == user_count + 1, "Пользователь не создается"

    @pytest.mark.django_db()
    def test_user_create__no_data(self, client):
        user_count = User.objects.count()
        response = client.post(self.url)
        assert response.status_code == 400, (
            "Запрос без данных должен вернуть код 400"
        )
        expected_fields = ["username", "password", "email"]
        for field in expected_fields:
            assert field in response.json().keys(), (
                "В ответе должны быть указаны недостающие обязательные поля",
                f"Указание на поле {field} не найдено в теле ответа"
            )
        assert User.objects.count() == user_count, (
            "Пользователь не должен быть создан при запросе без данных"
        )

    @pytest.mark.django_db()
    def test_user_create__empty_data(self, client):
        user_count = User.objects.count()
        empty_data = {
            "username": "",
            "email": "",
            "password": "",
        }
        response = client.post(self.url, data=empty_data)
        assert response.status_code == 400, (
            "Запрос с пустыми значениями должен вернуть код 400"
        )
        expected_fields = ["username", "password", "email"]
        for field in expected_fields:
            assert field in response.json().keys(), (
                "В ответе должны быть указаны поля,",
                " значение которых не может быть пустым",
                f"Указание на поле {field} не найдено в теле ответа"
            )
        assert User.objects.count() == user_count, (
            "Пользователь не должен быть создан при запросе с пустыми значениями"
        )

    @pytest.mark.django_db()
    def test_user_create__invalid_email(self, client):
        user_count = User.objects.count()
        invalid_data = {
                "username": "john2",
                "email": "mailexample.ru",
                "password": "1234567",
        }
        response = client.post(self.url, data=invalid_data)
        assert response.status_code == 400, (
            "Запрос с некорректным email должен вернуть код 400"
        )
        assert "email" in response.json().keys(), (
            "В ответе должно быть указано на поле email"
        )
        assert User.objects.count() == user_count, (
            "Пользователь не должен быть создан при запросе неправильным email"
        )

    @pytest.mark.django_db()
    def test_user_create__existed_user(self, client, user):
        user_count = User.objects.count()
        existed_user_data = {
            "username": "TestUser",
            "email": "mail@example.ru",
            "password": "1234567",
        }
        response = client.post(self.url, data=existed_user_data)
        assert response.status_code == 400, (
            "Запрос с некорректным email должен вернуть код 400"
        )
        assert "username" in response.json().keys(), (
            "В ответе должно быть указано что пользователь с таким именем",
            "уже существует"
        )
        assert User.objects.count() == user_count, (
            "Пользователь не должен быть создан при запросе неправильным email"
        )

