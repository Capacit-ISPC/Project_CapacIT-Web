from django.urls import path

from apps.cart.api.views.cartItem_views import CartItemView
from apps.cart.api.views.cart_views import CartView

urlpatterns = [
    path("cart/", CartView.as_view(), name="cart"),
    path("cart/items/", CartItemView.as_view(), name="cart-item"),
    path("cart/items/<int:cart_item_id>/", CartItemView.as_view(), name="cart-item"),
]