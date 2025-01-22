
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
import json

from public.decorators.book import teacher_required 
from public.models.Educational import Calificacion
from public.models.Institutional import Asignatura, AsignaturaUser
from public import serializados

@login_required
@teacher_required
@require_http_methods(["GET"])
def GETS(request, id_user, id_actividad):
    try:
        asignatura = get_object_or_404(Asignatura, id=request.session.get('id-asignatura'))
        asignatura_user = get_object_or_404(AsignaturaUser, user_id=id_user, asignatura=asignatura)

        calificaciones = Calificacion.objects.filter(actividad_id=id_actividad, asignaturaUser=asignatura_user).values()
        return JsonResponse({'message': 'success', 'response': list(calificaciones)})
    except Exception as e:
        return JsonResponse({'message': 'error', 'response': str(e)}, status=500)
    
@login_required
@teacher_required
@require_http_methods(["PUT"])
def PUT(request):
    try:
        BODY = json.loads(request.body)
        id_instancia = BODY.get('id')
        # <-> variables 
        descripcion = BODY.get('descripcion')
        anotacion = BODY.get('anotacion')

        if not id_instancia: raise ValueError('ID del nivel es requerido.')
        Instancia = get_object_or_404(Calificacion, id=id_instancia)

        if 'descripcion' in BODY:
            if descripcion!="": 
                Instancia.descripcion=descripcion
            else: raise ValueError('La descripción no puede estar vacia')

        if 'anotacion' in BODY:
            if anotacion!="": 
                Instancia.anotacion=anotacion
            else: raise ValueError('La anotacion no puede estar vacia')

        if 'valor' in BODY :
            valor = int(BODY['valor'])
            if valor >= 0 and valor <= 500:
                    Instancia.valor=valor
            else: raise ValueError('El valor maximo no puede estar fuera de rango 0 a 500') 

        Instancia.save()  # Guarda los cambios
        return JsonResponse({'message': 'success', 'response': 'ok'})
    except (ValueError, TypeError) as e:
        return JsonResponse({'message': 'error', 'response': str(e)})
    except Exception as e:
        return JsonResponse({'message': 'error', 'response': 'Ocurrió un error inesperado.'}, status=500)
