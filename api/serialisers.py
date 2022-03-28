from rest_framework import serializers
from wordapp.models import word_list
class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = word_list
        fields='__all__'

