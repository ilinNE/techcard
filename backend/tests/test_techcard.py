import pytest

from cards.models import TechCard


class TestTechCard:
    url = "/api/techcards/"
    valid_data = {
            "weight": 0,
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
            "tags": [],
        }

    @pytest.mark.django_db
    def test_techcard_endpoint_avliable(self, user_client):
        response = user_client.get(self.url)
        assert response.status_code != 404, f"Эндпоинт {self.url} недоступен"

    @pytest.mark.django_db
    def test_techcart_create_unauthorized(self, client):
        response = client.post(self.url, data=self.valid_data)
        assert (
            response.status_code == 401
        ), "Анонимный пользователь не может создать техкарту"

    @pytest.mark.django_db
    def test_techcard_create_invalid_data(self, user_client, product_1, tag_1):
        response = user_client.post(self.url)
        assert (
            response.status_code == 400
        ), "Запрос на создание техкарты без данных должен возвращать код 400"
        expected_fields = ["name", "ingredients"]
        for field in expected_fields:
            assert field in response.json(), (
                f"В ответе должны быть указанны обязательные поля",
                f"Поле {field} не указанно",
            )

    @pytest.mark.django_db(transaction=True)
    def test_techcard_create_valid_data(self, user_client, product_1):
        techcard_count = TechCard.objects.count()
        response = user_client.post(self.url, data=self.valid_data)
        print(self.valid_data)
        print(response.json())
        assert (
            response.status_code == 201
        ), "Ошибка при создании техкарты с валидными данными"
        assert (
            TechCard.objects.count() == techcard_count + 1
        ), "Новый обьект техкарты не добавлен в базу данных"
