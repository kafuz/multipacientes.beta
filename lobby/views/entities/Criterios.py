from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import  get_object_or_404
from django.forms.models import model_to_dict
from django.http import JsonResponse
import json

from public.decorators.book import teacher_required 
from public.models.Educational import Criterio
from public import serializados
from .order import Signals

@login_required
def GET(request, id):
    try:
        Instancia=Criterio.objects.get(id=id, asignatura= request.session['id-asignatura'])
        return JsonResponse({'message': "success", 'response': Instancia})
    except ObjectDoesNotExist:
        return JsonResponse({'message': "error", 'response': "El criterio especificada no existe"})
    except Exception as e:
        return JsonResponse({'message': "error", 'response': "Ocurrió un error al obtener el criterio: " + str(e)}, status=500)
     
@login_required
@teacher_required
@require_http_methods(["GET"])
def GETS(request, fk):
    try:
        Instancias=list(Criterio.objects.filter(dimension_id=fk).values())
        return JsonResponse({'message': "success", 'response': Instancias})
    except ObjectDoesNotExist:
        return JsonResponse({'message': 'error', 'response': 'No se encontraro la dimension relacionada.'}, status=404)
    except Exception as e:
        return JsonResponse({'message': 'error', 'response': 'Ocurrió un error al procesar la solicitud.'}, status=500)
    
@login_required
@teacher_required
@require_http_methods(["POST"])
def POST(request):
    try:
        body = json.loads(request.body)
        # <-> variables
        nombre = body.get('nombre')
        fk = body.get('fk')
        if not nombre:
            raise ValueError('Campo nombre es requerido.')
        
        if not fk:
            raise ValueError('Llave foránea es requerida.')

        Instancia=Criterio.objects.create(nombre= body.get('nombre'), valor=0, dimension_id=body.get('fk'))

        return JsonResponse({'message': 'success', 'response': serializados.criterio(Instancia) })
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
        nombre =   BODY.get('nombre')
        fk_periodo =    BODY.get('fk_periodo')
    
        if not id_instancia: 
            raise ValueError('ID del nivel es requerido.')

        Instancia = get_object_or_404(Criterio, id=id_instancia)

        if 'nombre' in BODY:
            if nombre!="": 
                Instancia.nombre=nombre
            else: raise ValueError('El nombre no puede estar vacio.')

        if 'valor' in BODY :
            valor= int(BODY.get('valor'))
            if valor is not None:
                objetos = Criterio.objects.filter(dimension_id=Instancia.dimension).exclude(id=Instancia.id)
                Signals.validar_valor(Instancia, valor, objetos)
                Instancia.valor= valor
            else: 
                raise ValueError('El valor esta fuera de rango 0 a 500')
        # Success
        Instancia.save()
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
        body = json.loads(request.body)
        Instancia = body.get('id')
        if not Instancia: raise ValueError('ID del criterio es requerido.')
        # Intentar eliminar la actividad
        deleted_count, _ =  Criterio.objects.filter(id=Instancia).delete()

        if deleted_count == 0: raise ValueError('Criterio no encontrado.')
        return JsonResponse({'message': 'success', 'response': 'ok'})
    except ValueError as ve:
        return JsonResponse({'message': 'error', 'response': str(ve)})
    except Exception as e:
        return JsonResponse({'message': 'error', 'response': 'Ocurrió un error inesperado.'}, status=500)

