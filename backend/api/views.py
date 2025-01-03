from django.shortcuts import render
from rest_framework import generics
from api.models import Image
from api.serializers import ImageSerializer

class ImageList(generics.ListAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer