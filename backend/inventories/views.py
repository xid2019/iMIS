from rest_framework.decorators import api_view
from .models import InventoryItem
from django.db.models import Q 
from .serializers import InventoryItemSerializer
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
    
    # Print errors to debug
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_inventory_items(request):
    print('aaaa')
    inventory_items = InventoryItem.objects.all()
    serializer = InventoryItemSerializer(inventory_items, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)