from django import forms
from django.contrib.auth import get_user_model

from .models import Ingridient, Product, TechCard
from .services import calculate_for_product

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

    def clean(self):
        cleaned_data = super().clean()
        if cleaned_data["unit"] == Product.Unit.KG:
            cleaned_data["unit_weight"] = 1
        return cleaned_data


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


class BaseProductFormSet(forms.BaseInlineFormSet):
    def save_existing_objects(self, commit: bool = ...):
        saved_instances = super().save_existing_objects(commit)
        for product in self.changed_objects:
            calculate_for_product(product[0])
        return saved_instances


IngridientFormSet = forms.inlineformset_factory(
    TechCard, Ingridient, form=IngridientForm, extra=1
)


ProductFormSet = forms.inlineformset_factory(
    User, Product, form=ProductForm, extra=1, formset=BaseProductFormSet
)
