from rest_framework import serializers

from apps.courses.models import Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        exclude = ('state', 'created_date','modified_date','deleted_date') 

    def to_representation(self, instance):
        return {
            "id": instance.id,
            "name": instance.name,
            "description": instance.description,
            "language": instance.language,
            "technology": instance.technology,
            "level": instance.level,
            "price": instance.price,
            "image": instance.image if instance.image != "" else "",
            "link": instance.link,
            "category": instance.category.tipo if instance.category is not None else "",
            "tutor": instance.tutor.__str__() if instance.tutor is not None else "",
        }
    
class CourseretrieverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        exclude = ('state', 'created_date','modified_date','deleted_date') 