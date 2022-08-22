from django_filters.rest_framework import FilterSet, filters

from cards.models import Product, Tag


class ProductFilterSet(FilterSet):
    tags = filters.ModelMultipleChoiceFilter(
        field_name="tags", label="tags", queryset=Tag.objects.all()
    )

    class Meta:
        model = Product
        fields = ("tags", "is_semifabricate")
