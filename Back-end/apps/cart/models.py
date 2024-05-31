from django.db import models
from apps.base.models import BaseModel

from apps.courses.models import Course
from django.conf import settings
# Create your models here.

class Cart(BaseModel):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    total_items = models.IntegerField(default=0)
    total = models.DecimalField(default=0, decimal_places=2, max_digits=10)

    class Meta:
        verbose_name = 'Cart'
        verbose_name_plural = 'Carts'
        ordering = ('id',)

    def __str__(self):
        return self.user.name
    
    def update_totals(self):
        self.total_items = self.items.count()
        self.total = sum(item.sub_total for item in self.items.all())
        self.save()

    
class CartItem(BaseModel):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="cartItems")
    sub_total = models.DecimalField(max_digits= 10, decimal_places=2, default=0)

    class Meta:
        verbose_name = 'CartItem'
        verbose_name_plural = 'CartsItems'
        ordering = ('id',)

    def save(self, *args, **kwargs):
        self.sub_total = self.course.price
        super().save(*args, **kwargs)
        self.cart.update_totals()

    def delete(self, *args, **kwargs):
        super().delete(*args, **kwargs)
        self.cart.update_totals()

