from django.urls import path
from api import views

urlpatterns = [ 
    path('images/', views.ImageList.as_view(), name='image-list'),
]