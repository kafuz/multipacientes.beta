from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import  get_object_or_404
import json

from public.decorators.book import teacher_required 
from public.extensions.book import compress_image
from public.models.Rubrica import Rubrica

@login_required
@require_http_methods(["GET"])
def GET(request, id):
    try:
        Instancias = Rubrica.objects.filter(id=id).values().first()
        return JsonResponse({'message': "success", 'response': Instancias})
    except ObjectDoesNotExist:
        return JsonResponse({'message': "error", 'response': "La rubrica especificado no existe"})
    except Exception as e:
        return JsonResponse({'message': "error", 'response': "Ocurrió un error al obtener la rubrica: " + str(e)}, status=500)
    

@login_required
@teacher_required
@require_http_methods(["PUT"])
def PUT(request):
    try:
        BODY = json.loads(request.body)
        print(BODY)
        id_instancia = BODY.get('id')
        #-Variables
        anotacion = BODY.get('anotacion')
        if not id_instancia: raise ValueError('ID del nivel es requerido.')
        Instancia = get_object_or_404(Rubrica, id=id_instancia)

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

@login_required
@teacher_required
@require_http_methods(["POST"])
def PUT_IMG(request):
    try:
        id_instancia = request.POST.get('id')
        imagen = request.FILES.get('imagen') 
        Instancia = get_object_or_404(Rubrica, id=id_instancia)

        if not id_instancia: raise ValueError('ID del nivel es requerido.')
        # Procesar la imagen si está presente
        if imagen:
            Instancia.imagen = compress_image(imagen)

        Instancia.save()
        return JsonResponse({'message': 'success', 'response': 'ok'})
    
    except (ValueError, TypeError) as e:
        return JsonResponse({'message': 'error', 'response': str(e)})
    except Exception as e:
        return JsonResponse({'message': 'error', 'response': str(e)}, status=500)

