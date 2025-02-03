from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User 
from .Institutional import Asignatura
from .Educational import Criterio
# Modelo de rúbrica
class Rubrica(models.Model):
    anotacion = models.CharField(max_length=600, default="", verbose_name="Anotación")
    imagen = models.ImageField(default='images/rubricas/imgEmpty.png', upload_to='images/rubricas/', verbose_name='Imagen de rúbrica')
    asignatura = models.ForeignKey(Asignatura, on_delete=models.CASCADE, related_name='rubricas')

    class Meta:
        db_table = 'rubrica'
        verbose_name = 'Rúbrica'
        verbose_name_plural = 'Rúbricas'

    def __str__(self):
        return self.descripcion

# Modelo de nivel de desempeño
class Nivel(models.Model):
    nombre = models.CharField(max_length=250, default='', verbose_name="Nombre")
    valorMaximo = models.PositiveIntegerField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(499)],
        verbose_name="Valor máximo",
        help_text="Valor máximo del nivel de desempeño (0-499)."
    )
    valorMinimo = models.PositiveIntegerField(
        default=0,
        validators=[MinValueValidator(1), MaxValueValidator(500)],
        verbose_name="Valor mínimo",
        help_text="Valor mínimo del nivel de desempeño (1-500)."
    )
    color = models.CharField(default='#000000', max_length=7)
    rubrica = models.ForeignKey(Rubrica, on_delete=models.CASCADE, related_name='niveles')
    criterios = models.ManyToManyField('Criterio', through='NivelCriterio', related_name='niveles')

    class Meta:
        db_table = 'Nivel'
        verbose_name = 'Nivel'
        verbose_name_plural = 'Niveles'

    def __str__(self):
        return str(self.id)+' - '+self.nombre

# Modelo intermedio para la relación muchos a muchos entre Nivel y Criterio
class NivelCriterio(models.Model):
    nivel = models.ForeignKey(Nivel, on_delete=models.CASCADE, related_name='nivel_criterios')
    criterio = models.ForeignKey(Criterio, on_delete=models.CASCADE, related_name='nivel_criterios')
    anotacion = models.CharField(max_length=250, default=' ', verbose_name="Anotación")

    class Meta:
        db_table = 'nivel_criterio'
        verbose_name = 'NivelCriterio'
        verbose_name_plural = 'NivelCriterios'

    def __str__(self):
        return 'id ) Criterio :'+str(self.criterio.id)+' - ''id ) Nivel :'+str(self.nivel.id)+' - - '+self.anotacion
