from rest_framework.decorators import api_view
from django.db.models.functions import Coalesce
from .models import InventoryItem, InventoryRecord
from django.db.models import Sum, Value
from .serializers import InventoryItemSerializer, InventoryRecordSerializer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
@api_view(['POST'])
def create_inventory_item(request):
    data = request.data.copy()
    if data.get('weight') == '':
        data['weight'] = None
    
    serializer = InventoryItemSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_inventory_items(request):
    inventory_items = InventoryItem.objects.annotate(
        quantity=Coalesce(Sum('records__quantity'), Value(0))
    )
    serializer = InventoryItemSerializer(inventory_items, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["PUT"])
def update_inventory_item(request, inventory_item_id):
    try:
        order_line = InventoryItem.objects.get(id=inventory_item_id)
    except InventoryItem.DoesNotExist:
        return Response(
            {"detail": "InventoryItem not found"}, status=status.HTTP_404_NOT_FOUND
        )

    serializer = InventoryItemSerializer(order_line, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_inventory_item(request, inventory_item_id):
    try:
        inventory_item = InventoryItem.objects.get(id=inventory_item_id)
        inventory_item.delete()
        return Response({"message": "Inventory item deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

    except InventoryItem.DoesNotExist:
        return Response({"error": "Inventory item not found"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def get_inventory_records(request, inventory_item_id):
    try:
        inventory_item = InventoryItem.objects.get(id=inventory_item_id)
        records = InventoryRecord.objects.filter(inventory_item=inventory_item).order_by('-time') 
        serializer = InventoryRecordSerializer(records, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    except InventoryItem.DoesNotExist:
        return Response({"error": "Inventory item not found"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def create_inventory_record(request, inventory_item_id):
    try:
        inventory_item = InventoryItem.objects.get(id=inventory_item_id)
        data = request.data.copy()
        data['inventory_item'] = inventory_item_id
        serializer = InventoryRecordSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    except InventoryItem.DoesNotExist:
        return Response({"error": "Inventory item not found"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['DELETE'])
def delete_inventory_record(request, record_id):
    try:
        record = InventoryRecord.objects.get(id=record_id)
        record.delete()
        return Response({"message": "Inventory record deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    
    except InventoryRecord.DoesNotExist:
        return Response({"error": "Inventory record not found"}, status=status.HTTP_404_NOT_FOUND)