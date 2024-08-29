from django.urls import path
from .views import get_customer
urlpatterns = [
    path('<str:name>/', get_customer, name='get_customer'),
]