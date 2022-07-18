from django.contrib.auth import get_user_model
from django.db import models



User = get_user_model()


class Product(models.Model):
    class Unit(models.TextChoices):
        PCS = "Шт", "Шт"
        KG = "Кг", "Кг"
        LIT = "Л", "Л"

    name = models.CharField(max_length=30)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="products"
    )
    create_date = models.DateField(auto_now_add=True)
    unit = models.CharField(
        max_length=2, choices=Unit.choices, default=Unit.KG
    )
    unit_weight = models.DecimalField(
        max_digits=8, decimal_places=3, default=1
    )
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_semifabricate = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Продукт"
        verbose_name_plural = "Продукты"
        ordering = ["-create_date"]

    def __str__(self):
        return self.name


class TechCard(models.Model):
    name = models.CharField(max_length=30)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="techcards"
    )
    create_date = models.DateField(auto_now_add=True)
    description = models.TextField(blank=True)
    is_semifabricate = models.BooleanField(default=False)
    semifabricate = models.OneToOneField(
        Product,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = "Техкарта"
        verbose_name_plural = "Техкарты"
        ordering = ["-create_date"]

    def __str__(self):
        return self.name


class Ingridient(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    ammount = models.DecimalField(max_digits=8, decimal_places=3)
    cold_waste = models.DecimalField(max_digits=8, decimal_places=3)
    hot_waste = models.DecimalField(max_digits=8, decimal_places=3)
    techcard = models.ForeignKey(
        TechCard, on_delete=models.CASCADE, related_name="ingridients"
    )

    class Meta:
        verbose_name = "Ингридиент"
        verbose_name_plural = "Ингридиенты"

    def __str__(self):
        return f"{self.product}/{self.techcard}"
