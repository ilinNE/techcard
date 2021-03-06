# Generated by Django 3.2.13 on 2022-05-23 15:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cards", "0004_auto_20220523_1446"),
    ]

    operations = [
        migrations.AlterField(
            model_name="ingridient",
            name="ammount",
            field=models.DecimalField(decimal_places=3, max_digits=8),
        ),
        migrations.AlterField(
            model_name="ingridient",
            name="cold_waste",
            field=models.DecimalField(decimal_places=3, max_digits=8),
        ),
        migrations.AlterField(
            model_name="ingridient",
            name="hot_waste",
            field=models.DecimalField(decimal_places=3, max_digits=8),
        ),
        migrations.AlterField(
            model_name="product",
            name="unit_weight",
            field=models.DecimalField(
                decimal_places=3, default=1, max_digits=8
            ),
        ),
    ]
