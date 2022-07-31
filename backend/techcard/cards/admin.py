from django.contrib import admin

from .models import Ingridient, Product, TechCard, Tag

admin.site.register(TechCard)
admin.site.register(Product)
admin.site.register(Ingridient)
admin.site.register(Tag)
