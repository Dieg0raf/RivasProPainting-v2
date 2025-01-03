from django.urls import path
from api import views

urlpatterns = [ 
    path('images/', views.ImageList, name='image-list'),
]