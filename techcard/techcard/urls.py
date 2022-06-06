from django.contrib import admin
from django.urls import path, include
from django.conf import settings

from cards.views import index

urlpatterns = [
    path('auth/', include('users.urls')),
    path('cards/', include('cards.urls')),
    path('admin/', admin.site.urls),
    path('auth/', include('django.contrib.auth.urls')),
    path('about/', include('about.urls')),
    path('', index, name='index')
]
if settings.DEBUG:
    import debug_toolbar

    urlpatterns += (path('__debug__/', include(debug_toolbar.urls)),) 
