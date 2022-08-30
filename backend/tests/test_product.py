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

    @pytest.mark.django_db
    def test_product_get_list(self, user_client, product_1,
                              product_2, foreign_product):
        response = user_client.get(self.url)
        assert response.status_code == 200, (
            "Неверный код ответа при запросе списка продуктов"
        )
        assert len(response.json()) >= 2, (
            "Список продуктов не полный"
        )
        assert len(response.json()) <= 2, (
            "Список продуктов содержит лишние обьекты"
        )

    @pytest.mark.django_db
    def test_product_get_detail(self, user_client, product_1):
        url = self.url + str(product_1.id) + "/"
        response = user_client.get(url)
        assert response.status_code == 200, (
            "Неверный код ответа при запросе еденичного продукта"
        )
        expected_fields = [
            "id",
            "name",
            "unit",
            "unit_weight",
            "price",
            "tags"
        ]
        for field in expected_fields:
            assert field in response.json(), (
                f"Поле {field} отсутствует в ответе"
            )
        
    @pytest.mark.django_db
    def test_product_update(self, user_client, product_1):
        url = self.url + str(product_1.id) + '/'
        update_data = { "name": "updated_name", "price": '999.99'}
        response = user_client.put(url, data=update_data)    
        assert response.status_code == 200, (
            "Неверный код ответ при обновлении продукта"
        )
        for field, value in update_data.items():
            assert response.json().get(field) == value, (
                f"Поле {field} не было обновленно"
            )

    @pytest.mark.django_db
    def test_product_delete(self, user_client, product_1):
        product_count = Product.objects.count()
        url = self.url + str(product_1.id) + '/'
        response = user_client.delete(url)
        assert response.status_code == 204, (
            "Неверный код ответа при удалении продукта"
        )
        assert Product.objects.count() == product_count - 1, (
            "Продукт не был удален из базы данных"
        )

    @pytest.mark.django_db
    def test_another_user_access(self, another_user_client, product_1):
        product_count = Product.objects.count()
        url = self.url + str(product_1.id) + '/'
        response = another_user_client.get(url)
        assert response.status_code == 404, (
            "Пользователь не может получить данные о чужом продукте"
        )
        update_data = {"name": "updated_name", "price": '999.99'}
        response = another_user_client.put(url, data=update_data)
        assert response.status_code == 404, (
            "Пользователь не может изменить чужой продукт"
        )
        response = another_user_client.delete(url)
        assert response.status_code == 404, (
            "Пользователь не может удалить чужой продукт"
        )
        assert product_count == Product.objects.count(), (
            "Пользователь не может удалить чужой продукт"
        )


    

             


