from rest_framework import serializers
from api.models import Image
from django.contrib.auth.models import User

# Serializers define the API representation. (Converts to/from JSON)
class ImageSerializer(serializers.ModelSerializer):

    # Meta class is used to define metadata about the serializer class
    class Meta:
        model = Image
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email']