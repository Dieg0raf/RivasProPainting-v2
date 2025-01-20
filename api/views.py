# Django Imports
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.conf import settings
from django.core.mail import send_mail

# REST API Imports
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics, status
from api.authentication import APIKeyAuthentication

# App Imports
from api.models import Image
from api.serializers import ImageSerializer, UserSerializer, ClientQuoteSerializer
from api.utils import generate_email_body

import logging
import boto3
from botocore.exceptions import ClientError

logger = logging.getLogger(__name__)

@api_view(['POST'])
@authentication_classes([APIKeyAuthentication])
@permission_classes([IsAuthenticated])
def SubmitQuoteRequest(request):
    """Submit a quote request"""

    if not request.is_secure() and not settings.DEBUG:
        return Response({"error": "Insecure connection"}, status=status.HTTP_400_BAD_REQUEST)

    if request.data is None:
        return Response({"error": "No data provided"}, status=status.HTTP_400_BAD_REQUEST)

    serializer = ClientQuoteSerializer(data=request.data)

    if serializer.is_valid():
        # Save Quote into our DB
        serializer.save()

        try:
            # Create SES client
            ses_client = boto3.client(
                'ses',
                aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
                region_name=settings.AWS_SES_REGION
            )
            
            # Send email using SES directly
            response = ses_client.send_email(
                Source=settings.DEFAULT_FROM_EMAIL,
                Destination={
                    'ToAddresses': [settings.TO_EMAIL_ADDRESS]
                },
                Message={
                    'Subject': {
                        'Data': f'RPP Quote Request - {request.data["first_name"]} {request.data["last_name"]}'
                    },
                    'Body': {
                        'Text': {
                            'Data': generate_email_body(request.data)
                        }
                    }
                }
            )
            return Response({"message": "Email sent successfully!", "MessageId": response['MessageId']}, status=status.HTTP_200_OK)
            
        except Exception as e:

            logger.error(f"Failed to send email: {str(e)}")
            return Response({"error": "Failed to send email", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
@api_view(['GET'])
@authentication_classes([APIKeyAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def ImageList(request):
    """Return a list of all images"""

    # Make sure connection is secure (over HTTPS) 
    if not request.is_secure() and not settings.DEBUG:
        return Response({"error": "Insecure connection"}, status=status.HTTP_400_BAD_REQUEST)

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
    """DEPRECATED: Temporary signup endpoint"""

    # Make sure the endpoint is disabled in production
    if not settings.DEBUG:
        return Response({"error": "Endpoint is disabled"}, status=status.HTTP_403_FORBIDDEN)

    if not request.is_secure() and not settings.DEBUG:
        return Response({"error": "Insecure connection"}, status=status.HTTP_400_BAD_REQUEST)

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
@api_view(['POST'])
@authentication_classes([APIKeyAuthentication])
@permission_classes([IsAuthenticated])
def BulkImageUpload(request):
    """DEPRECATED: Bulk upload images"""

    # Make sure the endpoint is disabled in production
    if not settings.DEBUG:
        return Response({"error": "Endpoint is disabled"}, status=status.HTTP_403_FORBIDDEN)

    # Make sure the connection is secure (over HTTPS)
    if not request.is_secure() and not settings.DEBUG:
        return Response({"error": "Insecure connection"}, status=status.HTTP_400_BAD_REQUEST)

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
    
@api_view(['POST', 'GET'])
def TestSubmitQuoteRequest(request):
    """DEPRECATED: Test endpoint to submit a quote request"""
    if request.method == 'POST':
        try:
            # Email code was removed for security reasons
            return Response({"message": "Email sent successfully", "MessageId": response['MessageId']}, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")
            return Response({"error": "Failed to send email", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
    return Response({"message": "GET request received"}, status=status.HTTP_200_OK)