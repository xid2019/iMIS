from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Part
from django.db.models import Q 
from .serializers import PartSerializer
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
def get_parts(request):
    part_number = request.GET.get('part_number')
    dwg_number = request.GET.get('dwg_number')
    revision = request.GET.get('revision')

    filters = Q()
    
    if part_number:
        filters &= Q(part_number=part_number)
    if dwg_number:
        filters &= Q(dwg_number=dwg_number)
    if revision:
        filters &= Q(revision=revision)

    parts = Part.objects.filter(filters)
    
    # Serialize the data (you might need a serializer here)
    serializer = PartSerializer(parts, many=True)
    
    return Response(serializer.data)

@api_view(['POST'])
def create_part(request):
    serializer = PartSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    

