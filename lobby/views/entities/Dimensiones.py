from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import  get_object_or_404
from django.http import JsonResponse
import json

from public.decorators.book import teacher_required
from public.models.Educational import Dimension
from public import serializados
from .order import Signals

@login_required
@require_http_methods(["GET"])
def GET(request, id):
    try:
        Instancia = Dimension.objects.get(id=id, asignatura_id=request.session['id-signatura'])
        return JsonResponse({'message': "success", 'response': Instancia})
    except Dimension.DoesNotExist:
        return JsonResponse({'message': "error", 'response': "La dimensión especificada no existe"}, status=404)
    except Exception as e:
        return JsonResponse({'message': "error", 'response': f"Ocurrió un error al obtener la dimensión: {str(e)}"}, status=500)
    
@login_required
@require_http_methods(["GET"])
def GETS(request, fk):
    try:
        Instancias = list(Dimension.objects.filter(asignatura__id=fk).values())
        return JsonResponse({'message': "success", 'response': Instancias})
    except ObjectDoesNotExist:
        return JsonResponse({'message': "error", 'response': "La asignatura especificado no existe"})
    except Exception as e:
        print(e)
        return JsonResponse({'message': "error", 'response': "Ocurrió un error al obtener las dimensiones: " + str(e)}, status=500)  

@login_required
@teacher_required
@require_http_methods(["POST"])
def POST(request):
    try:
        BODY = json.loads(request.body)
        id_instancia = BODY.get('id')
        # <-> variables 
        nombre =   BODY.get('nombre')
        fk_asignatura =   BODY.get('fk')
        if not nombre:
            raise ValueError('El Campo nombre es requerido.')
        
        Instancia= Dimension.objects.create(nombre=nombre, valor=0, asignatura_id=fk_asignatura)
        return JsonResponse({'message': 'success', 'response': serializados.dimension(Instancia) })
    except (ValueError, TypeError) as e:
        return JsonResponse({'message': 'error', 'response': str(e)})
    except Exception as e:
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

        if not id_instancia: 
            raise ValueError('ID de la dimension es requerida.')

        Instancia = get_object_or_404(Dimension, id=id_instancia)
        # - INDEPENDIENTE
        if 'is_active' in BODY:
            is_active= bool(BODY.get('is_active'))
            if is_active == True:
                Instancia.is_active = True
            else:
                Instancia.valor = 0
                Instancia.is_active = False
            Instancia.save()
        
        # - ORDER
        if Instancia.is_active==True:
            if 'nombre' in BODY:
                if nombre!="": 
                    Instancia.nombre=nombre
                else: raise ValueError('La descripción no puede estar vacia')

            if 'valor' in BODY :
                valor= int(BODY.get('valor'))
                if valor is not None:
                    objetos = Dimension.objects.filter(is_active=True, asignatura=Instancia.asignatura).exclude(id=Instancia.id)
                    Signals.validar_valor(Instancia, valor, objetos)
                    Instancia.valor= valor
                else: 
                    raise ValueError('El valor esta fuera de rango 0 a 500')
            Instancia.save()
            # Success
        else:
            if 'is_active' not in BODY:
                raise ValueError('No puedes actualizar una dimension desactivada')  

        return JsonResponse({'message': 'success', 'response': 'ok'})
    except (ValueError, TypeError) as e:
        return JsonResponse({'message': 'error', 'response': str(e)})
    except Exception as e:
        return JsonResponse({'message': 'error', 'response': 'Ocurrió un error inesperado.'}, status=500)

@login_required
@teacher_required
@require_http_methods(["DELETE"])
def DELETE(request):
    try:
        body = json.loads(request.body)
        Instancia = body.get('id')
        if not Instancia:raise ValueError('ID de la Dimension es requerido.')
        deleted_count, _ = Dimension.objects.filter(id=Instancia).delete()
        if deleted_count == 0: raise ValueError('Dimension no encontrada.')
        return JsonResponse({'message': 'success', 'response': 'ok'})
    except ValueError as ve:
        return JsonResponse({'message': 'error', 'response': str(ve)})
    except Exception as e:
        return JsonResponse({'message': 'error', 'response': 'Ocurrió un error inesperado.'}, status=500)
