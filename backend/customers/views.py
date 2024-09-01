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
    
@api_view(['GET'])
def get_customers(request):
    try:
        # Fetch all customers from the database
        customers = Customer.objects.all()
        # Serialize the queryset
        serializer = CustomerSerializer(customers, many=True)
        # Return the serialized data in the response
        return Response(serializer.data)
    except Exception as e:
        # Return an error response if something goes wrong
        return Response({'error': str(e)}, status=500)