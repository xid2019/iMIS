from django.shortcuts import render
from rest_framework.decorators import api_view


@api_view(['GET'])
def get_parts(request):
    # Extract query parameters
    part_number = request.GET.get('part_number')
    dwg_number = request.GET.get('dwg_number')
    revision = request.GET.get('revision')

    

