from django.urls import path

from .views import (download_xlsx, product_create, product_delete,
                    product_edit, product_list, semifabricate_create,
                    semifabricate_delete, semifabricate_detail,
                    semifabricate_edit, semifabricate_list, techcard_create,
                    techcard_delete, techcard_detail, techcard_edit,
                    techcard_list)

app_name = "cards"

urlpatterns = [
    path("product/", product_list, name="product_list"),
    path("product/create/", product_create, name="product_create"),
    path("product/edit/", product_edit, name="product_edit"),
    path("product/<int:id>/delete/", product_delete, name="product_delete"),
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
    path(
        "semifabricate/<int:id>/delete/",
        semifabricate_delete,
        name="semifabricate_delete",
    ),
    path("techcard/create/", techcard_create, name="techcard_create"),
    path("techcard/<int:id>/edit/", techcard_edit, name="techcard_edit"),
    path("techcard/<int:id>/", techcard_detail, name="techcard_detail"),
    path("techcard/<int:id>/delete/", techcard_delete, name="techcard_delete"),
    path("techcard/", techcard_list, name="techcard_list"),
    path("download/<int:id>/", download_xlsx, name="download_xlsx"),
]
