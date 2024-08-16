from rest_framework.decorators import api_view
from .serializers import OrderLineSerializer
from .models import OrderLine
from rest_framework.response import Response
# Create your views here.


@api_view(['GET'])
def get_order_lines(request):
    order_lines = OrderLine.objects.all()
    serializer = OrderLineSerializer(order_lines, many=True)
    return Response(serializer.data)
