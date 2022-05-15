from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, render, get_object_or_404
from django.urls import reverse

from .forms import ProductForm, TechCardForm, IngridientForm, IngridientFormSet
from .models import Product, TechCard, Ingridient
from .utils import create_techcard, edit_techcard


def index(request):
    return render(request, 'users/index.html')


def product_list(request):
    products = Product.objects.filter(is_semifabricate=False)
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
    return render(request, 'cards/product_create_edit.html', {'form': form})


@login_required
def techcard_list(request):
    user = request.user
    techcards = TechCard.objects.filter(owner=user)
    context = {
        'techcards': techcards
    }
    return render(request, 'cards/techcard_list.html', context)


@login_required
def product_list(request):
    user = request.user
    products = Product.objects.filter(owner=user)
    context = {
        'products': products
    }
    return render(request, 'cards/product_list.html', context)


@login_required
def product_detail(request, product_id):
    user = request.user
    product = get_object_or_404(Product, id=product_id)
    if product.owner != user:
        redirect(reverse('index'))
    context = {
        'product': product,
    }
    return render(request, 'cards/product_detail.html', context)


@login_required
def product_edit(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    form = ProductForm(
        request.POST or None,
        files=request.FILES or None,
        instance=product
    )
    if form.is_valid():
        form.save()
        return redirect('cards:product_list')
    context = {
        'form': form,
        'is_edit': True,
        'product_id': product_id
    }    
    return render(request, 'cards/product_create_edit.html', context)



@login_required
def techcard_detail(request, id):
    user = request.user
    product = get_object_or_404(TechCard, id=id)
    if product.owner != user:
        redirect(reverse('index'))
    ingridients = product.ingridients.all()
    context = {
        'product': product,
        'ingridients': ingridients,
        'techcard_id': id
    }
    return render(request, 'cards/techcard_detail.html', context)

@login_required
def techcard_create(request):
    user = request.user
    ingridient_formset = IngridientFormSet(
        request.POST or None,
        files=request.FILES or None,
        form_kwargs={'user': user},
        queryset=Ingridient.objects.none()
    )
    techcard_form = TechCardForm(
        request.POST or None,
        files=request.FILES or None,
    )
    if techcard_form.is_valid() and ingridient_formset.is_valid():
        create_techcard(user, techcard_form, ingridient_formset, False)
        return HttpResponse('OK')
    context = {
        'techcard_form': techcard_form,
        'ingridient_formset': ingridient_formset
        }      
    return render(request, 'cards/techcard_create_edit.html', context )


@login_required
def techcard_edit(request, techcard_id):
    product = get_object_or_404(TechCard, id=techcard_id)
    user = request.user
    techcard_form = TechCardForm(
        request.POST or None,
        files=request.FILES or None,
        instance=product
    )
    ingridients = product.ingridients.filter(product=product)
    ingridient_formset = IngridientFormSet(
        request.POST or None,
        files=request.FILES or None,
        form_kwargs={'user': user},
        queryset=ingridients
    )
    context = {
        'techcard_form': techcard_form,
        'ingridient_formset': ingridient_formset,
        'is_edit': True,
        'techcard_id': techcard_id
        }
    if techcard_form.is_valid() and ingridient_formset.is_valid():
        edit_techcard(techcard_id, techcard_form, ingridient_formset, False)
        return HttpResponse('OK')
    elif techcard_form.is_valid():
        return HttpResponse(f'{ingridient_formset.errors}')
    return render(request, 'cards/techcard_create_edit.html', context )
    

