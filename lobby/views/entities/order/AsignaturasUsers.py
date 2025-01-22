from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.shortcuts import  get_object_or_404
from django.http import JsonResponse
import json

from public.decorators.book import teacher_required
from public.models.Institutional import Asignatura
from django.contrib.auth.models import User 



@login_required
@teacher_required
@require_http_methods(["POST"])
def POST(request):
    try:
        body = json.loads(request.body)
        user_id = body.get('id')
        asignatura_id = request.session.get('id-asignatura')

        if not user_id or not asignatura_id:
            raise ValueError('ID del usuario o de la asignatura es requerido.')

        asignatura = get_object_or_404(Asignatura, pk=asignatura_id)
        user = get_object_or_404(User, id=user_id)

        asignatura.user.add(user)

        return JsonResponse({
            'message': 'success',
            'response': {'user': {'id': user.id}, 'asignatura': {'id': asignatura.id}}
        })

    except (ValueError, json.JSONDecodeError) as e:
        return JsonResponse({'message': 'error', 'response': str(e)})
    except Exception:
        return JsonResponse({'message': 'error', 'response': 'Ocurrió un error inesperado.'}, status=500)
    
@login_required
@teacher_required
@require_http_methods(["DELETE"])
def DELETE(request):
    try:
        body = json.loads(request.body)
        asignatura_id = request.session.get('id-asignatura')
        user_id = body.get('id')

        if not user_id or not asignatura_id:
            raise ValueError('ID del usuario o de la asignatura es requerido.')

        asignatura = get_object_or_404(Asignatura, pk=asignatura_id)
        user = get_object_or_404(User, id=user_id)

        asignatura.user.remove(user)
        asignatura.save()

        return JsonResponse({
            'message': 'success',
            'response': {'user': {'id': user.id}, 'asignatura': {'id': asignatura.id}}
        })

    except (ValueError, json.JSONDecodeError) as e:
        return JsonResponse({'message': 'error', 'response': str(e)})
    except Exception:
        return JsonResponse({'message': 'error', 'response': 'Ocurrió un error inesperado.'}, status=500)


