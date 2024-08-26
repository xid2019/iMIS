from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Company
from .serializers import CompanySerializer

@api_view(['GET'])
def get_company(request, name):
    try:
        company = Company.objects.get(name=name)
        serializer = CompanySerializer(company)
        return Response(serializer.data)
    except Company.DoesNotExist:
        return Response(None)