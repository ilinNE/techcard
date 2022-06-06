# Generated by Django 3.2.13 on 2022-05-23 14:46

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cards", "0003_auto_20220428_1824"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="product",
            name="semifabricate",
        ),
        migrations.AddField(
            model_name="product",
            name="unit_weight",
            field=models.DecimalField(
                decimal_places=3, default=1.0, max_digits=8
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="techcard",
            name="semifabricate",
            field=models.OneToOneField(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="cards.product",
            ),
        ),
        migrations.AlterField(
            model_name="product",
            name="unit",
            field=models.CharField(
                choices=[("Шт", "Шт"), ("Кг", "Кг"), ("Л", "Л")],
                default="Кг",
                max_length=2,
            ),
        ),
        migrations.AlterField(
            model_name="techcard",
            name="create_date",
            field=models.DateField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name="techcard",
            name="description",
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name="techcard",
            name="name",
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name="techcard",
            name="price",
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
        migrations.AlterField(
            model_name="techcard",
            name="weight",
            field=models.DecimalField(decimal_places=3, max_digits=8),
        ),
    ]
