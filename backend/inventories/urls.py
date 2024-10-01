from django.urls import path
from .views import create_inventory_item

urlpatterns = [
    path('items/create/', create_inventory_item, name='create_inventory_item'),
]