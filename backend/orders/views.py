from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import OrderSerializer
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
    serializer = OrderSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
