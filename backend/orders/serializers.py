from rest_framework import serializers
from .models import Order
from order_lines.serializers import OrderLineSerializer
from order_lines.models import OrderLine


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

    
