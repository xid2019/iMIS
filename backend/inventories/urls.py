from django.urls import path
from .views import create_inventory_item, get_inventory_items

urlpatterns = [
    path('inventory_items/create/', create_inventory_item, name='create_inventory_item'),
    path('', get_inventory_items, name='get_inventory_items'),
]