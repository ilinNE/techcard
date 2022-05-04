from django.contrib import admin
from django.urls import path, include

from cards.views import index

urlpatterns = [
    path('auth/', include('users.urls')),
    path('cards/', include('cards.urls')),
    path('admin/', admin.site.urls),
    path('auth/', include('django.contrib.auth.urls')),
    path('about/', include('about.urls')),
    path('', index, name='index')
]
