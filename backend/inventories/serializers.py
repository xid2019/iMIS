from rest_framework import serializers
from .models import InventoryItem

class InventoryItemSerializer(serializers.ModelSerializer):
    weight = serializers.FloatField(allow_null=True, required=False)
    class Meta:
        model = InventoryItem
        fields = '__all__'
        