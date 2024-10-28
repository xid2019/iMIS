from rest_framework import serializers
from .models import InventoryItem, InventoryRecord

class InventoryItemSerializer(serializers.ModelSerializer):
    weight = serializers.FloatField(allow_null=True, required=False)
    class Meta:
        model = InventoryItem
        fields = '__all__'
class InventoryRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryRecord
        fields = '__all__' 
        