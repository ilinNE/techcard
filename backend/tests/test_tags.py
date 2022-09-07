import pytest
from cards.models import Tag


class TestTag:
    url = "/api/tags/"
    valid_data = {"name": "yellow", "color": "#ffaa00"}

    @pytest.mark.django_db()
    def test_tag_create__invalid_data(self, user_client):
        tag_count = Tag.objects.count()
        response = user_client.post(self.url)
        assert response.status_code == 400, (
            f"При отправке запроса без тела на {self.url}",
            "код ответа должен быть  400",
        )
        assert (
            Tag.objects.count() == tag_count
        ), "Тэг не должен быть создан, при пустом запросе"
        empty_data = {"name": "", "color": ""}
        response = user_client.post(self.url, data=empty_data)
        assert response.status_code == 400, (
            f"При отправке запроса с пустыми значениями на {self.url}",
            "код ответа должен быть  400",
        )
        assert (
            Tag.objects.count() == tag_count
        ), "Тэг не должен быть создан, при запросе с пустыми знеачениями"

    @pytest.mark.django_db()
    def test_tag_create__unauthorized(self, client):
        tag_count = Tag.objects.count()
        response = client.post(self.url, data=self.valid_data)
        assert (
            response.status_code == 401
        ), "Неавторизованный пользователь не может создать тэг"
        assert (
            Tag.objects.count() == tag_count
        ), "Неавторизованный пользователь не может создать тэг"

    @pytest.mark.django_db
    def test_tag_create__valid_data(self, user_client):
        tag_count = Tag.objects.count()
        response = user_client.post(self.url, data=self.valid_data)
        assert (
            response.status_code == 201
        ), "При успешном создании тега должен возвращаться код 201"
        assert (
            Tag.objects.count() == tag_count + 1
        ), "При валидном запросе, тэг должен быть добавлен в БД"

    @pytest.mark.django_db
    def test_tag_get_list(self, user_client, tag_1, tag_2):
        response = user_client.get(self.url)
        assert response.status_code == 200, (
            "Запрос списка тэгов работает некорректно.",
            f"Код ответа: {response.status_code}",
        )
        assert (
            len(response.json()) <= 2
        ), "Список тэгов содержит лишние элементы"
        assert len(response.json()) >= 2, "Список тэгов не полный"

    @pytest.mark.django_db
    def test_tag_retrieve(self, user_client, tag_1):
        url = self.url + str(tag_1.id) + "/"
        response = user_client.get(url)
        assert response.status_code == 200, (
            f"Запрос отдельного тэга работает некорректно.",
            f"Код ответа: {response.status_code}",
        )
        assert (
            response.json().get("id") == tag_1.id
        ), "Получены данныые не запрашиваемого обьекта"
        expected_fields = ["id", "name", "color"]
        for field in expected_fields:
            assert (
                field in response.json().keys()
            ), f"Поле {field}, отсутствует в ответе"

    @pytest.mark.django_db
    def test_tag_update(self, user_client, tag_1):
        url = self.url + str(tag_1.id) + "/"
        update_data = {"name": "green", "color": "#00ff00"}
        response = user_client.put(url, data=update_data)
        assert (
            response.status_code == 200
        ), "Запрос на обновление данных тэга работает некоректно"
        for field, value in update_data.items():
            assert (
                response.json().get(field) == value
            ), f"Данные не были обновлены. Поле {field}"

    @pytest.mark.django_db
    def test_tag_delete(self, user_client, tag_1):
        tag_count = Tag.objects.count()
        url = self.url + str(tag_1.id) + "/"
        response = user_client.delete(url)
        assert (
            response.status_code == 204
        ), "Удаление тэга работатет некорректно"
        assert Tag.objects.count() == tag_count - 1, "Тэг не был удален"

    @pytest.mark.django_db
    def test_tag__another_user_access(self, another_user_client, tag_1):
        tag_count = Tag.objects.count()
        url = self.url + str(tag_1.id) + "/"
        response = another_user_client.get(url)
        assert (
            response.status_code == 404
        ), "Пользователь не может получить данные о чужом тэге"
        update_data = {"name": "green", "color": "#00ff00"}
        response = another_user_client.put(url, data=update_data)
        assert (
            response.status_code == 404
        ), "Пользователь не может изменить чужой тэг"
        response = another_user_client.delete(url)
        assert (
            response.status_code == 404
        ), "Пользователь не может удалить чужой тэг"
        assert (
            tag_count == Tag.objects.count()
        ), "Пользователь не может удалить чужой тэг"
