from rest_framework import authentication
from rest_framework import exceptions
from django.conf import settings
import hmac
import hashlib

class APIClient:
    is_authenticated = True

class APIKeyAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        api_key = request.META.get('HTTP_AUTHORIZATION')

        if not api_key:
            return None

        # Compare using constant time comparison
        if not hmac.compare_digest(api_key, settings.API_SECRET_KEY):
            raise exceptions.AuthenticationFailed('Invalid API key')

        # Needed to return a tuple of the authenticated user and the API key (django requirement)
        return (APIClient(), None)