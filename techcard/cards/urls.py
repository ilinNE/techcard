from django.urls import path

from .views import product_list, product_create, techcard_create

app_name = 'cards'

urlpatterns = [
    path('product/', product_list, name='product_list'),
    path('product/create/', product_create, name='product_create'),
    path('create/', techcard_create, name='techcard_create')
]
