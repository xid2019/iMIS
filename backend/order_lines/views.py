from rest_framework.decorators import api_view
from .serializers import OrderLineSerializer
from .models import OrderLine
from rest_framework.response import Response
from rest_framework import status
# Create your views here.


@api_view(['GET'])
def get_order_lines(request):
    order_lines = OrderLine.objects.all()
    serializer = OrderLineSerializer(order_lines, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def create_order_line(request):
    serializer = OrderLineSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_order_line(request, order_line_id):
    try:
        # Retrieve the OrderLine by the order_id
        order_line = OrderLine.objects.get(id=order_line_id)
    except OrderLine.DoesNotExist:
        return Response({"detail": "OrderLine not found"}, status=status.HTTP_404_NOT_FOUND)

    # Update the OrderLine with the data provided in the request
    serializer = OrderLineSerializer(
        order_line, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_order_line(request, order_line_id):
    deleted, _ = OrderLine.objects.filter(id=order_line_id).delete()

    if deleted:
        return Response({"detail": "OrderLine deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    else:
        return Response({"detail": "OrderLine not found"}, status=status.HTTP_404_NOT_FOUND)
