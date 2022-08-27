import pytest
from cards.models import Tag


class TestTag:
    url = "/api/tags/"
    valid_data = {
            "name": "yellow",
            "color": "#ffaa00"
    }

    @pytest.mark.django_db()
    def test_create__invalid_data(self, user_client):
        tag_count = Tag.objects.count()
        response = user_client.post(self.url)
        assert response.status_code == 400, (
            f"При отправке запроса без тела на {self.url}",
            "код ответа должен быть  400"
        )
        assert Tag.objects.count() == tag_count, (
            "Тэг не должен быть создан, при пустом запросе"
        )
        empty_data = {
            "name": "",
            "color": ""
        }
        response = user_client.post(self.url, data=empty_data)
        assert response.status_code == 400, (
            f"При отправке запроса с пустыми значениями на {self.url}",
            "код ответа должен быть  400"
        )
        assert Tag.objects.count() == tag_count, (
            "Тэг не должен быть создан, при запросе с пустыми знеачениями"
        )

    @pytest.mark.django_db()
    def test_create__unauthorized(self, client):
        tag_count = Tag.objects.count()
        response = client.post(self.url, data=self.valid_data)
        assert response.status_code == 401, (
            "Неавторизованный пользователь не может создать тэг"
        )
        assert Tag.objects.count() == tag_count, (
            "Неавторизованный пользователь не может создать тэг"
        )

    @pytest.mark.django_db()
    def test_create__valid_data(self, user_client):
        tag_count = Tag.objects.count()
        response = user_client.post(self.url, data=self.valid_data)
        assert response.status_code == 201, (
            "При успешном создании тега должен возвращаться код 201"
        )
        assert Tag.objects.count() == tag_count + 1, (
            "При валидном запросе, тэг должен быть добавлен в БД"
        )

    
