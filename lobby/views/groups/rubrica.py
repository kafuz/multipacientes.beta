from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from public.decorators.book import teacher_required 

from public.models.Rubrica import Rubrica, Nivel, NivelCriterio
from public.models.Educational import Dimension, Criterio
from public import serializados

MAXIMO_PUNTAJE=500

@login_required
@teacher_required
@require_http_methods(["GET"])
def GET(request, id):
    try:
        asignatura_id = request.session.get('id-asignatura')
        rubr = Rubrica.objects.filter(asignatura_id=asignatura_id).first()
        niveles = Nivel.objects.filter(rubrica=rubr).order_by('valorMinimo', 'valorMaximo')

        # Obtener dimensiones y criterios con prefetch_related para optimizar consultas
        dimensiones = Dimension.objects.filter(asignatura_id=asignatura_id, is_active=True).select_related('asignatura')
        criterios = Criterio.objects.filter(dimension__in=dimensiones).select_related('dimension')

        # Crear un diccionario para almacenar los datos
        dim_data = []

        for dim in dimensiones:
            # Obtener criterios relacionados con la dimensión
            crit_data = []
            for crit in criterios.filter(dimension=dim):
                # Obtener niveles relacionados con el criterio
                niv_data = []
                for niv in niveles:
                    # Obtener los datos de NivelCriterio para el criterio y el nivel
                    nivel_criterios = NivelCriterio.objects.filter(criterio=crit, nivel=niv).values('id', 'anotacion', 'nivel')
                    for nivel_criterio in nivel_criterios:
                        niv_data.append(nivel_criterio)

                crit_data.append({
                    'id': crit.id,
                    'nombre': crit.nombre,
                    'niveles': niv_data
                })

            dim_data.append({
                'id': dim.id,
                'nombre': dim.nombre,
                'criterios': crit_data
            })


        data={ 
                'rubrica':
                {
                    'id':rubr.id,
                    'anotacion': rubr.anotacion, 
                    'imagen': rubr.imagen.url,
                    'niveles': [serializados.nivel(nivel) for nivel in niveles],
                },  
                'dimensiones': dim_data 
             }
        #print(data)
        return JsonResponse({'message': "success", 'response': data})
    except Exception as e:
        print(e)
        return JsonResponse({'message': "error", 'response': str(e)}, status=500)
