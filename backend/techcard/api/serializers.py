from django.contrib.auth import get_user_model
from django.db import transaction
from drf_spectacular.utils import extend_schema_serializer
from rest_framework import serializers

import api.examples as examples
from .utils import create_or_update_semifabricate
from cards.models import Ingredient, Product, Tag, TechCard

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(
        write_only=True, style={"input_type": "password"}
    )

    class Meta:
        model = User
        fields = ("username", "email", "password")
        read_only_fields = ("id",)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data["username"],
            email=validated_data["email"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


class TokenObtainPairResponseSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField()

    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()


class TokenRefreshResponseSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField()

    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()


class SendMailSerializer(serializers.Serializer):
    title = serializers.CharField(label="Заголовок")
    message = serializers.CharField(label="Текст сообщения")
    return_address = serializers.EmailField(label="Адрес отправителя")


@extend_schema_serializer(
    examples=[examples.TAG_REQUEST_EXAMPLE, examples.TAG_RESPONSE_EXAMPLE]
)
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ("id", "name", "color")
        read_only_fields = ("id",)


@extend_schema_serializer(
    examples=[
        examples.PRODUCT_PIECES_EXAMPLE,
        examples.PRODUCT_WEIGHT_EXAMPLE,
        examples.PRODUCT_RESPONSE_EXAMPLE,
    ]
)
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ("id", "name", "unit", "unit_weight", "price", "tags")
        read_only_fields = ("id",)


class IngredientSerializer(serializers.ModelSerializer):
    unit = serializers.CharField(source="product.unit", read_only=True)

    class Meta:
        model = Ingredient
        fields = ("product", "unit", "amount", "cold_waste", "hot_waste")


@extend_schema_serializer(
    examples=[
        examples.TECHCARD_REQUEST_EXAMPLE,
        examples.TECHCARD_RESPONSE_EXAMPLE,
    ]
)
class TechCardSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True, source="ingredient_set")

    class Meta:
        model = TechCard
        exclude = ("owner",)
        read_only_fields = ("semifabricate",)

    def add_ingredients(self, techcard, ingredients):
        for ingredient in ingredients:
            techcard.ingredients.add(
                ingredient["product"],
                through_defaults={
                    "amount": ingredient["amount"],
                    "cold_waste": ingredient["cold_waste"],
                    "hot_waste": ingredient["hot_waste"],
                },
            )

    @transaction.atomic()
    def create(self, validated_data):
        ingredients = validated_data.pop("ingredient_set")
        tags = validated_data.pop("tags")
        techcard = TechCard.objects.create(**validated_data)
        techcard.tags.add(*tags)
        self.add_ingredients(techcard, ingredients)
        if techcard.is_semifabricate:
            create_or_update_semifabricate(techcard)
        return techcard

    @transaction.atomic()
    def update(self, techcard: TechCard, validated_data):
        ingredients = validated_data.pop("ingredient_set")
        tags = validated_data.pop("tags")
        techcard.update(data=validated_data)
        techcard.tags.set(tags)
        techcard.ingredients.clear()
        self.add_ingredients(techcard, ingredients)
        if techcard.is_semifabricate:
            create_or_update_semifabricate(techcard)
        return techcard
