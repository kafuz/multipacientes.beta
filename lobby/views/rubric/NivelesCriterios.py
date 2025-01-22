from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.shortcuts import  get_object_or_404
import json

from public.models.Rubrica import NivelCriterio
from public.decorators.book import teacher_required 


@login_required
@teacher_required
@require_http_methods(["PUT"])
def PUT(request):
    try:
        BODY = json.loads(request.body)
        id_instancia = BODY.get('id')
        #variables 
        anotacion = BODY.get('anotacion')

        if not id_instancia: raise ValueError('ID del nivel es requerido.')
        
        Instancia = get_object_or_404(NivelCriterio, id=id_instancia)

        if 'anotacion' in BODY:
            if anotacion!="": 
                Instancia.anotacion=anotacion
            else: raise ValueError('La anotacion no puede estar vacia')
            
        Instancia.save()  # Guarda los cambios
        return JsonResponse({'message': 'success', 'response': 'ok'})
    except (ValueError, TypeError) as e:
        return JsonResponse({'message': 'error', 'response': str(e)})
    except Exception as e:
        print(e)
        return JsonResponse({'message': 'error', 'response': 'Ocurrió un error inesperado.'}, status=500)