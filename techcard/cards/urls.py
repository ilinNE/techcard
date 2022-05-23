from django.urls import path

from .views import (product_list, product_create, techcard_create,
                    techcard_list, techcard_detail, techcard_edit,
                    product_detail, product_edit, semifabricate_create,
                    semifabricate_edit, semifabricate_list,
                    semifabricate_detail)

app_name = 'cards'

urlpatterns = [
    path('product/', product_list, name='product_list'),
    path('product/create/', product_create, name='product_create'),
    path('product/<int:product_id>/', product_detail, name='product_detail'),
    path('product/<int:product_id>/edit/', product_edit, name='product_edit'),
    path('semifabricate/', semifabricate_list, name='semifabricate_list'),
    path('semifabricate/create/', semifabricate_create, name='semifabricate_create'),
    path('semifabricate/<int:id>/', semifabricate_detail, name='semifabricate_detail'),
    path('semifabricate/<int:id>/edit/', semifabricate_edit, name='semifabricate_edit'), 
    path('create/', techcard_create, name='techcard_create'),
    path('<int:id>/edit/', techcard_edit, name='techcard_edit'),
    path('<int:id>/', techcard_detail, name='techcard_detail'),
    path('', techcard_list, name='techcard_list')
]
