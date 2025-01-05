from api.models import Image
from api.serializers import ImageSerializer, UserSerializer
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.conf import settings
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics, status
# from rest_framework.authtoken.models import Token
from api.authentication import APIKeyAuthentication

@api_view(['GET'])
@authentication_classes([APIKeyAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated]) # Only authenticated users can access this view (i.e. users with a valid token)
def ImageList(request):
    """Return a list of all images"""

    # fetch all the images from the database
    try:
        images = Image.objects.all()

        exterior_images = []
        interior_images = []

        # Separate the images into two categories
        for image in images:
            if image.category == "interior":
                interior_images.append(image)
            elif image.category == "exterior":
                exterior_images.append(image)
        
        # Serialize the data (Convert Python data types to JSON)
        exterior_serializer = ImageSerializer(exterior_images, many=True)
        interior_serializer = ImageSerializer(interior_images, many=True)

        all_images = {
            "interior": interior_serializer.data,
            "exterior": exterior_serializer.data
        }

        # Return the serialized data
        return Response({"images": all_images}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# Used to create a temporary user (for testing purposes)
@api_view(['POST'])
def TempSignUp(request):

    # Make sure the endpoint is disabled in production
    if not settings.DEBUG:
        return Response({"error": "Endpoint is disabled"}, status=status.HTTP_403_FORBIDDEN)

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

# Testing endpoint to bulk upload images
@authentication_classes([APIKeyAuthentication])
@permission_classes([IsAuthenticated])
def BulkImageUpload(request):
    """Bulk upload images with their metadata"""

    # Make sure the endpoint is disabled in production
    # if not settings.DEBUG:
    #     return Response({"error": "Endpoint is disabled"}, status=status.HTTP_403_FORBIDDEN)

    try:
        images_data = request.data.get('images', [])
        
        successful_uploads = []
        failed_uploads = []
        
        # Loop through the images and save them to the database
        for image_data in images_data:
            try:
                serializer = ImageSerializer(data={
                    'imageUrl': image_data['imageUrl'],
                    'category': image_data['category'],
                    # 'width': image_data['width'],
                    # 'height': image_data['height']
                })
                
                # Check if the data is valid
                if serializer.is_valid():
                    serializer.save()
                    successful_uploads.append(image_data['imageUrl'])
                else:
                    failed_uploads.append({
                        'imageUrl': image_data['imageUrl'],
                        'errors': serializer.errors
                    })
            except Exception as e:
                failed_uploads.append({
                    'imageUrl': image_data['imageUrl'],
                    'errors': str(e)
                })
                
        return Response({
            'message': f'Uploaded {len(successful_uploads)} images successfully',
            'successful': successful_uploads,
            'failed': failed_uploads
        }, status=status.HTTP_201_CREATED if successful_uploads else status.HTTP_400_BAD_REQUEST)
            
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)