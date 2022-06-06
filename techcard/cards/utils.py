import openpyxl as exel
from openpyxl.styles import Side, Border, NamedStyle, Font

from cards.models import TechCard


def techcard_to_dict(techcard_id):
    techcard: TechCard = TechCard.objects.prefetch_related('ingridients__product').get(id=techcard_id)
    total_weight = 0
    total_price = 0
    tc_dict = {
        'techcard_id': techcard.id,
        'name': techcard.name,
        'date': techcard.create_date,
        'description': techcard.description,
        'ingridients': [],
        }
    for ingridient in techcard.ingridients.all():
        price = ingridient.ammount * ingridient.product.price
        gross_weight = ingridient.ammount * ingridient.product.unit_weight
        net_weight = gross_weight * (100 - ingridient.cold_waste)/100
        final_weight = net_weight * (100 - ingridient.hot_waste)/100
        tc_dict['ingridients'].append(
            (ingridient.product.name, ingridient.product.unit, gross_weight,
             net_weight, final_weight, ingridient.product.price, price)
        )
        total_price += price
        total_weight += final_weight
    tc_dict['price'] = total_price
    tc_dict['weight'] = total_weight
    return tc_dict


def make_xlsx():
    wb = exel.Workbook()
    listname = 'Первый лист'
    wb.create_sheet(title = listname, index = 0)
    wb.remove(wb['Sheet'])
    ws = wb[listname]
    COLUMN_WIDTHS = {'A': 3, 'B': 20, 'C': 4, 'D': 7,
                    'E': 7, 'F': 7, 'G': 7, 'H': 7,
                    'I': 7, 'J': 7}
    for column, width in COLUMN_WIDTHS.items():
        ws.column_dimensions[column].width = width
    for row in range(1,12):
        ws.row_dimensions[row].height = 20
    ws.row_dimensions[9].height = 85

    ws.merge_cells('A1:E2')
    ws.merge_cells('F1:I1')
    ws.merge_cells('F2:I2')
    ws.merge_cells('A3:I3')
    ws.merge_cells('A9:I9')
    ws.merge_cells('A10:I10')
    ws.merge_cells('A11:B11')
    ws.merge_cells('C11:D11')
    ws.merge_cells('E11:G11')
    ws.merge_cells('H11:I11')
    borderstyle = NamedStyle(name="borderstyle")
    borderstyle.font = Font(bold=True, size=20)
    bd = Side(style='thin', color="000000")
    borderstyle.border = Border(left=bd, top=bd, right=bd, bottom=bd)
    cells = ws['A1':'I11']
    for row in cells:
        for cell in row:
            cell.style = borderstyle
    return wb