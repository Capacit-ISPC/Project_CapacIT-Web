from django.contrib import admin
from apps.cart.models import Cart, CartItem

class CartItemInline(admin.TabularInline):
    model = CartItem
    readonly_fields = ('sub_total',)
    extra = 0

class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'total_items', 'total')
    readonly_fields = ('total_items', 'total')
    inlines = [CartItemInline]

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        obj.update_totals()

    def delete_model(self, request, obj):
        obj.delete()
        obj.update_totals()

admin.site.register(Cart)
admin.site.register(CartItem)