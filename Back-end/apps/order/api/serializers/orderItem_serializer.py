""" from rest_framework import serializers

from apps.courses.api.serializers.courses_serializers import SimpleCourseSerializer
from apps.order.models import OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    course = SimpleCourseSerializer()
    sub_total = serializers.SerializerMethodField(method_name="get_sub_total", read_only=True)

    def get_sub_total(self, obj):
        return obj.course.price
    class Meta:
        model = OrderItem
        fields = (
            'id',
            'course',
            'sub_total',
        ) """