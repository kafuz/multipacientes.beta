from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import  get_object_or_404
from django.forms.models import model_to_dict
from django.http import JsonResponse
import json

from public.decorators.book import teacher_required 
from public.models.Educational import Actividad, Monitoreo
from public import serializados
from .order import Signals

@login_required
@require_http_methods(["GET"])
def GET(request, id):
    try:
        Instancia = Actividad.objects.get(id=id)
        return JsonResponse({'message': "success", 'response': Instancia})
    except ObjectDoesNotExist:
        return JsonResponse({'message': "error", 'response': "La actividas especificada no existe"})
    except Exception as e:
        return JsonResponse({'message': "error", 'response': "Ocurrió un error al obtener la actividad: " + str(e)}, status=500)
     
@login_required
@require_http_methods(["GET"])
def GETS(request, fk):
    try:
        Instancias = list(Actividad.objects.filter(criterio_id=fk).values())
        return JsonResponse({'message': "success", 'response': Instancias})
    except ObjectDoesNotExist:
        return JsonResponse({'message': "error", 'response': "El criterio especificado no existe"})
    except Exception as e:
        return JsonResponse({'message': "error", 'response': "Ocurrió un error al obtener las actividades: " + str(e)}, status=500)
    

@login_required
@teacher_required
@require_http_methods(["POST"])
def POST(request):
    try:
        body = json.loads(request.body)
        nombre = body.get('nombre')
        fk = body.get('fk')

        if not nombre:
            raise ValueError('El campo nombre es requerido.')
        if not fk:
            raise ValueError('Llave foránea es requerida.')

        Instancia = Actividad.objects.create(nombre=nombre, criterio_id=fk)
        return JsonResponse({'message': 'success', 'response': model_to_dict(Instancia)})

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
        nombre = BODY.get('nombre')
        fk_monitoreo = BODY.get('fk_monitoreo')
       
        if not id_instancia: 
            raise ValueError('ID de la actividad es requerido.')

        Instancia = get_object_or_404(Actividad, id=id_instancia)

        if 'nombre' in BODY:
            if nombre: 
                Instancia.nombre = nombre
            else: 
                raise ValueError('El nombre no puede estar vacío.')
        
        if 'multiplicador' in BODY:
            multiplicador = int(BODY.get('multiplicador'))
            if 0 < multiplicador <= 35:
                Instancia.multiplicador = multiplicador
            else:
                raise ValueError('El multiplicador está fuera de rango 0 a 35.')

        if 'nivel_pertinencia' in BODY:
            pertinencia = int(BODY.get('nivel_pertinencia'))
            if 0 < pertinencia <= 5:
                Instancia.nivel_pertinencia = pertinencia
            else:
                raise ValueError('El nivel de pertinencia está fuera de rango 0 a 5.')

        if 'valor' in BODY:
            valor = int(BODY.get('valor'))
            if valor is not None:
                objetos = Actividad.objects.filter(criterio_id=Instancia.criterio).exclude(id=Instancia.id)
                Signals.validar_valor(Instancia, valor, objetos)
                Instancia.valor = valor
            else:
                raise ValueError('El valor está fuera de rango 0 a 500.')

        if 'fk_monitoreo' in BODY:
            monitoreo = Monitoreo.objects.filter(id=fk_monitoreo).first()
            if not monitoreo:
                raise ValueError('Monitoreo no encontrado.')   
            Instancia.monitoreo = monitoreo

        Instancia.save()
        return JsonResponse({'message': 'success', 'response': 'ok'})

    except (ValueError, TypeError) as e:
        return JsonResponse({'message': 'error', 'response': str(e)}, status=400)
    except Exception as e:
        return JsonResponse({'message': 'error', 'response': f'Ocurrió un error inesperado: {e}'}, status=500)

@login_required
@teacher_required
@require_http_methods(["DELETE"])
def DELETE(request):
    try:
        body = json.loads(request.body)
        Instancia = body.get('id')
        if not Instancia:raise ValueError('ID de la actividad es requerido.')
        deleted_count, _ = Actividad.objects.filter(id=Instancia).delete()
        if deleted_count == 0: raise ValueError('Actividad no encontrada.')
        return JsonResponse({'message': 'success', 'response': 'ok'})
    except ValueError as ve:
        return JsonResponse({'message': 'error', 'response': str(ve)})
    except Exception as e:
        return JsonResponse({'message': 'error', 'response': 'Ocurrió un error inesperado.'}, status=500)


# <Inicio> Enlazadas con monitoreo
    #GETS
@login_required
@require_http_methods(["GET"])
def GETSP(request, id):
    try:
        actividades = list(Actividad.objects.filter(monitoreo_id=id).values())
        return JsonResponse({'message': 'success', 'response': actividades})
    except ObjectDoesNotExist:
        return JsonResponse({'message': 'error', 'response': 'Actividades no encontradas'}, status=404)
    except Exception as e:
        return JsonResponse({'message': 'error', 'response': 'Ocurrió un error inesperado'}, status=500)
    #DELETE
@login_required
@require_http_methods(["DELETE"])
def DELETEP(request):
    try:
        body = json.loads(request.body)
        actividad_id = body.get('id')
        actividad = Actividad.objects.get(id=actividad_id)
        actividad.monitoreo = None
        actividad.save()
        return JsonResponse({'message': 'success', 'response': 'ok'})
    except ObjectDoesNotExist:
        return JsonResponse({'message': 'error', 'response': 'Actividad no encontrada'}, status=404)
    except Exception as e:
        return JsonResponse({'message': 'error', 'response': 'Ocurrió un error inesperado'}, status=500)
# <Fin> Enlazadas con monitoreo