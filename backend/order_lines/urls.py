from django.urls import path
from .views import get_order_lines, get_order_line, create_order_line, update_order_line, delete_order_line

urlpatterns = [
     path('', get_order_lines, name='get_order_lines'),
     path('create/', create_order_line, name='create_order_line'),
     path('update/<int:order_line_id>/',
          update_order_line, name='update_order_line'),
     path('delete/<int:order_line_id>/', delete_order_line, name='delete_order_line'),
     path('get/', get_order_line, name='get_order_line'),
]
