from django.contrib import admin

from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from .models import Curso

# Register your models here.

class CursoAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "language", "technology", "level", "value","teacher_name")


@admin.register(get_user_model())
class CustomUserAdmin(UserAdmin):
    pass
admin.site.register(Curso,CursoAdmin)

