from rest_framework import serializers

from apps.courses.models import Course

class CourseSerializer(serializers.ModelSerializer):
    #image = serializers.ImageField(required=False)
    class Meta:
        model = Course
        exclude = ('state', 'created_date','modified_date','deleted_date') 

    def validate_category(self, value):
        if value == "" or value == None:
            raise serializers.ValidationError("Debe ingresar una categoria para el curso")
        return value
    
    def validate_tutor(self, value):
        if value == "" or value == None:
            raise serializers.ValidationError("Debe ingresar un tutor para el curso")
        return value
    
    def validate(self, data):
        if "category" not in data.keys():
            raise serializers.ValidationError({'category': "Debe ingresar el id de la categoria"})
        
        if "tutor" not in data.keys():
            raise serializers.ValidationError({'tutor': "Debe ingresar el id del tutor"})
        return data                              

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "name": instance.name,
            "description": instance.description,
            "language": instance.language,
            "technology": instance.technology,
            "level": instance.level,
            "price": instance.price,
            #"image": instance.image.url if instance.image != "" else "",
            "link": instance.link,
            "category": instance.category.tipo if instance.category is not None else "",
            "tutor": instance.tutor.__str__() if instance.tutor is not None else "",
        }
    
class CourseretrieverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        exclude = ('state', 'created_date','modified_date','deleted_date') 