from django.urls import path
from .views import create_inventory_item, get_inventory_items, update_inventory_item

urlpatterns = [
    path('inventory_items/create/', create_inventory_item, name='create_inventory_item'),
    path('', get_inventory_items, name='get_inventory_items'),
    path('inventory_items/update/<int:inventory_item_id>/',
          update_inventory_item, name='update_inventory_item'),
]