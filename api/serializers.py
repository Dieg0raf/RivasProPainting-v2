from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import Image
from api.models import ClientQuote
from api.models import Service

class ClientQuoteSerializer(serializers.ModelSerializer):

    # Use this field for output (readable format with service names)
    services = serializers.SlugRelatedField(
        many=True,
        slug_field='name',
        queryset=Service.objects.all()
    )

    class Meta:
        model = ClientQuote
        fields = ['first_name', 'last_name', 'email', 'phone', 'message', 'services']

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