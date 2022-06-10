from django import forms
from django.conf import settings

from .models import Ingridient, Product, TechCard


WIDGET_CLASS = settings.WIDGET_CLASS

class ProductForm(forms.ModelForm):
    unit_weight = forms.DecimalField(
        initial=1.000, help_text="Вес одной еденицы измерения"
    )

    class Meta:
        model = Product
        fields = ["name", "unit", "unit_weight", "price"]
        help_texts = {
            "name": "Название продукта",
            "unit": "Еденица измерения",
            "unit_weight": "Вес одной еденицы измерения",
            "price": "Цена за одну еденицу измерения",
        }


class TechCardForm(forms.ModelForm):
    
    class Meta:
        model = TechCard
        fields = ["name", "description"]
        help_texts = {
            "name": "Введите название блюда",
            "description": "Технология приготовления",
        }

    def __init__(self, *args, **kwargs):
        super(TechCardForm, self).__init__(*args, **kwargs)
        self.fields['name'].widget.attrs.update({'class': f'{WIDGET_CLASS}'})
        self.fields['description'].widget.attrs.update({'class': f'{WIDGET_CLASS}'})


class IngridientForm(forms.ModelForm):
    ammount = forms.DecimalField(initial=0.000, min_value=0)
    cold_waste = forms.DecimalField(initial=0.000, min_value=0, max_value=100)
    hot_waste = forms.DecimalField(initial=0.000, min_value=0, max_value=100)

    ammount.widget.attrs.update({'class': f'{WIDGET_CLASS}'})
    cold_waste.widget.attrs.update({'class': f'{WIDGET_CLASS}'})
    hot_waste.widget.attrs.update({'class': f'{WIDGET_CLASS}'})

    class Meta:
        model = Ingridient
        fields = ["product", "ammount", "cold_waste", "hot_waste"]


    def __init__(self, *args, **kwargs):
        if "user" in kwargs and kwargs["user"] is not None:
            user = kwargs.pop("user")
            qs = Product.objects.filter(owner=user)
        super(IngridientForm, self).__init__(*args, **kwargs)
        self.fields['product'].widget.attrs.update({'class': f'{WIDGET_CLASS}'})
        try:
            self.fields["product"].queryset = qs
        except NameError:
            pass


IngridientFormSet = forms.inlineformset_factory(
    TechCard, Ingridient, form=IngridientForm, extra=1
)
