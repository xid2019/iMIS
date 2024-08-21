from django.urls import path
from .views import get_parts, create_part

urlpatterns = [
    path('', get_parts, name='get_parts'),
    path('create/', create_part, name='create_part'),
]