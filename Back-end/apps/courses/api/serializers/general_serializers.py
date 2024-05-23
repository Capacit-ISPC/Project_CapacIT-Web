from rest_framework import serializers

from apps.courses.models import Category, Tutor

class TutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutor
        exclude = ('state', 'created_date','modified_date','deleted_date') 

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        exclude = ('state', 'created_date','modified_date','deleted_date') 