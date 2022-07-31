from django.urls import path

from . import views

app_name = "about"

urlpatterns = [
    path("author/", views.AboutAuthorView.as_view(), name="author"),
    path("how_it_work/", views.HowItWorkView.as_view(), name="how_it_work"),
    path("send_message/", views.send_message, name="send_message"),
]
