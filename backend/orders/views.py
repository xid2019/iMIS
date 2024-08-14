from django.shortcuts import render
from rest_framework import generics
from .serializers import OrderSerializer
from .models import Order


class OrderView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
