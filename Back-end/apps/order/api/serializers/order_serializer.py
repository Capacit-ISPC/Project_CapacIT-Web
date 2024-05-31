from rest_framework import serializers
from apps.order.models import Order
#from apps.order.api.serializers.orderItem_serializer import OrderItemSerializer
from apps.users.api.serializers import CustomUserSerializer
from apps.cart.api.serializers.cart_serializers import CartSerializer


class OrderSerializer(serializers.ModelSerializer):
    cart = CartSerializer(read_only=True)
    total = serializers.SerializerMethodField(method_name="get_total", read_only=True)
    item_totales = serializers.SerializerMethodField(method_name="get_item_count", read_only=True)
    user_name = serializers.SerializerMethodField(method_name="get_user_name")
    def get_total(self, obj):
        return obj.get_total()
    
    def get_item_count(self, obj):
        return obj.get_item_count()
    
    def get_user_name(self, obj):
        return obj.user.name 
    class Meta:
        model = Order
        fields = ('id','user_name','status', 'payment', 'delivered', 'cart', 'total', 'item_totales',)



""" class OrderSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    order_items = OrderItemSerializer(many=True, read_only=True)
    order_total_items = serializers.SerializerMethodField(method_name="get_order_total_items", read_only=True)
    order_total = serializers.SerializerMethodField(method_name="get_order_total", read_only=True)

    def get_order_total_items(self, obj):
        return obj.order_total_items.count()

    def get_order_total(self, obj):
        total = sum(item.course.price for item in obj.items.all())
        return total
    class Meta:
        model = Order
        fields = "__all__" """