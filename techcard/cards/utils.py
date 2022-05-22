from decimal import Decimal

from .models import Product, TechCard


def create_techcard(user, techcard_form, ingridient_formset, is_semifabricate):
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
    if is_semifabricate:
        new_techcard.is_semiffabricate = True
        semifabricate_name = new_techcard.name + ' п/ф'
        semifabricate_price = new_techcard.price / Decimal(new_techcard.weight)
        Product.objects.create(
            name=semifabricate_name,
            owner=user,
            price=semifabricate_price,
            is_semifabricate=True,
            semifabricate=new_techcard 
        )
    new_techcard.save()


def edit_techcard(techcard_id, techcard_form, ingridient_formset, is_semifabricate):
    techcard = TechCard.objects.get(id=techcard_id)
    user = techcard.owner
    techcard.name = techcard_form.cleaned_data['name']
    techcard.weight = 0
    techcard.price = 0
    techcard.ingridients.all().delete()
    for ingridient_form in ingridient_formset:
        product = ingridient_form.cleaned_data['product']
        weigth = ingridient_form.cleaned_data['ammount']
        price = Decimal(weigth) * product.price
        new_ingridient = ingridient_form.save(commit=False)
        new_ingridient.price = price
        new_ingridient.techcard = techcard
        new_ingridient.save()
        techcard.price += price
        techcard.weight += weigth
    if is_semifabricate:
        semifabricate_name = techcard.name + ' п/ф'
        semifabricate_price = techcard.price / Decimal(techcard.weight)
        product = Product.objects.get(semifabricate=techcard)
        product.name = semifabricate_name
        product.price = semifabricate_price
        product.save()
    techcard.save()