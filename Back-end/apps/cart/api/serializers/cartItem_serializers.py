from rest_framework import serializers

from apps.cart.models import CartItem, Cart
from apps.courses.models import Course
from apps.courses.api.serializers.courses_serializers import SimpleCourseSerializer

class CartItemSerializer(serializers.ModelSerializer):
    course = SimpleCourseSerializer(many=False)
    precio_curso = serializers.CharField(source = 'sub_total', read_only=True)
    class Meta:
        model = CartItem
        fields = ('id', 'cart', 'course', 'precio_curso')

class AddCartItemSerializer(serializers.Serializer):
    course_id = serializers.IntegerField()

    def validate_course_id(self, value):
        try:
            course = Course.objects.get(id=value)
            if not course.state:
                raise serializers.ValidationError("El curso no está disponible.")
        except Course.DoesNotExist:
            raise serializers.ValidationError("El curso no existe.")
        return value

    def create(self, validated_data):
        user = self.context['request'].user
        cart, created = Cart.objects.get_or_create(user=user)
        course_id = validated_data['course_id']

        cart_item, created = CartItem.objects.get_or_create(cart=cart, course_id=course_id)
        cart.update_totals()
        
        return cart_item