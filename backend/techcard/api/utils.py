from django.db.models import DecimalField, ExpressionWrapper, F, Sum
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from cards.models import Ingredient, TechCard, Product


def create_or_update_semifabricate(techcard: TechCard) -> None:
    for ingredient in techcard.ingredient_set.all():
        print(ingredient.amount)
        print(ingredient.product.price)
    result = techcard.ingredient_set.aggregate(
        price=Sum(F("amount") * F("product__price"))
        / Sum(
            ExpressionWrapper(
                F("amount") * F("product__unit_weight")
                * (1 - F("cold_waste") * 0.01)
                * (1 - F("hot_waste") * 0.01),
                output_field=DecimalField(),
            )
        )
    )
    print(result)
    round_price = round(result["price"], 2)
    techcard.semifabricate, created = Product.objects.get_or_create(
        techcard=techcard,
        defaults={"name": techcard.name + ' п/ф',
                  "price": round_price,
                  "owner": techcard.owner,
        }
    )
    if not created:
        techcard.semifabricate.price = round_price
        techcard.semifabricate.save()
    techcard.save()
    

@receiver(post_delete, sender=TechCard)
def auto_delete_semifabricate(sender, instance, **kwargs):
    try:
        if instance.semifabricate:
            instance.semifabricate.delete()
    except Product.DoesNotExist:
        pass

@receiver(post_save, sender=Product)
def recalculate_semifabricates(sender, instance, **kwargs):
    ingredients_with_semifabricate = Ingredient.objects.filter(
        product=instance, techcard__is_semifabricate=True
    )
    for ingredient in ingredients_with_semifabricate:
        create_or_update_semifabricate(ingredient.techcard)
