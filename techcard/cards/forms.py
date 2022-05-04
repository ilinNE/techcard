from django import forms

from .models import Product, TechCard, Ingridient

    
class ProductForm(forms.ModelForm):

    class Meta:
        model = Product
        fields = ['name', 'unit', 'price']
        help_texts = {
            'name': 'Название продукта',
            'unit': 'Еденица измерения',
            'price': 'Цена за одну еденицу измерения'
        }


class TechCardForm(forms.ModelForm):

    class Meta:
        model = TechCard
        fields = ['name']
        help_texts = {
            'name': 'Введите название блюда',
        }


class IngridientForm(forms.ModelForm):

    class Meta:
        model = Ingridient
        fields = ['product', 'ammount', 'cold_waste', 'hot_waste']
        help_texts = {
            'product': 'Введите название продукта',
            'ammount': 'Введите количество',
            'cold_waste': 'Введите коэффициент холодной обработки',
            'hot_waste': 'Введите коэффициент горячей обработки'
        }

    def __init__(self, *args, **kwargs):
        print(kwargs)
        if 'user' in kwargs and kwargs['user'] is not None:
            user = kwargs.pop('user')
            qs = Product.objects.filter(owner=user)
        super(IngridientForm, self).__init__(*args, **kwargs)
        try:
            self.fields['product'].queryset = qs
        except NameError:
            pass


IngridientFormSet = forms.modelformset_factory(
    Ingridient,
    form=IngridientForm,
    extra=1,
    can_delete=True
)