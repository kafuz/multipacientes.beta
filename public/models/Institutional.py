from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User 


# Modelo de institución educativa
class Institucion(models.Model):
    is_active = models.BooleanField(default=True)
    nombre = models.CharField(max_length=30, verbose_name="Nombre")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='instituciones')

    class Meta:
        db_table = 'institucion'
        verbose_name = 'Institución'
        verbose_name_plural = 'Instituciones'

    def __str__(self):
        return self.nombre

# Modelo de programa académico asociado a una institución
class Programa(models.Model):
    is_active = models.BooleanField(default=True)
    nombre = models.CharField(max_length=30, verbose_name="Nombre")
    institucion = models.ForeignKey(Institucion, on_delete=models.CASCADE, related_name='programas')

    class Meta:
        db_table = 'programa'
        verbose_name = 'Programa'
        verbose_name_plural = 'Programas'

    def __str__(self):
        return self.nombre

# Modelo de asignatura
class Asignatura(models.Model):
    is_active = models.BooleanField(default=True)
    nombre = models.CharField(max_length=30, verbose_name="Nombre")
    programa = models.ForeignKey(Programa, on_delete=models.CASCADE, related_name='asignaturas')
    user = models.ManyToManyField(User, through='AsignaturaUser', related_name='asignaturas')

    class Meta:
        db_table = 'asignatura'
        verbose_name = 'Asignatura'
        verbose_name_plural = 'Asignaturas'

    def __str__(self):
        return self.nombre
    
# Modelo intermedio entre Asignatura y user
class AsignaturaUser(models.Model):
    asignatura = models.ForeignKey(Asignatura, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)