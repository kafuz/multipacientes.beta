from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User 
from .Institutional import Asignatura, AsignaturaUser
# Modelo de dimensión en una asignatura
class Dimension(models.Model):
    is_active = models.BooleanField(default=True)
    nombre = models.CharField(max_length=30, verbose_name="Nombre")
    valor = models.PositiveIntegerField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(500)],
        help_text="Valor de la dimensión (0-500)."
    )
    asignatura = models.ForeignKey(Asignatura, on_delete=models.CASCADE, related_name='dimensiones')

    class Meta:
        db_table = 'dimension'
        verbose_name = 'Dimensión'
        verbose_name_plural = 'Dimensiones'

    def __str__(self):
        return self.nombre

# Modelo de criterio
class Criterio(models.Model):
    is_active = models.BooleanField(default=False)
    nombre = models.CharField(max_length=30, verbose_name="Nombre")
    valor = models.PositiveIntegerField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(500)],
        help_text="Valor del criterio (0-500)."
    )
    dimension = models.ForeignKey(Dimension, on_delete=models.CASCADE, related_name='criterios')

    class Meta:
        db_table = 'criterio'
        verbose_name = 'Criterio'
        verbose_name_plural = 'Criterios'

    def __str__(self):
        return self.nombre

# Modelo de nonitoreo académico
class Monitoreo(models.Model):
    nombre = models.CharField(max_length=30, default='Predeterminado', verbose_name="Nombre")
    color = models.CharField(default='#000000', max_length=7)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    asignatura = models.ForeignKey(Asignatura, on_delete=models.CASCADE, related_name='Monitoreos')

    class Meta:
        db_table = 'Monitoreo'
        verbose_name = 'Monitoreo'
        verbose_name_plural = 'Monitoreos'

    def __str__(self):
        return self.nombre

# Modelo de actividad asociada a un criterio y monitoreo
class Actividad(models.Model):
    is_active = models.BooleanField(default=False)
    nombre = models.CharField(max_length=30, verbose_name="Nombre")
    valor = models.PositiveIntegerField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(500)],
        help_text="Valor de la actividad (0-500)."
    )
    multiplicador = models.PositiveIntegerField(
        default=1,
        validators=[MinValueValidator(1)],
        verbose_name="Multiplicador"
    )
    np_is = models.BooleanField(default=False)
    nivel_pertinencia = models.PositiveIntegerField(
        default=1,
        validators=[MinValueValidator(1)],
        verbose_name="Nivel de pertinencia"
    )
    criterio = models.ForeignKey(Criterio, on_delete=models.CASCADE, related_name='actividades')
    monitoreo = models.ForeignKey(Monitoreo, on_delete=models.SET_NULL, null=True, blank=True, related_name='actividades')

    class Meta:
        db_table = 'actividad'
        verbose_name = 'Actividad'
        verbose_name_plural = 'Actividades'

    def __str__(self):
        return self.nombre

# Modelo de calificación
class Calificacion(models.Model):
    valor = models.PositiveIntegerField(
        validators=[MinValueValidator(0)],
        verbose_name="Valor"
    )
    descripcion = models.CharField(max_length=30, null=True, verbose_name="Descripción")
    anotacion = models.CharField(max_length=100, null=True, verbose_name="Anotación")
    actividad = models.ForeignKey(Actividad, on_delete=models.CASCADE, related_name='calificaciones')
    asignaturaUser = models.ForeignKey(AsignaturaUser, on_delete=models.CASCADE)

    class Meta:
        db_table = 'calificacion'
        verbose_name = 'Calificación'
        verbose_name_plural = 'Calificaciones'

    def __str__(self):
        return f"Calificación {self.valor}: {self.descripcion}"
