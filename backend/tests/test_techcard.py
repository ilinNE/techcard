import pytest

from cards.models import TechCard


class TestTechCard:
    url = "/api/techcards/"
    valid_data = {
        "weight": "0.000",
        "ingredients": [
            {
                "product": 2,
                "amount": "33.000",
                "cold_waste": "66.000",
                "hot_waste": "99.000",
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

    @pytest.mark.django_db()
    def test_techcard_create_valid_data(self, user_client, product_1):
        techcard_count = TechCard.objects.count()
        data = self.valid_data.copy()
        data['ingredients'][0]['product'] = product_1.id
        response = user_client.post(
            self.url, data=self.valid_data, format="json"
        )
        print(response.json()) 
        assert (
            response.status_code == 201
        ), "Ошибка при создании техкарты с валидными данными"
        assert (
            TechCard.objects.count() == techcard_count + 1
        ), "Новый обьект техкарты не добавлен в базу данных"

    @pytest.mark.django_db()
    def test_techcard_get(self, user_client, techcard):
        url = self.url + str(techcard.id) + "/"
        response = user_client.get(url)
        assert (
            response.status_code == 200
        ), "Ошибка при запросе на получение техкарты"
        expected_fields = [
            "id",
            "ingredients",
            "name",
            "create_date",
            "modified_date",
            "description",
            "is_semifabricate",
            "weight",
            "semifabricate",
            "tags",
        ]
        for field in expected_fields:
            assert field in response.json().keys(),(
                f"Поле {field} отсутствует в ответе"
            )
        
    @pytest.mark.django_db
    def test_techcard_update(self, user_client, techcard, product_1):
        url = self.url + str(techcard.id) + '/'
        data = self.valid_data.copy()
        data['ingredients'][0]['product'] = product_1.id
        response = user_client.put(url, self.valid_data, format='json')
        print(response.json())
        assert response.status_code == 200, (
            "Ошибка при обновлении техарты. Неверный код ответа."
        )
        techcard_fields = ["name", "description", "tags"]
        product_fields = ["product", "amount", "cold_waste", "hot_waste"]  
        for field in techcard_fields:
            assert response.json().get(field) == data.get(field), (
                f"Значение поля {field} не было изменено"
            )
        for field in product_fields:
            assert response.json()['ingredients'][0].get(field) == data['ingredients'][0].get(field), (
                f"Значение поля {field} не было изменено"
            )

    @pytest.mark.django_db
    def test_techcard_delete(self, user_client, techcard):
        url = self.url + str(techcard.id) + '/' 
        techcard_count = TechCard.objects.count()
        response = user_client.delete(url)
        assert response.status_code == 204, (
            "Ошибка при удалении техкарты. Неверный код ответа"
        )
        assert TechCard.objects.count() == techcard_count - 1, (
            "Техкарты не была удалена из базы данных"
        )