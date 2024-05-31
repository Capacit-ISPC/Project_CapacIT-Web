from django.db import models

from apps.base.models import BaseModel
from apps.courses.models import Course
from apps.cart.models import Cart
from django.conf import settings
# Create your models here.

class Order(BaseModel):

    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        COMPLETED = 'COMPLETED', 'Completed'

    status = models.CharField(max_length=50, choices=Status.choices, default=Status.PENDING)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    payment = models.BooleanField(default= False)
    delivered = models.BooleanField(default= False)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, null=True)
    class Meta:
        db_table = 'Order'
        verbose_name = ("Order")
        verbose_name_plural = ("Orders")
        ordering = ('id',)


    def __str__(self):
        return f"Order ID: {self.id}-- Estado: {self.status}-- Comprador: {self.user}"
    

    def get_total(self):
        # Implementa la lógica para calcular el total aquí.
        return sum(item.course.price for item in self.cart.items.all())


    def get_item_count(self):
        return self.cart.items.count()

