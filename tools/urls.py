from django.urls import path, include
from . import views

urlpatterns =[
    path('', views.index, name="index__tools"),       
    path('moyers/', views.viewMoyers, name="index__moyers"),                                       
]
