from api.models import Image
from api.serializers import ImageSerializer, UserSerializer
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.authtoken.models import Token

# Used to create a temporary user (for testing purposes)
@api_view(['POST'])
def TempSignUp(request):

    # deserialize the data (Convert JSON to Python data types)
    serializer = UserSerializer(data=request.data)

    # Check if the data is valid
    if serializer.is_valid():

        # Save the data to the database
        serializer.save()

        # Get the user object from the database
        user = User.objects.get(username=request.data['username'])
        
        # Set the password for the user (Hashes the password)
        user.set_password(request.data['password'])

        # Save the user object with the hashed password
        user.save()

        # Create a token for the user
        token = Token.objects.create(user=user)

        # Return the token and user data was created
        return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_201_CREATED)

    # Return an error if the data is not valid (e.g. missing fields, invalid data types, etc.)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([TokenAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated]) # Only authenticated users can access this view (i.e. users with a valid token)
def ImageList(request):

    # Make sure the endpoint is disabled in production
    if not settings.DEBUG:
        return Response({"error": "Endpoint is disabled"}, status=status.HTTP_403_FORBIDDEN)

    # Get the user object from the database (check that the user exists)
    user = get_object_or_404(User, username=request.data['username'])

    # Check if the credentials match the user object (i.e. the user is authenticated)
    if not user.check_password(request.data['password']):
        return Response({"message": "You are not authenticated!"}, status=status.HTTP_401_UNAUTHORIZED)

    # TODO: Add logic to return the list of images

    return Response({"message": "You are authenticated!"}, status=status.HTTP_200_OK)
    
# class ImageList(generics.ListAPIView):
#     queryset = Image.objects.all()
#     serializer_class = ImageSerializer