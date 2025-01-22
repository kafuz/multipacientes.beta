from django.contrib.auth.models import Group
from django.dispatch import receiver
from django.db.models.signals import post_save
from public.models.UserProfile import Profile
from public.models.Educational import Actividad
from django.core.exceptions import ObjectDoesNotExist, ValidationError

# Signal para agregar un usuario a los grupos de estudiante y profesor al crear un perfil
@receiver(post_save, sender=Profile)
def add_user_to_groups(sender, instance, created, **kwargs):
    if created:
        try:
            preceptor_group, created_preceptor = Group.objects.get_or_create(name='preceptor')
            admin_group, created_admin = Group.objects.get_or_create(name='administrativo')

            # Asignar roles específicos
            #instance.user.is_student = True  # Asigna como estudiante por defecto
            instance.user.save()

            # Agregar el usuario a los grupos correspondientes
            #instance.user.groups.add()
        except Exception as e:
            # Loggear el error si ocurre alguno
            print(str(e))
            
@receiver(post_save, sender=Actividad)
def set_valor_for_saber_hacer(sender, instance, created, **kwargs):
    if created:  # Solo se ejecuta cuando la actividad es creada
        try:
            # Verificar si la actividad pertenece a una dimensión con la descripción 'saber hacer'
            dimension = instance.criterio.dimension
            if dimension.nombre.lower() == 'hacer':
                instance.valor = 500
                instance.np_is = True
                instance.save()  # Guardar los cambios

        except ObjectDoesNotExist as e:
            print(f"Error: {str(e)} - La actividad {instance.id} no tiene una dimensión o criterio asociado válido.")
        except ValidationError as e:
            print(f"Error de validación: {str(e)} al asignar valor a la actividad {instance.id}.")
        except Exception as e:
            print(f"Error inesperado: {str(e)} durante la creación de la actividad {instance.id}.")