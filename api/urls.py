from django.urls import path
from . import views
urlpatterns = [
    path('listWords/', views.listWords,name='listWords'),
    path('readWord/<str:word_string>/',views.readWord,name='readWord'),
    path('createWord/',views.createWord,name='createWord'),
    path('updateWord/<str:pk>/',views.updateWord,name='updateWord'),
    path('deleteWord/<str:pk>/',views.deleteWord,name='deleteWord'),
   
]