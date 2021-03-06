# Generated by Django 3.2.13 on 2022-04-17 22:53

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cards", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="ingridient",
            options={
                "verbose_name": "Ингридиент",
                "verbose_name_plural": "Ингридиенты",
            },
        ),
        migrations.AlterModelOptions(
            name="product",
            options={
                "verbose_name": "Продукт",
                "verbose_name_plural": "Продукты",
            },
        ),
        migrations.AlterModelOptions(
            name="techcard",
            options={
                "verbose_name": "Техкарта",
                "verbose_name_plural": "Техкарты",
            },
        ),
        migrations.AddField(
            model_name="techcard",
            name="is_semifabricate",
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name="product",
            name="semifabricate",
            field=models.OneToOneField(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="cards.techcard",
            ),
        ),
        migrations.DeleteModel(
            name="Semifabricate",
        ),
    ]
