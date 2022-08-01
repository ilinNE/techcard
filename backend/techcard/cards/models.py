from django.contrib.auth import get_user_model
from django.db import models


User = get_user_model()


class Tag(models.Model):
    name = models.CharField(max_length=32, verbose_name="Название")
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="tags",
        verbose_name="Владелец",
    )
    color = models.CharField(max_length=8, verbose_name="Цвет")

    class Meta:
        verbose_name = "Метка"
        verbose_name_plural = "Метки"

    def __str__(self):
        return self.name


class Product(models.Model):
    class Unit(models.TextChoices):
        PCS = "Шт", "Шт"
        KG = "Кг", "Кг"
        LIT = "Л", "Л"
        GR = "Гр", "Гр"

    name = models.CharField(max_length=32, verbose_name="Название")
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="products",
        verbose_name="Владелец",
    )
    unit = models.CharField(
        max_length=2,
        choices=Unit.choices,
        default=Unit.KG,
        verbose_name="Единица измерения",
    )
    unit_weight = models.DecimalField(
        max_digits=8,
        decimal_places=3,
        default=1,
        verbose_name="Вес еденицы измерения",
    )
    price = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="Цена"
    )
    is_semifabricate = models.BooleanField(
        default=False, verbose_name="Это полуфабрикат"
    )
    tags = models.ManyToManyField(
        Tag, related_name="products", verbose_name="Тэги", blank=True
    )
    modified_date = models.DateTimeField(
        auto_now=True, verbose_name="Дата изменения"
    )
    create_date = models.DateField(
        auto_now_add=True, verbose_name="Дата создания"
    )

    class Meta:
        verbose_name = "Продукт"
        verbose_name_plural = "Продукты"
        ordering = ["-modified_date"]

    def __str__(self):
        return self.name


class TechCard(models.Model):
    name = models.CharField(max_length=30, verbose_name="Название")
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="techcards",
        verbose_name="Владелец",
    )
    create_date = models.DateField(
        auto_now_add=True, verbose_name="Дата изменения"
    )
    modified_date = models.DateTimeField(
        auto_now=True, verbose_name="Дата изменения"
    )
    ingredients = models.ManyToManyField(
        Product,
        through="Ingredient",
        related_name="techcards",
        verbose_name="Ингредиенты",
    )
    tags = models.ManyToManyField(
        Tag, related_name="ingredients", verbose_name="Тэги", blank=True
    )
    description = models.TextField(blank=True, verbose_name="Описание")
    is_semifabricate = models.BooleanField(
        default=False, verbose_name="Это полуфабрикат"
    )
    weight = models.DecimalField(
        max_digits=8, decimal_places=3, blank=True, verbose_name="Вес"
    )
    semifabricate = models.OneToOneField(
        Product,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        verbose_name="Полуфабрикат",
    )

    class Meta:
        verbose_name = "Техкарта"
        verbose_name_plural = "Техкарты"
        ordering = ["-modified_date"]

    def __str__(self):
        return self.name

    def update(self, data):
        if "weight" not in data.keys():
            data["weight"] = 0
        for field, value in data.items():
            setattr(self, field, value)
        self.save()



class Ingredient(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, verbose_name="Продукт"
    )
    amount = models.DecimalField(
        max_digits=8, decimal_places=3, verbose_name="Количество"
    )
    cold_waste = models.DecimalField(
        max_digits=8, decimal_places=3, verbose_name="Холодный отход"
    )
    hot_waste = models.DecimalField(
        max_digits=8, decimal_places=3, verbose_name="Горячий отход"
    )
    techcard = models.ForeignKey(
        TechCard,
        on_delete=models.CASCADE,
        verbose_name="Техкарта",
    )

    class Meta:
        verbose_name = "Ингредиент"
        verbose_name_plural = "Ингредиенты"

    def __str__(self):
        return f"{self.product}/{self.techcard}"
