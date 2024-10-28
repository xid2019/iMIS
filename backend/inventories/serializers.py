from rest_framework import serializers
from .models import InventoryItem, InventoryRecord

class InventoryItemSerializer(serializers.ModelSerializer):
    weight = serializers.FloatField(allow_null=True, required=False)
    quantity = serializers.IntegerField(read_only=True)
    class Meta:
        model = InventoryItem
        fields = ['id', 'part_number', 'dwg_number', 'revision', 'description', 'material',
                  'weight', 'factory', 'min_inventory', 'max_inventory', 'quantity']
class InventoryRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryRecord
        fields = '__all__' 
        