from django.db import models
from apps.base.models import BaseModel
# Create your models here.
class Category(BaseModel):
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

class Tutor(BaseModel):
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
        return f" {self.name} {self.last_name}"

""" class Discount(BaseModel):
    discount_value = models.PositiveSmallIntegerField(default = 0)
    category_course = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name="Descuento para categoria seleccionada")

    class Meta:
        db_table = 'Discount'
        verbose_name = ("Discount")
        verbose_name_plural = ("Discounts")
        ordering = ('id',)

    def __str__(self):
        return f"Discount: {self.discount_value}" """

class Course(BaseModel):
    name = models.CharField(max_length=255)
    description =models.TextField(blank=True)
    language = models.CharField(max_length=255)
    technology = models.CharField(max_length=255)
    level = models.CharField(max_length=255)
    price = models.DecimalField(blank=False, decimal_places=2, max_digits=10)
    #image = models.ImageField(upload_to="products/", blank= True, null=True)
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