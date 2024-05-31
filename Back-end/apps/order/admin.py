from django.contrib import admin
from apps.order.models import Order
# Register your models here.

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'status', 'user', 'get_cart_items', 'get_total')  

    def get_cart_items(self, obj):
        return [item.course.name for item in obj.cart.items.all()]  

    def get_total(self, obj):
        return "$  {}".format(obj.get_total())

    def cart_items_display(self, obj):
        items = self.get_cart_items(obj)
        return '<br>'.join(items)

    cart_items_display.allow_tags = True  
    cart_items_display.short_description = 'Cart Items' 
    get_total.short_description = 'Total'  

admin.site.register(Order, OrderAdmin)



""" class OrderItemInline(admin.TabularInline):
    model = OrderItem
    readonly_fields = ('course', 'sub_total')
    can_delete = False
    extra = 0

    def sub_total(self, obj):
        return obj.course.price
    sub_total.short_description = 'Course Price'

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'status', 'payment', 'delivered', 'order_total', 'order_total_items')
    search_fields = ('user__username', 'status')
    list_filter = ('status', 'payment', 'delivered')
    inlines = [OrderItemInline]
    
    def order_total(self, obj):
        return sum(item.course.price for item in obj.order_items.all())
    order_total.short_description = 'Total Price'

    def order_total_items(self, obj):
        return obj.order_items.count()
    order_total_items.short_description = 'Total Items' """


#admin.site.register(OrderItem)
