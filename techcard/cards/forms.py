from itertools import product
from django import forms

from .models import Ingridient, Product, TechCard


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
        WIDGET_CLASS = 'form-control'
        self.fields['name'].widget.attrs.update({'class': f'{WIDGET_CLASS}'})
        self.fields['description'].widget.attrs.update({'class': f'{WIDGET_CLASS}'})


class IngridientForm(forms.ModelForm):

    class Meta:
        model = Ingridient
        fields = ["product", "ammount", "cold_waste", "hot_waste"]
        help_texts = {
            "product": "Введите название продукта",
            "ammount": "Введите количество",
            "cold_waste": "Введите коэффициент холодной обработки",
            "hot_waste": "Введите коэффициент горячей обработки",
        }

    def __init__(self, *args, **kwargs):
        if "user" in kwargs and kwargs["user"] is not None:
            user = kwargs.pop("user")
            qs = Product.objects.filter(owner=user)
        super(IngridientForm, self).__init__(*args, **kwargs)
        WIDGET_CLASS = 'form-control'
        self.fields['product'].widget.attrs.update({'class': f'{WIDGET_CLASS}'})
        self.fields['ammount'].widget.attrs.update({'class': f'{WIDGET_CLASS}'})
        self.fields['cold_waste'].widget.attrs.update({'class': f'{WIDGET_CLASS}'})
        self.fields['hot_waste'].widget.attrs.update({'class': f'{WIDGET_CLASS}'})
        try:
            self.fields["product"].queryset = qs
        except NameError:
            pass


IngridientFormSet = forms.inlineformset_factory(
    TechCard, Ingridient, form=IngridientForm, extra=1
)
