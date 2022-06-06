from django.urls import path

from .views import (
    download_file,
    product_create,
    product_detail,
    product_edit,
    product_list,
    semifabricate_create,
    semifabricate_detail,
    semifabricate_edit,
    semifabricate_list,
    techcard_create,
    techcard_detail,
    techcard_edit,
    techcard_list,
)

app_name = "cards"

urlpatterns = [
    path("product/", product_list, name="product_list"),
    path("product/create/", product_create, name="product_create"),
    path("product/<int:product_id>/", product_detail, name="product_detail"),
    path("product/<int:product_id>/edit/", product_edit, name="product_edit"),
    path("semifabricate/", semifabricate_list, name="semifabricate_list"),
    path(
        "semifabricate/create/",
        semifabricate_create,
        name="semifabricate_create",
    ),
    path(
        "semifabricate/<int:id>/",
        semifabricate_detail,
        name="semifabricate_detail",
    ),
    path(
        "semifabricate/<int:id>/edit/",
        semifabricate_edit,
        name="semifabricate_edit",
    ),
    path("create/", techcard_create, name="techcard_create"),
    path("<int:id>/edit/", techcard_edit, name="techcard_edit"),
    path("<int:id>/", techcard_detail, name="techcard_detail"),
    path("", techcard_list, name="techcard_list"),
    path("download/", download_file),
]
