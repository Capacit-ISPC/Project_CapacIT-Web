from django.urls import path
from apps.order.api.views.order_view import OrderAPIView
urlpatterns = [
    # la lista de órdenes y crear una nueva orden. Lista de todas las ordenes(no es necesario enviar el id)
    path('orders/', OrderAPIView.as_view(), name='order-list'),
    # obtener orden por id, actualizar y actualizar parcialmente y eliminar una orden específica. Siempre mandar id de la orden
    path('orders/<int:pk>/', OrderAPIView.as_view(), name='order-detail'),
    
]