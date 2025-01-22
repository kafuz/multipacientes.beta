from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.shortcuts import  get_object_or_404
import json

from public.decorators.book import teacher_required 
from public.models.Educational import Criterio
from public.models.Rubrica import Nivel, NivelCriterio

MAXIMO_PUNTAJE=500

@login_required
@teacher_required
@require_http_methods(["POST"])
def POST(request):
    try:
        body = json.loads(request.body)
        # Extrae los datos JSON desde request.POST (en lugar de request.body)
        print(body)
        nombre = body.get('nombre')
        valorMinimo = int( body.get('valorMinimo') )
        valorMaximo = int( body.get('valorMaximo') )
        color = body.get('color')
        fk = body.get('fk')
        
        if not nombre:
            raise ValueError('Campo nombre es requerido.')
        
        if valorMinimo is None:
            raise ValueError('Campo valor minimo es requerido.')
        else: 
            if valorMinimo >= 0 and valorMinimo <= MAXIMO_PUNTAJE:
                if valorMinimo > valorMaximo :
                   raise ValueError('Campo valor minimo no puede ser mayor o igual al valor maximo.')
            else:
                raise ValueError('Campo valor minimo no puede estar fuera de rango 0 a '+str(MAXIMO_PUNTAJE))
            
        if valorMinimo is None:
            raise ValueError('Campo valor maximo es requerido.')
       
        if not fk:
            raise ValueError('Llave foránea es requerida.')

        # Crear el objeto usando los datos recibidos
        obj = Nivel.objects.create(nombre=nombre, valorMaximo=valorMaximo, valorMinimo=valorMinimo, color=color, rubrica_id= fk)

        # Agregar a criterios
        id_asignatura = request.session.get('id-asignatura')
        if id_asignatura is None:
            ValueError('ID de asignatura en sesión no encontrado.')

        criterios = Criterio.objects.filter(dimension__asignatura__id=id_asignatura)
        for cri in criterios:
            NivelCriterio.objects.create(nivel=obj, criterio=cri)
 
        # Retornar respuesta en formato JSON
        return JsonResponse({'message': 'success', 'response':'ok'})
    except (ValueError, TypeError) as e:
        return JsonResponse({'message': 'error', 'response': str(e)})
    except Exception as e:
        print(e)
        return JsonResponse({'message': 'error', 'response': 'Ocurrió un error inesperado.'}, status=500)


@login_required
@teacher_required
@require_http_methods(["PUT"])
def PUT(request):
    try:
        BODY = json.loads(request.body)
        id_instancia = BODY.get('id')
        # <-> variables 
        anotacion = BODY.get('anotacion')
        valorMinimo = int( BODY.get('valorMinimo') )
        valorMaximo = int( BODY.get('valorMaximo') )
        color = BODY.get('color')

        if not id_instancia: raise ValueError('ID del nivel es requerido.')
        Instancia = get_object_or_404(Nivel, id=id_instancia)

        if 'anotacion' in BODY:
            if anotacion!="": 
                Instancia.anotacion=anotacion
            else: raise ValueError('La anotacion no puede estar vacia')

        if 'valorMinimo' in BODY :
            if valorMinimo >= 0 and valorMinimo <= MAXIMO_PUNTAJE:
                if valorMinimo < ( valorMaximo if valorMaximo is not None else Instancia.valorMaximo):
                    Instancia.valorMinimo=valorMinimo
                else: raise ValueError('El valor minimo no puede ser mayor o igual al valor maximo.')
            else: raise ValueError('El valor minimo no puede estar fuera de rango 0 a '+str(MAXIMO_PUNTAJE))
            
        if 'valorMaximo' in BODY :
            if valorMaximo >= 0 and valorMaximo <= MAXIMO_PUNTAJE:
                if valorMaximo > ( valorMinimo if valorMinimo is not None else Instancia.valorMinimo):
                    Instancia.valorMaximo=valorMaximo
                else: raise ValueError('El valor maximo no puede ser menor o igual al valor minimo.')
            else: raise ValueError('El valor maximo no puede estar fuera de rango 0 a '+str(MAXIMO_PUNTAJE))
        
        if 'color' in BODY:
            Instancia.color=color
        
        Instancia.save()  # Guarda los cambios
        return JsonResponse({'message': 'success', 'response': 'ok'})
    
    except (ValueError, TypeError) as e:
        return JsonResponse({'message': 'error', 'response': str(e)})
    except Exception as e:
        print(e)
        return JsonResponse({'message': 'error', 'response': 'Ocurrió un error inesperado.'}, status=500)

@login_required
@teacher_required
@require_http_methods(["DELETE"])
def DELETE(request):
    try:
        instancia_id = json.loads(request.body).get('id')
        if not instancia_id:
            raise ValueError('ID del Nivel es requerido.')

        # Intentar eliminar la actividad
        deleted_count, _ = Nivel.objects.filter(id=instancia_id).delete()
        
        if not deleted_count:
            raise ValueError('Nivel no encontrada.')

        return JsonResponse({'message': 'success', 'response': 'ok'})
    
    except (ValueError, TypeError) as e:
        return JsonResponse({'message': 'error', 'response': str(e)})
    except Exception as e:
        return JsonResponse({'message': 'error', 'response': 'Ocurrió un error inesperado.'}, status=500)