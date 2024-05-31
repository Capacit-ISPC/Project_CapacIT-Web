from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
#from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from apps.cart.api.serializers.cart_serializers import CartSerializer

from apps.cart.models import Cart
from apps.users.permissions import IsStaff, IsSuperUser

class CartView(APIView):
    models = Cart
    permission_classes = (IsAuthenticated,)

    def get(self,request):
        user= request.user
        try:
            cart = Cart.objects.get(user=user)
            serializer = CartSerializer(cart)
            return Response(serializer.data)
        except Cart.DoesNotExist:
            return Response({"error": "El usuario no tiene una cart asignada"}, status= status.HTTP_404_NOT_FOUND)