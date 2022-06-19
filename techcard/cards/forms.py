from sys import prefix
from django import forms
from django.conf import settings
from django.contrib.auth import get_user_model

from .models import Ingridient, Product, TechCard


User = get_user_model()


class ProductForm(forms.ModelForm):
    name = forms.CharField(
        max_length=50,
        help_text="Название продукта",
    )
    unit = forms.ChoiceField(
        choices=Product.Unit.choices,
        help_text="Еденица измерения",
        initial=Product.Unit.KG,
    )
    unit_weight = forms.DecimalField(
        min_value=0, initial=1.000, help_text="Вес одной еденицы измерения"
    )
    price = forms.DecimalField(min_value=0, help_text="Стоимость")


    class Meta:
        model = Product
        fields = ["name", "unit", "unit_weight", "price"]


class TechCardForm(forms.ModelForm):
    class Meta:
        model = TechCard
        fields = ["name", "description"]
        help_texts = {
            "name": "Введите название блюда",
            "description": "Технология приготовления",
        }


class IngridientForm(forms.ModelForm):
    product = forms.ModelChoiceField(queryset=Product.objects.all())
    ammount = forms.DecimalField(initial=0.000, min_value=0)
    cold_waste = forms.DecimalField(initial=0.000, min_value=0, max_value=100)
    hot_waste = forms.DecimalField(initial=0.000, min_value=0, max_value=100)

    class Meta:
        model = Ingridient
        fields = ["product", "ammount", "cold_waste", "hot_waste"]

    def __init__(self, *args, **kwargs):
        if "user" in kwargs and kwargs["user"] is not None:
            user = kwargs.pop("user")
        super(IngridientForm, self).__init__(*args, **kwargs)
        try:
            self.fields["product"].queryset = self.fields[
                "product"
            ].queryset.filter(owner=user)
        except NameError:
            pass


IngridientFormSet = forms.inlineformset_factory(
    TechCard, Ingridient, form=IngridientForm, extra=1
)

ProductFormSet = forms.inlineformset_factory(
    User, Product, form=ProductForm, extra=1,
)
