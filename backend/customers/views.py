from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Customer
from .serializers import CustomerSerializer

@api_view(['GET'])
def get_customer(request, name):
    try:
        customer = Customer.objects.get(name=name)
        serializer = CustomerSerializer(customer)
        return Response(serializer.data)
    except Customer.DoesNotExist:
        return Response(None)