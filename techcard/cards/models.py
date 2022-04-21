from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class TechCard(models.Model):
    name = models.CharField(
        max_length=30
        )
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='techcards'
        )
    create_date = models.DateField(auto_now_add=True)
    weight = models.FloatField()
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        )
    is_semifabricate = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Техкарта'
        verbose_name_plural = 'Техкарты'

    def __str__(self):
        return self.name


class Product(models.Model):
    class Unit(models.TextChoices):
        PCS = '1', 'Шт'
        KG = '2', 'Кг'
    name = models.CharField(max_length=30)
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='products')
    create_date = models.DateField(auto_now_add=True)
    unit = models.CharField(
        max_length=2,
        choices=Unit.choices,
        default=Unit.KG
        )
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_semifabricate = models.BooleanField(default=False)
    semifabricate = models.OneToOneField(
        TechCard,
        on_delete=models.CASCADE,
        blank=True,
        null=True
        )

    class Meta:
        verbose_name = 'Продукт'
        verbose_name_plural = 'Продукты'

    def __str__(self):
        return self.name


class Ingridient(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
        )
    ammount = models.FloatField()
    cold_waste = models.FloatField()
    hot_waste = models.FloatField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    techcard = models.ForeignKey(
        TechCard,
        on_delete=models.CASCADE,
        related_name='ingridients'
        )

    class Meta:
        verbose_name = 'Ингридиент'
        verbose_name_plural = 'Ингридиенты'

    def __str__(self):
        return f'{self.product}/{self.techcard}'
