from decimal import Decimal
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, render
from django.forms import formset_factory

from .forms import ProductForm, TechCardForm, IngridientForm
from .models import Product, TechCard, Ingridient


def index(request):
    return HttpResponse('Главная')


def product_list(request):
    products = Product.objects.all()
    context = {'products': products}
    return render(request, 'cards/products_list.html', context)


@login_required
def product_create(request):
    form = ProductForm(
        request.POST or None,
        files=request.FILES or None,
    )
    user = request.user
    if form.is_valid():
        new_product = form.save(commit=False)
        new_product.owner = user
        new_product.save()
        return redirect('cards:product_list')
    return render(request, 'cards/product_create.html', {'form': form})


@login_required
def techcard_create(request):
    user = request.user
    IngridientFormSet = formset_factory(IngridientForm, extra=2)
    ingridient_formset = IngridientFormSet(
        request.POST or None,
        files=request.FILES or None,
        form_kwargs={'user': user},
        prefix='ingridients',
    )
    techcard_form = TechCardForm(
        request.POST or None,
        files=request.FILES or None,
    )
    if ingridient_formset.is_valid() and techcard_form.is_valid():
        new_techcard = techcard_form.save(commit=False)
        new_techcard.owner = user
        new_techcard.weight = 0
        new_techcard.price = 0
        new_techcard.save()
        for ingridient_form in ingridient_formset:
            product = ingridient_form.cleaned_data['product']
            weigth = ingridient_form.cleaned_data['ammount']
            price = Decimal(weigth) * product.price
            new_ingridient = ingridient_form.save(commit=False)
            new_ingridient.price = price
            new_ingridient.techcard = new_techcard
            new_ingridient.save()
            new_techcard.price += price
            new_techcard.weight += weigth
        new_techcard.save()
        return HttpResponse('OK')
    return render(request, 'cards/techcard_create.html', {
        'techcard_form': techcard_form,
        'ingridient_formset': ingridient_formset
        })
