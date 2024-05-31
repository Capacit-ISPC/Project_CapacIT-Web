from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from apps.cart.api.serializers.cartItem_serializers import CartItemSerializer, AddCartItemSerializer

from apps.cart.models import CartItem, Cart
from apps.users.permissions import IsStaff, IsSuperUser

class CartItemView(APIView):
    model = CartItem
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.request.method == 'GET':
            permission_classes = [IsAuthenticated]
        elif self.request.method in ['POST', 'PUT', 'PATCH']:
            permission_classes = [IsAuthenticated, IsStaff]
        elif self.request.method == 'DELETE':
            permission_classes = [IsAuthenticated, IsSuperUser]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get(self,request):
        user  = request.user
        cart = Cart.objects.get(user=user)
        cart_items = CartItem.objects.filter(cart_id=cart.id, course_state = True)
        serializer = CartItemSerializer(cart_items , many = True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer = AddCartItemSerializer( data=request.data, context = {"request":request})
        if serializer.is_valid():
            cart_item = serializer.save()
            cart_items = CartItem.objects.filter(cart= cart_item.cart, course_state = True)
            serializer = CartItemSerializer(cart_items, many = True)
            return Response(serializer.data)
        
        else:
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        
    def delete(self,request, cart_item_id=None):
        user = request.user
        if cart_item_id :
            try:
                cart_item = CartItem.objects.get(id=cart_item_id, cart_user = user)
            except CartItem.DoesNotExist:
                return Response({"error": "el curso no existe en el Cart"}, status= status.HTTP_400_BAD_REQUEST)
            
            cart_item.delete()
            return Response({"msj": "Cart eliminado correctamente"}, status= status.HTTP_200)
            
        try:
            cart = Cart.objects.get(user = user)
        except Cart.DoesNotExist:
            return Response({"error": "No existe esta Cart"}, status= status.HTTP_400_BAD_REQUEST)
        
        cart.items.all().delete()
        return Response({"msj": "se eliminaron todos los cursos del Cart"}, status = status.HTTP_200_OK)