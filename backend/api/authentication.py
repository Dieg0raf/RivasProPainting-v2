from rest_framework import authentication, exceptions
from rest_framework.throttling import SimpleRateThrottle
from django.conf import settings
import hmac
import hashlib

class APIClient:
    is_authenticated = True
    
    def __str__(self):
        return "API Client"

class APIKeyThrottle(SimpleRateThrottle):
    rate = '1000/day'
    
    def get_cache_key(self, request, view):
        api_key = request.META.get('HTTP_AUTHORIZATION')
        if not api_key:
            return None
        return f"throttle_api_key_{api_key}"

class APIKeyAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        api_key = request.META.get('HTTP_AUTHORIZATION')
        if not api_key:
            return None
            
        # Compare using constant time comparison
        if not hmac.compare_digest(api_key, settings.API_SECRET_KEY):
            raise exceptions.AuthenticationFailed('Invalid API key')
            
        return (APIClient(), None)