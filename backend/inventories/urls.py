from django.urls import path
from .views import create_inventory_item, get_inventory_items, update_inventory_item, get_inventory_records, update_inventory_record, delete_inventory_record

urlpatterns = [
    path('inventory_items/create/', create_inventory_item, name='create_inventory_item'),
    path('', get_inventory_items, name='get_inventory_items'),
    path('inventory_items/update/<int:inventory_item_id>/',
          update_inventory_item, name='update_inventory_item'),
    path('inventory_records/<int:inventory_item_id>/',
          get_inventory_records, name='get_inventory_records'),
    path('inventory_records/<int:record_id>/update/', update_inventory_record, name='update_inventory_record'),
    path('inventory_records/<int:record_id>/delete/', delete_inventory_record, name='delete_inventory_record'),
]