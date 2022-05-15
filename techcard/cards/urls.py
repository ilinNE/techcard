from django.urls import path

from .views import (product_list, product_create, techcard_create,
                    techcard_list, techcard_detail, techcard_edit,
                    product_detail, product_edit)

app_name = 'cards'

urlpatterns = [
    path('product/', product_list, name='product_list'),
    path('product/create/', product_create, name='product_create'),
    path('product/<int:product_id>/', product_detail, name='product_detail'),
    path('product/<int:product_id>/edit/', product_edit, name='product_edit'),
    path('create/', techcard_create, name='techcard_create'),
    path('<int:techcard_id>/edit/', techcard_edit, name='techcard_edit'),
    path('<int:id>/', techcard_detail, name='techcard_detail'),
    path('', techcard_list, name='techcard_list')
]
