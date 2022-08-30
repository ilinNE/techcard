import pytest

from cards.models import Tag, Product, TechCard

@pytest.fixture
def tag_1(user):
    return Tag.objects.create(owner=user, name="yellow", color="#ffff00")

@pytest.fixture
def tag_2(user):
    return Tag.objects.create(owner=user, name="red", color="#ff0000")


@pytest.fixture
def product_1(user, tag_1, tag_2):
    product_1 = Product.objects.create(
        owner=user,
        name="Сахар",
        price=87.00,

    )
    product_1.tags.set([tag_1, tag_2])
    return product_1 

@pytest.fixture
def product_2(user):
    return Product.objects.create(
        owner=user,
        name="Яйцо куриное",
        unit='Шт',
        unit_weight=0.050,
        price=7.00
    )

@pytest.fixture
def foreign_product(another_user):
    return Product.objects.create(
        owner=another_user,
        name="foreign_product",
        unit='Шт',
        unit_weight=0.050,
        price=7.00
    )

@pytest.fixture
def semifabricate(user, product_1, product_2):
    semifabricate = TechCard.objects.create(
        owner=user,
        name="Testsemifabicate",
        description="text",
        weight=0,
        is_semifabricate=True,
    )
    semifabricate.ingredients.add(product_1, through_defaults={
        'amount': 0.024,
        "cold_waste": 0,
        "hot_waste": 0
    })
    semifabricate.ingredients.add(product_2, through_defaults={
        'amount': 1,
        "cold_waste": 50,
        "hot_waste": 0
    })
    return semifabricate

@pytest.fixture
def techcard(user, product_1, product_2):
    techcard = TechCard.objects.create(
        owner=user,
        name="Testcard",
        description="text",
        weight=0
    )
    techcard.ingredients.add(product_1, through_defaults={
        'amount': 0.024,
        "cold_waste": 0,
        "hot_waste": 0
    })
    return techcard