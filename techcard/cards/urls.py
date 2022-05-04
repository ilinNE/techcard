from django.urls import path

from .views import (product_list, product_create, techcard_create,
                    techcard_list, techcard_detail, techcard_edit)

app_name = 'cards'

urlpatterns = [
    path('product/', product_list, name='product_list'),
    path('product/create/', product_create, name='product_create'),
    path('create/', techcard_create, name='techcard_create'),
    path('<int:techcard_id>/edit/', techcard_edit, name='techcard_edit'),
    path('<int:id>/', techcard_detail, name='techcard_list'),
    path('', techcard_list, name='techcard_list')
]
