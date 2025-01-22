from django.contrib.auth.decorators import login_required
from public.decorators.book import teacher_required 
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse

from django.contrib.auth.models import User 
from public import serializados

@login_required
@teacher_required
def GET_THIS(request, id):
    try:
        Instancia = serializados.user(request.user)
        return JsonResponse({'message': 'success', 'response': Instancia})
    except Exception as e:
        return JsonResponse({'message': 'error', 'response': 'Ocurrió un error inesperado.'}, status=500)

@login_required
@require_http_methods(["GET"])
def GET(request, id):
    try:
        Instancia = User.objects.get(id=id)
        return JsonResponse({'message': "success", 'response': serializados.user(Instancia)})
    except ObjectDoesNotExist:
        return JsonResponse({'message': "error", 'response': "El usuario especificada no existe"})
    except Exception as e:
        return JsonResponse({'message': "error", 'response': "Ocurrió un error al obtener el usuario: " + str(e)}, status=500)
     