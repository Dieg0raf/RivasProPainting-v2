from django.urls import path
from api import views
from django.conf import settings

# Only endpoint available in production
urlpatterns = [ 
    path('images/', views.ImageList, name='image-list'),
]

# Add the temporary signup endpoint if DEBUG is enabled (disabled forever - was only for testing)
# if settings.DEBUG:
#     urlpatterns += [
#         path('protected/signup/', views.TempSignUp, name='temp-signup'),
#         path('protected/upload-bulk/', views.BulkImageUpload, name='upload-bulk'),
#     ]