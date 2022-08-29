import pytest

from cards.models import Product

class TestProduct:
    url = "/api/products/"

    @pytest.mark.django_db
    def test_product_create__unauthorized(self, client):
        product_count = Product.objects.count()
        valid_data = {
            "name": "test_product",
            "price": 102
        }
        response = client.post(self.url, data=valid_data)
        assert response.status_code == 401, (
            "Неправильный ответ при попытке создания продукта",
            "неавторизованным пользователем" 
        )
        assert Product.objects.count() == product_count, (
            "Неавторизованный пользователь не должен иметь возможность",
            "создавать продукты"
        )
        
    @pytest.mark.django_db
    def test_product_create__valid_data(self, user_client):
        product_count = Product.objects.count()
        partial_data = {
            "name": "test_product",
            "price": 102
        }
        response = user_client.post(self.url, data=partial_data)
        assert response.status_code == 201, (
            "Неправильный ответ при создании продукта" 
        )
        assert Product.objects.count() == product_count + 1, (
            "Новый продукт не добавлен в базу данных"
        )
        full_data = {
            "name": "test_product",
            "price": 102,
            "unit": "Шт",
            "unit_weight": 0.05 
        }
        response = user_client.post(self.url, data=full_data)
        assert response.status_code == 201, (
            "Неправильный ответ при создании продукта" 
        )
        assert Product.objects.count() == product_count + 2, (
            "Новый продукт не добавлен в базу данных"
        )
    
    @pytest.mark.django_db
    def test_product_create__invalid_data(self, user_client):
        product_count = Product.objects.count()
        response = user_client.post(self.url)
        assert response.status_code == 400, (
            "Запрос на создание продукта без данных",
            "не должен обрабатываться"
        )
        assert Product.objects.count() == product_count, (
            "При запросе без данных, продукт не может быть создан"
        )
        expected_fields = ["name", "price"]
        for field in expected_fields:
            assert field in response.json(), (
                "В ответе должны быть указаны недостающие обязательные поля",
                f"Указание на поле {field}, не найдено в ответе "
            )
        invalid_data = {
            "name": "test_product",
            "price": -12
        }
        response = user_client.post(self.url, data=invalid_data)
        assert response.status_code == 400, (
            "Неправильный ответ на запрос с некорректными данными"
        )
        assert "price" in response.json(), (
            "В ответе нет указания на поле с некорректными данными"
        )
        assert Product.objects.count() == product_count, (
            "При запросе с некорректными, продукт не может быть создан"
        )

