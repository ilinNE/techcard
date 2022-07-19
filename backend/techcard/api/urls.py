from django.urls import path

from .views import hello

app_name = "api"

urlpatterns = [
    path("hello/", hello, name="hello"),
]
