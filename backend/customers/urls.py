from django.urls import path
from .views import get_customer, get_customers
urlpatterns = [
    path('', get_customers, name='get_customers'),
    path('<str:name>/', get_customer, name='get_customer'),
]