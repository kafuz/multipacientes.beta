from django.db import models
from django.contrib.auth.models import User 
from django.db.models.signals import post_save
from django.dispatch import receiver

# Modelo de perfil de usuario con relación uno a uno a User
class Profile(models.Model):
    """Perfil del usuario, extendiendo datos adicionales como avatar, dirección, etc."""
    
    # Relación uno a uno con User
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profile',
        verbose_name='Usuario'
    )
    
    # Campos adicionales
    avatar = models.ImageField(
        default='images/users/user.png',
        upload_to='images/users/',
        verbose_name='Imagen de perfil'
    )
    address = models.CharField(
        max_length=150,
        null=True,
        blank=True,
        verbose_name='Dirección'
    )
    location = models.CharField(
        max_length=150,
        null=True,
        blank=True,
        verbose_name='Localidad'
    )
    telephone = models.CharField(
        max_length=50,
        null=True,
        blank=True,
        verbose_name='Teléfono'
    )
    
    # Opciones de sexo
    SEXO_CHOICES = [
        ('M', 'Masculino'),
        ('F', 'Femenino'),
        ('O', 'Otro'),
    ]
    sexo = models.CharField(
        max_length=1,
        choices=SEXO_CHOICES,
        verbose_name='Sexo',
        null=True,
        blank=True
    )

    class Meta:
        verbose_name = 'perfil'
        verbose_name_plural = 'perfiles'
        ordering = ['-id']

    def __str__(self):
        return self.user.username

# Signal para manejar la creación automática del perfil cuando se crea un User
@receiver(post_save, sender=User)
def manage_user_profile(sender, instance, created, **kwargs):
    """
    Signal handler para gestionar la creación y actualización de perfiles de usuario.
    Crea un perfil nuevo si el usuario es recién creado, o actualiza el perfil existente.
    """
    try:
        if created:
            # Crear un perfil automáticamente si el usuario fue recién creado
            Profile.objects.create(user=instance)
        else:
            # Guardar el perfil asociado si el usuario ya existía
            instance.profile.save()
    except Exception as e:
        # Manejo robusto de excepciones, logueando cualquier error que pueda ocurrir
        print(f"Error al manejar el perfil de usuario: {str(e)}")
