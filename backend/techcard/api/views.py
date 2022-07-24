from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


hello_response = openapi.Response(
    description='ОK',
    examples={
                "application/json": {
                    'message': 'Получены данные',
                    'data': "Данные запроса"
                }
            })
@swagger_auto_schema(
    method='get',
    operation_id='Hello GET',
    responses={200: 'Это был GET-запрос!'}
    )
@swagger_auto_schema(
    method='post',
    operation_id='Hello POST',
    responses={200: hello_response}
    )
@api_view(['GET', 'POST'])
def hello(request):
    if request.method == 'POST':
        return Response({'message': 'Получены данные', 'data': request.data})
    return Response({'message': 'Это был GET-запрос!'}) 