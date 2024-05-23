from django.contrib import admin
from apps.courses.models import *
# Register your models here.
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'tipo')

class TutorAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'last_name')

admin.site.register(Course)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Tutor, TutorAdmin)
