from django.urls import path
from .views import get_orders, create_order, get_order

urlpatterns = [
    path('', get_orders, name='get_orders'),
    path('<int:pk>/', get_order, name='get_order'),
    path('create/', create_order, name='create_order'),
]
