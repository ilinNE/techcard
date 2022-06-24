from django.db.models import F, Sum, DecimalField, ExpressionWrapper

from cards.models import Ingridient, TechCard


def calculate_semifabricate(semifabricate):
    """Подсчитывает себестоимость полуфабриката на 1 кг веса.
    Также рекурсивно пересчитывает себестоимости всех полуфабрикатов
    для которых данный полуфабрикат является ингридиентом.
    """
    result = semifabricate.techcard.ingridients.aggregate(
        price = Sum(F("ammount") * F("product__price")) / Sum(
            ExpressionWrapper(
                F("ammount")
                * (1 - F("cold_waste")*0.01)
                * (1 - F("hot_waste")*0.01),
                output_field=DecimalField())
        )
    )
    semifabricate.price = round(result["price"], 2)
    semifabricate.save()
    ingridients_with_semifabricate = Ingridient.objects.filter(
        product=semifabricate,
        techcard__is_semifabricate=True
    )
    for ingridient in ingridients_with_semifabricate:
        calculate_semifabricate(ingridient.techcard.semifabricate)


def calculate_for_product(product):
    """Пересчитывает все полуфабрикаты для
    которых данный продукт является ингридиентом.
    """
    ingridients_with_semifabricate = Ingridient.objects.filter(
        product=product,
        techcard__is_semifabricate=True
    )
    for ingridient in ingridients_with_semifabricate:
        calculate_semifabricate(ingridient.techcard.semifabricate)
        

def techcard_to_dict(techcard_id):
    techcard: TechCard = TechCard.objects.prefetch_related(
        "ingridients__product"
    ).get(id=techcard_id)
    total_weight = 0
    total_price = 0
    tc_dict = {
        "techcard_id": techcard.id,
        "name": techcard.name,
        "date": techcard.create_date,
        "description": techcard.description,
        "ingridients": [],
    }
    for ingridient in techcard.ingridients.all():
        price = ingridient.ammount * ingridient.product.price
        gross_weight = ingridient.ammount * ingridient.product.unit_weight
        net_weight = gross_weight * (100 - ingridient.cold_waste) / 100
        final_weight = net_weight * (100 - ingridient.hot_waste) / 100
        tc_dict["ingridients"].append(
            (
                ingridient.product.name,
                ingridient.product.unit,
                gross_weight,
                net_weight,
                final_weight,
                ingridient.product.price,
                price,
            )
        )
        total_price += price
        total_weight += final_weight
    tc_dict["price"] = total_price
    tc_dict["weight"] = total_weight
    return tc_dict


def make_xlsx(workbook, id):
    techcard_dict = techcard_to_dict(id)
    worksheet = workbook.add_worksheet(techcard_dict["name"])
    base_format = {
        "top": True,
        "left": True,
        "right": True,
        "bottom": True,
        "align": "left",
        "valign": "vcenter",
        "font_size": 14,
        "bold": True,
        "text_wrap": True,
    }
    big_header_format = workbook.add_format(base_format)
    base_format["font_size"] = 8
    medium_header_format = workbook.add_format(base_format)
    base_format["bold"] = False
    data_field_format = workbook.add_format(base_format)
    data_field_format.set_num_format(4)
    base_format["font_size"] = 6
    small_format = workbook.add_format(base_format)
    base_format["font_size"] = 9
    base_format["valign"] = "top"
    description_format = workbook.add_format(base_format)
    worksheet.set_column("A:A", 3)
    worksheet.set_column("B:B", 20)
    worksheet.set_column("C:C", 3)
    worksheet.set_column("D:H", 6)
    for row in range(0, 16):
        worksheet.set_row(row, 22)
    worksheet.merge_range("A1:D2", techcard_dict["name"], big_header_format)
    worksheet.merge_range(
        "E1:H1",
        f'Технологическая карта № {techcard_dict["techcard_id"]}',
        cell_format=medium_header_format,
    )
    worksheet.merge_range(
        "E2:H2", f'Дата: {techcard_dict["date"]}', medium_header_format
    )
    worksheet.merge_range("A3:H3", None, medium_header_format)
    headers = (
        "№",
        "Наименование продукта",
        "Ед.изм",
        "Вес брутто",
        "Вес нетто",
        "Вес готового продукта",
        "Себестоимость за ед., руб",
        "Цена, руб",
    )
    worksheet.write_row(3, 0, headers, small_format)
    row = 4
    ingridients = techcard_dict["ingridients"]
    worksheet.write_column(
        row, 0, range(1, len(ingridients) + 1), small_format
    )
    for ingridient in ingridients:
        worksheet.write(row, 1, ingridient[0], medium_header_format)
        worksheet.write_row(row, 2, ingridient[1:], data_field_format)
        row += 1
    row += 1
    worksheet.merge_range(
        f"A{row}:H{row+3}",
        "Технология приготовления:"
        + techcard_dict["description"].replace("\r\n", "\n"),
        description_format,
    )
    row += 4
    worksheet.merge_range(f"A{row}:H{row}", "ИТОГО", medium_header_format)
    row += 1
    worksheet.merge_range(
        f"A{row}:B{row}", "Стоимость блюда, руб", medium_header_format
    )
    worksheet.merge_range(
        f"C{row}:D{row}", techcard_dict["price"], data_field_format
    )
    worksheet.merge_range(f"E{row}:F{row}", "Выход, кг", medium_header_format)
    worksheet.merge_range(
        f"G{row}:H{row}", techcard_dict["weight"], data_field_format
    )
    return workbook
