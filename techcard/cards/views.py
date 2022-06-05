import io

from django.http import HttpRequest, HttpResponse
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, render, get_object_or_404
from django.urls import reverse


from .forms import ProductForm, TechCardForm, IngridientFormSet
from .models import Product, TechCard
from .utils import calculate_price, make_xlsx


def index(request):
    return render(request, 'users/index.html')


@login_required
def product_create(request):
    form = ProductForm(request.POST or None)
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
    techcards = user.techcards.filter(is_semifabricate=False)
    context = {'techcards': techcards}
    return render(request, 'cards/techcard_list.html', context)


@login_required
def product_list(request):
    user = request.user
    products = user.products.filter(is_semifabricate=False)
    context = {'products': products}
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
def techcard_create(request: HttpRequest):
    user = request.user
    ingridient_formset = IngridientFormSet(
        request.POST or None,
        form_kwargs={'user': user},
    )
    techcard_form = TechCardForm(
        request.POST or None,
    )
    if techcard_form.is_valid() and ingridient_formset.is_valid():
        new_techcard = techcard_form.save(commit=False)
        new_techcard.owner = user
        new_techcard.save()
        ingridient_formset.instance = new_techcard
        ingridient_formset.save()
        return redirect(reverse('cards:techcard_list'))
    context = {
        'techcard_form': techcard_form,
        'ingridient_formset': ingridient_formset
        }      
    return render(request, 'cards/techcard_create_edit.html', context )


@login_required
def techcard_edit(request, id):
    techcard = get_object_or_404(TechCard, id=id)
    user = request.user
    if user != techcard.owner:
        return redirect(reverse('index'))
    techcard_form = TechCardForm(
        request.POST or None,
        instance=techcard
    )
    ingridient_formset = IngridientFormSet(
        request.POST or None,
        form_kwargs={'user': user},
        instance=techcard,
    )
    context = {
        'techcard_form': techcard_form,
        'ingridient_formset': ingridient_formset,
        'is_edit': True,
        'techcard_id': id
        }
    if techcard_form.is_valid() and ingridient_formset.is_valid():
        techcard_form.save()
        ingridient_formset.save()
        return redirect(reverse('cards:techcard_list'))
    return render(request, 'cards/techcard_create_edit.html', context )


@login_required
def semifabricate_list(request):
    user = request.user
    semifabricates = user.products.filter(is_semifabricate=True)
    context = {'semifabricates': semifabricates}
    return render(request, 'cards/semifabricate_list.html', context)


@login_required
def semifabricate_detail(request, id):
    user = request.user
    semifabricate = get_object_or_404(Product, id=id)
    if semifabricate.owner != user:
        redirect(reverse('index'))
    context = {
        'semifabricate': semifabricate,
        'ingridients': semifabricate.techcard.ingridients.all()
    }
    return render(request, 'cards/semifabricate_detail.html', context)


@login_required
def semifabricate_create(request):
    user = request.user
    ingridient_formset = IngridientFormSet(
        request.POST or None,
        form_kwargs={'user': user},
    )
    techcard_form = TechCardForm(
        request.POST or None,
    )
    if techcard_form.is_valid() and ingridient_formset.is_valid():
        new_techcard: TechCard = techcard_form.save(commit=False)
        new_techcard.is_semifabricate = True
        new_techcard.owner = user
        new_techcard.semifabricate = Product.objects.create(
            name=new_techcard.name + ' п/ф',
            owner=user,
            price=0,
            is_semifabricate=True,
        )
        new_techcard.save()
        ingridient_formset.instance = new_techcard
        ingridient_formset.save()
        return redirect(reverse('cards:semifabricate_list'))
    context = {
        'techcard_form': techcard_form,
        'ingridient_formset': ingridient_formset
        }      
    return render(request, 'cards/semifabricate_create_edit.html', context )



@login_required
def semifabricate_edit(request, id):
    semifabricate = get_object_or_404(Product, id=id)
    techcard = semifabricate.techcard
    user = request.user
    techcard_form = TechCardForm(
        request.POST or None,
        instance=techcard
    )
    ingridient_formset = IngridientFormSet(
        request.POST or None,
        form_kwargs={'user': user},
        instance=techcard
    )
    context = {
        'techcard_form': techcard_form,
        'ingridient_formset': ingridient_formset,
        'is_edit': True,
        'techcard_id': techcard.id,
        'semifabricate_id': id
        }
    if techcard_form.is_valid() and ingridient_formset.is_valid():
        techcard_form.save()
        ingridient_formset.save()
        semifabricate.save()
        return redirect(reverse('cards:semifabricate_list'))
    return render(request, 'cards/semifabricate_create_edit.html', context )


def download_file(request):
    output = io.BytesIO()
    wb = make_xlsx()
    wb.save(output)
    output.seek(0)
    response = HttpResponse(output.read(), content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    response['Content-Disposition'] = "attachment; filename=test.xlsx"
    output.close()
    return response

    

