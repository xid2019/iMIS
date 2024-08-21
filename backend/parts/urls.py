from django.urls import path
from .views import get_parts

urlpatterns = [
    path('', get_parts, name='get_parts'),
]