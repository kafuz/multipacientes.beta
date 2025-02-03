from django.urls import path, include
from .views import  institucion, programa, asignatura

urlpatterns =[
    path('institucion/index',           institucion.index_institucion,  name="index__institucion"),
    path('institucion/get/<int:id>',    institucion.get_institucion,    name="get__institucion"), 
    path('institucion/create',          institucion.create_institucion, name="create__institucion"),
    path('institucion/update/<int:id>', institucion.update_institucion, name="update__institucion"),
    path('institucion/delete',          institucion.delete_institucion, name="delete__institucion"),        

    
    path('programa/index/<int:fk>',  programa.index_programa, name="index__programa"),   
    path('programa/index',           programa.reload_programa,name="reload__programa"), 
    path('programa/get/<int:id>',    programa.get_programa,name="get__programa"),  
    path('programa/create',          programa.create_programa,name="create__programa"),       
    path('programa/update/<int:id>', programa.update_programa,name="update__programa"), 
    path('programa/delete',          programa.delete_programa,name="delete__programa"), 

    path('asignatura/index/<int:fk>',  asignatura.index_asignatura, name="index__asignatura"),   
    path('asignatura/index',           asignatura.reload_asignatura,name="reload__asignatura"), 
    path('asignatura/get/<int:id>',    asignatura.get_asignatura,   name="get__asignatura"),  
    path('asignatura/create',          asignatura.create_asignatura,name="create__asignatura"),  
    path('asignatura/update/<int:id>', asignatura.update_asignatura,name="update__asignatura"),  
    path('asignatura/delete',          asignatura.delete_asignatura,name="delete__asignatura"),    
    path('asignatura/clone', asignatura.clonar_asignatura_view ,    name="clone__asignatura"),                                  
]
