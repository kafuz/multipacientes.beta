
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime, timedelta
from django.http import JsonResponse
import json

from public.decorators.book import teacher_required 
from public.models.Educational import Monitoreo
from public import serializados

@login_required
@require_http_methods(["GET"])
def GET(request, id):
    try:
        Instancia = serializados.monitoreo(Monitoreo.objects.get(id=id))
        return JsonResponse({'message': 'success', 'response': Instancia})
    except ObjectDoesNotExist:
        return JsonResponse({'message': 'error', 'response': 'Monitoreo no encontrado'}, status=404)
    except Exception as e:
        return JsonResponse({'message': 'error', 'response': 'Ocurrió un error inesperado'}, status=500)

@login_required
@require_http_methods(["GET"])
def GETS(request, fk):
    try:
        Instancias = Monitoreo.objects.filter(asignatura_id=fk).order_by('fecha_inicio')
        Instancias_values = list(Instancias.values())
        return JsonResponse({'message': 'success', 'response': Instancias_values})
    except ObjectDoesNotExist:
        return JsonResponse({'message': 'error', 'response': 'No se encontro la asignatura especificada.'}, status=404)
    except Exception as e:
        return JsonResponse({'message': 'error', 'response': 'Ocurrió un error al procesar la solicitud.'}, status=500)
  
@login_required
@teacher_required
@require_http_methods(["POST"])
def POST(request):
    try:
        body = json.loads(request.body)
        nombre = body.get('nombre')
        fk = body.get('fk')

        if not nombre:
            raise ValueError('Campo nombre es requerido.')
        if not fk:
            raise ValueError('Llave foránea es requerida.')

        asignatura_id = request.session.get('id-asignatura')
        if not asignatura_id:
            raise ValueError('ID de asignatura no disponible en la sesión.')

        monitoreos = Monitoreo.objects.filter(asignatura_id=asignatura_id)
        
        if monitoreos.exists():
            latest_end_date = max(monitoreos.values_list('fecha_fin', flat=True))
            new_start_date = latest_end_date + timedelta(days=1)
        else:
            new_start_date = datetime.now().date()
        new_end_date = new_start_date + timedelta(days=1)

        obj = Monitoreo.objects.create(nombre=nombre, fecha_inicio=new_start_date, fecha_fin=new_end_date, asignatura_id=asignatura_id)

        return JsonResponse({'message': 'success', 'response': serializados.monitoreo(obj)})

    except ValueError as ve:
        return JsonResponse({'message': 'error', 'response': str(ve)})
    except Exception as e:
        print(f"\033[91mError al crear el monitoreo: {e}\033[0m")
        return JsonResponse({'message': 'error', 'response': 'Ocurrió un error al crear el monitoreo.'}, status=500)


@login_required
@teacher_required
@require_http_methods(["PUT"])
def PUT(request):
    try:
        body = json.loads(request.body)
        id_instancia = body.get('id')
        objeto = Monitoreo.objects.get(id=id_instancia)
        
        nombre = body.get('nombre')
        if nombre:
            objeto.nombre = nombre
        elif nombre is not None:
            raise ValueError('Campo nombre es requerido.')

        fecha_inicio_str = body.get('fecha_inicio')
        if fecha_inicio_str:
            start = datetime.strptime(fecha_inicio_str, '%Y-%m-%d').date()
            if start <= datetime.now().date():
                raise ValueError('Fecha Inicial debe ser mayor a la fecha actual.')
            if start >= objeto.fecha_fin:
                raise ValueError('Fecha Inicial debe ser menor a la fecha final.')
            objeto.fecha_inicio = start

        fecha_fin_str = body.get('fecha_fin')
        if fecha_fin_str:
            fecha_fin = datetime.strptime(fecha_fin_str, '%Y-%m-%d').date()
            if fecha_fin <= datetime.now().date():
                raise ValueError('La fecha final debe ser mayor a la fecha actual.')
            if fecha_fin <= objeto.fecha_inicio:
                raise ValueError('La fecha final debe ser mayor a la fecha inicial.')
            objeto.fecha_fin = fecha_fin
        
        color = body.get('color')
        if color:
            objeto.color = color

        objeto.save()
        return JsonResponse({'message': 'success', 'response': 'ok'})
    
    except ValueError as ve:
        return JsonResponse({'message': 'error', 'response': str(ve)})
    except ObjectDoesNotExist:
        return JsonResponse({'message': 'error', 'response': 'monitoreo no encontrado.'}, status=404)
    except Exception as e:
        return JsonResponse({'message': 'error', 'response': 'Ocurrió un error al actualizar el monitoreo.'}, status=500)

@login_required
@teacher_required
@require_http_methods(["DELETE"])
def DELETE(request):
    try:
        body = json.loads(request.body)
        id_instancia = body.get('id')
        if not id_instancia:
            raise ValueError('ID del monitoreo es requerido.')

        deleted_count, _ = Monitoreo.objects.filter(id=id_instancia).delete()
        if deleted_count == 0:
            raise ObjectDoesNotExist('Monitoreo no encontrado.')

        return JsonResponse({'message': 'success', 'response': 'ok'})
    except ValueError as ve:
        return JsonResponse({'message': 'error', 'response': str(ve)})
    except ObjectDoesNotExist as onde:
        return JsonResponse({'message': 'error', 'response': str(onde)}, status=404)
    except Exception as e:
        return JsonResponse({'message': 'error', 'response': 'Ocurrió un error al eliminar el monitoreo.'}, status=500)
