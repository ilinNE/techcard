import io

from django.contrib.auth.decorators import login_required
from django.http import HttpRequest, HttpResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.db.models import F, Sum, DecimalField
from xlsxwriter import Workbook

from .forms import IngridientFormSet, TechCardForm, ProductFormSet
from .models import Ingridient, Product, TechCard
from .services import make_xlsx, techcard_to_dict, calculate_semifabricate


def index(request):
    return render(request, "users/index.html")


@login_required
def product_list(request):
    user = request.user
    products = user.products.filter(is_semifabricate=False)
    context = {"products": products}
    return render(request, "cards/product_list.html", context)


@login_required
def product_detail(request, product_id):
    user = request.user
    product = get_object_or_404(Product, id=product_id)
    if product.owner != user:
        redirect(reverse("index"))
    context = {
        "product": product,
    }
    return render(request, "cards/product_detail.html", context)


@login_required
def product_create(request):
    user = request.user
    product_formset = ProductFormSet(
        request.POST or None, prefix="ingridients"
    )
    if product_formset.is_valid():
        product_formset.instance = user
        product_formset.save()
        return redirect("cards:product_list")
    context = {"product_formset": product_formset}
    return render(request, "cards/product_create_edit.html", context)


@login_required
def product_edit(request):
    user = request.user
    product_formset = ProductFormSet(
        request.POST or None, instance=user, prefix="ingridients"
    )
    if product_formset.is_valid():
        product_formset.save()
        return redirect("cards:product_list")
    context = {"is_edit": True, "product_formset": product_formset}
    return render(request, "cards/product_create_edit.html", context)


@login_required()
def product_delete(request, id):
    user = request.user
    product = get_object_or_404(Product, id=id)
    if product.owner != user:
        redirect(reverse("cards:product_list"))
    if Ingridient.objects.filter(product=product):
        context = {
            'product': product,
            'techcards': TechCard.objects.filter(ingridients__product=product),
        }
        return render(request, "cards/delete_forbidden.html", context)
    product.delete()
    return redirect(reverse("cards:product_list"))


@login_required
def techcard_list(request):
    user = request.user
    techcards = user.techcards.filter(is_semifabricate=False).annotate(
        price=Sum(
            F("ingridients__ammount") * F("ingridients__product__price")
        ),
        weight=Sum(
            F("ingridients__ammount")
            * F("ingridients__product__unit_weight")
            * (1 - F("ingridients__cold_waste") / 100)
            * (1 - F("ingridients__hot_waste") / 100),
            output_field=DecimalField(),
        ),
    )
    context = {"techcards": techcards}
    return render(request, "cards/techcard_list.html", context)


@login_required
def techcard_detail(request, id):
    user = request.user
    product = get_object_or_404(TechCard, id=id)
    if product.owner != user:
        redirect(reverse("index"))
    context = techcard_to_dict(id)
    return render(request, "cards/techcard_detail.html", context)


@login_required
def techcard_create(request: HttpRequest):
    user = request.user
    ingridient_formset = IngridientFormSet(
        request.POST or None,
        form_kwargs={"user": user},
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
        return redirect(reverse("cards:techcard_list"))
    context = {
        "techcard_form": techcard_form,
        "ingridient_formset": ingridient_formset,
    }

    return render(request, "cards/techcard_create_edit.html", context)


@login_required
def techcard_edit(request, id):
    techcard = get_object_or_404(TechCard, id=id)
    user = request.user
    if user != techcard.owner:
        return redirect(reverse("index"))
    techcard_form = TechCardForm(request.POST or None, instance=techcard)
    ingridient_formset = IngridientFormSet(
        request.POST or None,
        form_kwargs={"user": user},
        instance=techcard,
    )
    context = {
        "techcard_form": techcard_form,
        "ingridient_formset": ingridient_formset,
        "is_edit": True,
        "techcard_id": id,
    }
    if techcard_form.is_valid() and ingridient_formset.is_valid():
        techcard_form.save()
        ingridient_formset.save()
        return redirect(reverse("cards:techcard_list"))
    return render(request, "cards/techcard_create_edit.html", context)


@login_required
def techcard_delete(request, id):
    user = request.user
    techcard = get_object_or_404(TechCard, id=id)
    if techcard.owner != user:
        redirect(reverse("cards:techcard_list"))
    techcard.delete()
    return redirect(reverse("cards:techcard_list"))


@login_required
def semifabricate_list(request):
    user = request.user
    semifabricates = user.products.filter(is_semifabricate=True)
    context = {"semifabricates": semifabricates}
    return render(request, "cards/semifabricate_list.html", context)


@login_required
def semifabricate_detail(request, id):
    user = request.user
    semifabricate: Product = get_object_or_404(Product, id=id)
    if semifabricate.owner != user:
        redirect(reverse("index"))
    context = techcard_to_dict(semifabricate.techcard.id)
    context["semifabricate_id"] = id
    return render(request, "cards/techcard_detail.html", context)


@login_required
def semifabricate_create(request):
    user = request.user
    ingridient_formset = IngridientFormSet(
        request.POST or None,
        form_kwargs={"user": user},
    )
    techcard_form = TechCardForm(
        request.POST or None,
    )
    if techcard_form.is_valid() and ingridient_formset.is_valid():
        new_techcard: TechCard = techcard_form.save(commit=False)
        new_techcard.is_semifabricate = True
        new_techcard.owner = user
        new_techcard.semifabricate = Product.objects.create(
            name=new_techcard.name + " п/ф",
            owner=user,
            price=0,
            is_semifabricate=True,
        )
        new_techcard.save()
        ingridient_formset.instance = new_techcard
        ingridient_formset.save()
        calculate_semifabricate(new_techcard.semifabricate)
        return redirect(reverse("cards:semifabricate_list"))
    context = {
        "techcard_form": techcard_form,
        "ingridient_formset": ingridient_formset,
    }
    return render(request, "cards/semifabricate_create_edit.html", context)


@login_required
def semifabricate_edit(request, id):
    semifabricate = get_object_or_404(Product, id=id)
    techcard = semifabricate.techcard
    user = request.user
    techcard_form = TechCardForm(request.POST or None, instance=techcard)
    ingridient_formset = IngridientFormSet(
        request.POST or None, form_kwargs={"user": user}, instance=techcard
    )
    context = {
        "techcard_form": techcard_form,
        "ingridient_formset": ingridient_formset,
        "is_edit": True,
        "techcard_id": techcard.id,
        "semifabricate_id": id,
    }
    if techcard_form.is_valid() and ingridient_formset.is_valid():
        techcard_form.save()
        ingridient_formset.save()
        semifabricate.name = techcard_form.cleaned_data["name"] + " п/ф"
        semifabricate.save()
        calculate_semifabricate(semifabricate)
        return redirect(reverse("cards:semifabricate_list"))
    return render(request, "cards/semifabricate_create_edit.html", context)


@login_required()
def semifabricate_delete(request, id):
    user = request.user
    semifabricate = get_object_or_404(Product, id=id)
    if semifabricate.owner != user:
        redirect(reverse("cards:semifabricate_list"))
    if Ingridient.objects.filter(product=semifabricate):
        context = {
            'product': semifabricate,
            'techcards': TechCard.objects.filter(ingridients__product=semifabricate),
        }
        return render(request, "cards/delete_forbidden.html", context)
    semifabricate.delete()
    return redirect(reverse("cards:semifabricate_list"))


def download_xlsx(request, id):
    output = io.BytesIO()
    workbook = Workbook(output, {"in_memory": True})
    make_xlsx(workbook, id)
    workbook.close()
    output.seek(0)
    response = HttpResponse(
        output.read(),
        content_type=(
            "application/vnd.openxmlformats-officedocument"
            ".spreadsheetml.sheet;"
        ),
    )
    response[
        "Content-Disposition"
    ] = f"attachment; filename=techcard-{id}.xlsx;"
    output.close()
    return response
