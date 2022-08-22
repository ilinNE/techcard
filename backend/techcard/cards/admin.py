from django.contrib import admin

from .models import Product, Tag, TechCard


class AdminProduct(admin.ModelAdmin):
    list_display = ("name", "price")
    search_fields = ("name",)


class IngredientInline(admin.TabularInline):
    model = TechCard.ingredients.through
    list_display = ("product", "amount", "cold_waste", "hot_waste")
    autocomplete_fields = ("product",)


class AdminTechCard(admin.ModelAdmin):
    list_display = ("name", "owner")
    inlines = (IngredientInline,)


admin.site.register(TechCard, AdminTechCard)
admin.site.register(Product, AdminProduct)
admin.site.register(Tag)
