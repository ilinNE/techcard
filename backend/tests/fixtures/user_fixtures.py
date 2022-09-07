import pytest


@pytest.fixture
def user(django_user_model):
    return django_user_model.objects.create_user(
        username="TestUser", password="1234567"
    )


@pytest.fixture
def user_token(user):
    from rest_framework_simplejwt.tokens import RefreshToken

    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


@pytest.fixture
def user_client(user_token):
    from rest_framework.test import APIClient

    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {user_token["access"]}')
    return client


@pytest.fixture
def another_user(django_user_model):
    return django_user_model.objects.create_user(
        username="AnotherUser", password="1234567"
    )


@pytest.fixture
def another_user_token(another_user):
    from rest_framework_simplejwt.tokens import RefreshToken

    refresh = RefreshToken.for_user(another_user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


@pytest.fixture
def another_user_client(another_user_token):
    from rest_framework.test import APIClient

    client = APIClient()
    client.credentials(
        HTTP_AUTHORIZATION=f'Bearer {another_user_token["access"]}'
    )
    return client
