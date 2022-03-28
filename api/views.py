from django.shortcuts import render,HttpResponseRedirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serialisers import WordSerializer
from  wordapp.models import word_list

# Create your views here.

@api_view(['GET'])
def listWords(request):
    """Displaying list of Words in the database"""
    words = word_list.objects.all().order_by('id')
    serializer_class = WordSerializer(words,many=True)
    return Response(serializer_class.data)


@api_view(['GET'])
def readWord(request,word_string):
    """Reading Word based on primary key"""
    try:
        words = word_list.objects.filter(word__contains=word_string)
        serialiser_class = WordSerializer(words,many=True)
        return Response(serialiser_class.data)        
    except Exception as e:
         return Response({'status':str(e)})


@api_view(['POST'])
def createWord(request):
    """Using POST Method to create word"""
    serialiser_class = WordSerializer(data=request.data)
    if serialiser_class.is_valid():
        serialiser_class.save()

    return HttpResponseRedirect("/wordapp/")


@api_view(['POST'])
def updateWord(request,pk):
    word = word_list.objects.get(id=pk)
    serialiser_class = WordSerializer(instance=word,data=request.data)
    if serialiser_class.is_valid():
        serialiser_class.save()
    return Response(serialiser_class.data)


@api_view(['DELETE'])
def deleteWord(request,pk):
    word = word_list.objects.get(id=pk)
    word.delete()
    return Response({'status':'Deleted!'})
