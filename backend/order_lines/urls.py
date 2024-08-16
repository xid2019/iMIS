from django.urls import path
from .views import get_order_lines

urlpatterns = [
    path('', get_order_lines, name='get_order_lines'),
]
