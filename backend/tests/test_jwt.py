import pytest
from django.contrib.auth import get_user_model

User = get_user_model()


class TestJWT:
    create_url = "/api/auth/jwt/create/"
    refresh_url = "/api/auth/jwt/refresh/"

    def test_jwt_create__invalid_data_request(self, client, user):
        url = self.create_url
        response = client.post(url)
        assert (
            response.status_code == 400
        ), "При запросе без парметров должен код ответа должен быть 400"
        invalid_data = {
            "username": "username_not_existed",
            "password": "invalid_pwd",
        }
        response = client.post(url, data=invalid_data)
        assert response.status_code == 401, (
            "При запросе с данными несуществующего пользователя",
            "код ответа должен быть 401",
        )
        assert "detail" in response.json(), (
            "При запросе с данными несуществующего пользователя",
            "в ответе должно быть сообщение об ошибке",
        )
        valid_username = user.username
        invalid_data["username"] = valid_username
        response = client.post(url, data=invalid_data)
        assert (
            response.status_code == 401
        ), "При запросе с нверным паролем код ответа должен быть 401"
        assert "detail" in response.json(), (
            "При запросе с неверным паролем",
            "в ответе должно быть сообщение об ошибке",
        )

    def test_jwt_create__valid_data_request(self, client, user):
        url = self.create_url
        valid_data = {"username": user.username, "password": "1234567"}
        response = client.post(url, data=valid_data)
        assert response.status_code == 200, (
            f"При запросе на {url}, с валидными данными",
            f"код ответа дожен быть 200",
        )
        fields_in_response = ["access", "refresh"]
        for field in fields_in_response:
            assert field in response.json().keys(), (
                f"При запросе на {url} с валидными данными",
                f"поле {field} должно быть в ответе",
            )

    def test_jwt_refresh__invalid_data_request(self, client):
        url = self.refresh_url
        response = client.post(url)
        assert response.status_code == 400, (
            f"При запросе на {url} без данных",
            f"код ответа должен быть 400",
        )
        invalid_data = {"refresh": "invalid_token"}
        response = client.post(url, data=invalid_data)
        assert response.status_code == 401, (
            f"При запросе на {url} с неверным токеном",
            f"код ответа должен быть 401",
        )

    def test_jwt__valid_data_request(self, client, user):
        valid_data = {"username": user.username, "password": "1234567"}
        response = client.post(self.create_url, data=valid_data)
        refresh_token = response.json().get("refresh")
        refresh_data = {"refresh": refresh_token}
        response = client.post(self.refresh_url, data=refresh_data)
        assert response.status_code == 200, (
            f"При запросе на {self.refresh_url}, с валидными данными",
            f"код ответа должен быть 200",
        )
        fields_in_response = ["access", "refresh"]
        for field in fields_in_response:
            assert field in response.json().keys(), (
                f"При запросе на {self.refresh_url} с валидными данными",
                f"поле {field} должно быть в ответе",
            )
