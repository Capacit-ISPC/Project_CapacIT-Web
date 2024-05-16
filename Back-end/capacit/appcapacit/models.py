from django.conf import settings
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin
)

class UserManager(BaseUserManager):
    """Manager for users."""

    def create_user(self, email, password=None, **extra_fields):
        """Create, save and return a new user."""
        if not email:
            raise ValueError('User must have an email address')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user
    
    def create_superuser(self, email, password):
        """Create and return a new superuser"""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)


class User(AbstractBaseUser, PermissionsMixin):
    """User in the system"""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'


class Category(models.Model):
    class TipoCategoria(models.TextChoices):
        BACKEND = 'backend', 'Backend'
        FRONTEND = 'frontend', 'Frontend'

    tipo = models.CharField(
        max_length=10,
        choices=TipoCategoria.choices,
        default=TipoCategoria.BACKEND,
    )
    description = models.TextField(max_length=100, blank=False, default="programacion")
    class Meta:
        db_table = 'Categoria'
        verbose_name = ('Categoria')
        verbose_name_plural = ('Categorias')
        ordering = ('id',)

    def __str__(self):
        return self.tipo

class Tutor(models.Model):
    name = models.CharField(max_length=50, blank= True)
    last_name = models.CharField(max_length=50)
    phone = models.CharField(max_length=15)
    email =models.EmailField(unique=True)

    class Meta:
        db_table = 'Tutor'
        verbose_name = ('Tutor')
        verbose_name_plural = ('Tutores')
        ordering = ('id',)

    def __str__(self):
        return f"Profsor: {self.name}, {self.last_name}"


class Course(models.Model):
    name = models.CharField(max_length=255)
    description =models.TextField(blank=True)
    language = models.CharField(max_length=255)
    technology = models.CharField(max_length=255)
    level = models.CharField(max_length=255)
    price = models.DecimalField(blank=False, decimal_places=2, max_digits=10)
    link = models.CharField(max_length=255, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)  
    tutor = models.ForeignKey(Tutor, on_delete=models.CASCADE)

    class Meta:
        db_table = 'Course'
        verbose_name = ('Course')
        verbose_name_plural = ('Courses')
        ordering = ('id',)

    def __str__(self):
        return f"cours: {self.name}. tutor:{self.tutor}"
































 










# class Curso(models.Model):
#     name = models.CharField(max_length=100, blank=False)
#     description = models.TextField(max_length=1000, blank=False)
#     language = models.CharField(max_length=50, blank=False)
#     technology = models.CharField(max_length=100, blank=False)
#     level = models.CharField(max_length=100, blank=False)
#     value = models.DecimalField(max_length=10, blank=False, decimal_places=2, max_digits=10)
#     teacher_name = models.CharField(max_length=100, blank=False)
#     class Meta:
#         db_table = "Curso"
#         verbose_name="Cursos en venta"
#         verbose_name_plural="Cursos"
#     def __unicode__(self):
#         return self.nombre
#     def __str__(self):
#         return self.nombre   


# class Sale(models.Model):
#     id_sale = models.AutoField(primary_key=True)
#     state = models.CharField(max_length= 50, null=True, help_text="Ingrese el estado de la compra" )
#     discount = models.FloatField(help_text="Descuento")
#     value = models.FloatField(null=False)
#     id_student = models.ForeignKey("Student", on_delete=models.CASCADE)
#     id_course = models.ForeignKey("Course", on_delete=models.CASCADE)
#     id_teacher = models.ForeignKey("Teacher", on_delete=models.CASCADE)

#     def __str__(self):
#         return "{}".format(self.id_sale)

# class Payment(models.Model):
#     id_payment = models.AutoField(primary_key=True)
#     date = models.DateField(null=False, auto_now_add=True)
#     total = models.FloatField(null=False)
#     id_sale = models.ForeignKey("Sale", on_delete=models.CASCADE)

#     def __str__(self):
#         return "{} {}".format(self.id_payment, self.date)




