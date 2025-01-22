from django.contrib import admin
from public.models.UserProfile import Profile
from public.models.Educational import Dimension, Criterio, Actividad, Calificacion, Monitoreo
from public.models.Rubrica import Rubrica, Nivel, NivelCriterio
from public.models.Institutional import Institucion, Programa, Asignatura, AsignaturaUser
from django.contrib.auth.models import User 


# Administrador detallado para el perfil del usuario
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'address', 'location', 'telephone', 'user_group')
    search_fields = ('location', 'user__username', 'user__groups__name')
    list_filter = ('user__groups', 'location')

    # Método para mostrar los grupos del usuario
    def user_group(self, obj):
        return " - ".join([group.name for group in obj.user.groups.all().order_by('name')])
    user_group.short_description = 'Grupo'

# Registro del modelo Profile con su administrador personalizado
admin.site.register(Profile, ProfileAdmin)

# Registro de otros modelos sin administradores personalizados
admin.site.register(Institucion)
admin.site.register(Programa)
admin.site.register(Asignatura)
admin.site.register(AsignaturaUser)
admin.site.register(Dimension)
admin.site.register(Criterio)
admin.site.register(Actividad)
admin.site.register(Calificacion)
admin.site.register(Monitoreo)

admin.site.register(Rubrica)
admin.site.register(Nivel)
admin.site.register(NivelCriterio)

