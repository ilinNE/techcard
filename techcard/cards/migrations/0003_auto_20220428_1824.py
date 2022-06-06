# Generated by Django 3.2.13 on 2022-04-28 18:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cards", "0002_auto_20220417_2253"),
    ]

    operations = [
        migrations.AddField(
            model_name="techcard",
            name="description",
            field=models.TextField(blank=True, verbose_name="Описание"),
        ),
        migrations.AlterField(
            model_name="techcard",
            name="create_date",
            field=models.DateField(
                auto_now_add=True, verbose_name="Дата создания"
            ),
        ),
        migrations.AlterField(
            model_name="techcard",
            name="name",
            field=models.CharField(max_length=30, verbose_name="Название"),
        ),
        migrations.AlterField(
            model_name="techcard",
            name="price",
            field=models.DecimalField(
                decimal_places=2, max_digits=10, verbose_name="Себестоимость"
            ),
        ),
        migrations.AlterField(
            model_name="techcard",
            name="weight",
            field=models.FloatField(verbose_name="Выход"),
        ),
    ]
