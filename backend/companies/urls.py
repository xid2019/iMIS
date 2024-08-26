from django.urls import path
from .views import get_company
urlpatterns = [
    path('<str:name>/', get_company, name='get_company'),
]