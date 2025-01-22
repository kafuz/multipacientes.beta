from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import app, groups, entities, rubric

urlpatterns =[
# <individual>
    path('start/<int:fk>', app.index, name="index_lobby"), 
    path('start/alumnos/search',                    groups.search.GET_Alumnos),  
    path('informacion/periodica/get/<int:id>', groups.GET_Individual),
    path('informacion/global/get/<int:id>',    groups.GET_Grupal),
# <User>
    path('user/get/<int:id>',   entities.order.User.GET_THIS), 
    path('alumno/get/<int:id>', entities.order.User.GET), 
# <asignaturaUsers>
    path('asignaturaUser/post',   entities.order.AsignaturasUsers.POST,), 
    path('asignaturaUser/delete', entities.order.AsignaturasUsers.DELETE,), 
    path('asignaturaUser/put',    entities.Signals.update__asignatura,), 
# <calificacion>
    path('calificacion/gets/<int:id_user>/<int:id_actividad>', entities.Calificaciones.GETS), 
    path('calificacion/put',                                   entities.Calificaciones.PUT,), 
# <monitoreo>
    path('monitoreo/actividades/get/<int:id>', entities.Actividades.GETSP), 
    path('monitoreo/actividades/delete',       entities.Actividades.DELETEP), 
# <rubrica>
    
    path('rubrica/get/<int:id>', groups.rubrica.GET),
    path('rubrica/put',          rubric.Rubricas.PUT),
    path('rubrica/put/imagen',   rubric.Rubricas.PUT_IMG,),
    path('nivel/post',           rubric.Niveles.POST),
    path('nivel/put',            rubric.Niveles.PUT),
    path('nivel/delete',         rubric.Niveles.DELETE),
    path('nivelCriterio/put',    rubric.NivelesCriterios.PUT),
]

#Multiples
entidades=[
    {'name':'dimension', 'obj' : entities.Dimensiones}, 
    {'name':'criterio',  'obj' : entities.Criterios},
    {'name':'actividad', 'obj' : entities.Actividades},
    {'name':'monitoreo',   'obj' : entities.Monitoreos},
]

for inv in entidades:
    urlpatterns+=[
        path(inv['name']+'/get/<int:id>',  inv['obj'].GET,    name='get__'+inv['name']),
        path(inv['name']+'/gets/<int:fk>', inv['obj'].GETS,   name='gets__'+inv['name']), 
        path(inv['name']+'/post',          inv['obj'].POST,   name='create__'+inv['name']), 
        path(inv['name']+'/delete',        inv['obj'].DELETE, name='delete__'+inv['name']), 
        path(inv['name']+'/put',           inv['obj'].PUT,    name='update__'+inv['name']), 
    ]

# Agrega la configuración para servir archivos de medios estáticos
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)









"""
entidades=[ {'name':'estudiante', 'obj' : estudiante},  {'name':'dimension', 'obj' : dimension}, ]
for inv in entidades:
    urlpatterns+=[
        path(inv['name']+'/get/<int:id>',  inv['obj'].GET,    name='get__'+inv['name']),
        path(inv['name']+'/gets/<int:fk>', inv['obj'].GETS,   name='gets__'+inv['name']), 
        path(inv['name']+'/post',          inv['obj'].POST,   name='create__'+inv['name']), 
        path(inv['name']+'/delete',        inv['obj'].DELETE, name='delete__'+inv['name']), 
        path(inv['name']+'/put',           inv['obj'].PUT,    name='update__'+inv['name']), 
    ]
"""