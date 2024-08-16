from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import OrderSerializer
from order_lines.serializers import OrderLineSerializer
from .models import Order


@api_view(['GET'])
def get_orders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_order(request, pk):
    try:
        order = Order.objects.get(pk=pk)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = OrderSerializer(order)
    return Response(serializer.data)


@api_view(['POST'])
def create_order(request):
    order_data = dict(
        customer_id=request.data['customer_id'],
        customer_PO=request.data['customer_PO'],
        order_date=request.data['order_date']
    )
    orderSerializer = OrderSerializer(data=order_data)

    if orderSerializer.is_valid():
        orderSerializer.save()

    for order_line_data in request.data['order_lines']:
        orderLineSerializer = OrderLineSerializer(data=order_line_data)
        if orderLineSerializer.is_valid():
            orderLineSerializer.save()

    return Response(orderSerializer.data, status=status.HTTP_201_CREATED)
