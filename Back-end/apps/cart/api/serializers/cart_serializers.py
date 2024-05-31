from rest_framework import serializers
from apps.cart.models import Cart
from apps.cart.api.serializers.cartItem_serializers import CartItemSerializer
from apps.users.api.serializers import CurstomUserCartSerialier


class CartSerializer(serializers.ModelSerializer):
    user = CurstomUserCartSerialier(many=False, read_only=True)
    items = CartItemSerializer(many=True, read_only=True)
    total_items = serializers.IntegerField(read_only=True)
    total = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Cart
        fields = ('id', 'user', 'items', 'total_items', 'total')

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['total_items'] = instance.items.count()
        representation['total'] = sum(item.sub_total for item in instance.items.all())
        return representation

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return super().create(validated_data)