from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import OrderSerializer
from order_lines.serializers import OrderLineSerializer
from .models import Order
from order_lines.models import OrderLine
from django.db import transaction


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
    # Use a transaction to ensure atomicity
    with transaction.atomic():
        order_data = dict(
            customer_id=request.data['customer_id'],
            customer_PO=request.data['customer_PO'],
            order_date=request.data['order_date']
        )
        order_serializer = OrderSerializer(data=order_data)

        if order_serializer.is_valid():
            # Save the order if the data is valid
            order = order_serializer.save()

            # Validate and save each order line
            order_lines = request.data['order_lines']
            order_lines_data = []
            for order_line_data in order_lines:
                # validate order_line_data
                order_line_serializer = OrderLineSerializer(
                    data=order_line_data)

                if order_line_serializer.is_valid():
                    order_line_data['order'] = order
                    order_lines_data.append(OrderLine(**order_line_data))
                else:
                    # If any order line is invalid, return an error response
                    return Response(order_line_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            OrderLine.objects.bulk_create(order_lines_data)
            # Return the order data if everything is successful
            return Response(order_serializer.data, status=status.HTTP_201_CREATED)

        # If the order data is invalid, return an error response
        return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
