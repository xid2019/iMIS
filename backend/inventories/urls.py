from django.urls import path
from .views import create_inventory_item, delete_inventory_item, create_inventory_record, get_inventory_items, update_inventory_item, get_inventory_records, delete_inventory_record

urlpatterns = [
    path('inventory_items/create/', create_inventory_item, name='create_inventory_item'),
    path('', get_inventory_items, name='get_inventory_items'),
    path('inventory_items/update/<int:inventory_item_id>/',
          update_inventory_item, name='update_inventory_item'),
    path('inventory_items/delete/<int:inventory_item_id>/',
          delete_inventory_item, name='delete_inventory_item'),
    path('inventory_records/<int:inventory_item_id>/',
          get_inventory_records, name='get_inventory_records'),
    path('inventory_records/create/<int:inventory_item_id>/', create_inventory_record, name='create_inventory_record'),
    path('inventory_records/delete/<int:record_id>/', delete_inventory_record, name='delete_inventory_record'),
]