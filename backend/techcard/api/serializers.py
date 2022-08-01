from email import message
from tabnanny import verbose
from turtle import title
from django.contrib.auth import get_user_model
from rest_framework import serializers

from cards.models import Tag, Product


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
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
    title = serializers.CharField(label='Заголовок')
    message = serializers.CharField(label="Текст сообщения")
    return_address = serializers.EmailField(label="Адрес отправителя")


class TagSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Tag
        fields = ("id","name", "color")
        read_only_fields = ("id",)


class RepresentProductSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)

    class Meta:
        model = Product
        exclude = ("owner",)


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ("name", "unit", "unit_weight", "price", "tags")

    def to_representation(self, instance):
        serializer = RepresentProductSerializer(instance, context=self.context)
        return serializer.data