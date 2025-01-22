from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from django.db import IntegrityError
from django.contrib import messages
import json

from lobby.views.entities.order import Signals
from public.models.Institutional import Asignatura, Programa
from public.decorators.book import teacher_required

from ..forms.book import RegisterAsignatura


# GET Index
@login_required
@require_http_methods(["GET"])
@teacher_required #Cambiar
def index_asignatura(request, fk):
    try:
        request.session['id-programa'] = fk
        objs = list(Asignatura.objects.filter(programa_id=fk).values())
        return render(request, 'asignatura/index.html   ', { 'objetos': objs, 'form': RegisterAsignatura() })
    except Exception as e:
        return HttpResponse(status=500)

#GET Reload
@login_required
@require_http_methods(["GET"])
@teacher_required #Cambiar
def reload_asignatura(request):
    try:
        id = request.session.get('id-programa')
        if not id:
            messages.error(request, "Programa no especificado en la sesión.")
            return redirect('index__asignatura')
        objs = list(Asignatura.objects.filter(programa_id=id).values())
        return render(request, 'asignatura/index.html', { 'objetos': objs, 'form': RegisterAsignatura() })
    except Exception as e:
        return HttpResponse(status=500)


# GET UNIC
@login_required
@teacher_required #Cambiar
def get_asignatura(request, id):
    try:
        asignatura = Asignatura.objects.filter(programa__institucion__user=request.user, id=id).values()
        return JsonResponse({'message': "success", 'informacion': list(asignatura)})
    except ObjectDoesNotExist:
        return JsonResponse({'message': "error", 'informacion': 'Asignatura no existe'}, status=404)
    except Exception as e:
        return JsonResponse({'message': "error", 'informacion': 'Error interno del servidor'}, status=500)

@login_required
@require_http_methods(["POST"])
@teacher_required
def create_asignatura(request):
    try:
        # Obtener el programa desde la sesión
        programa = get_object_or_404(Programa, id=request.session['id-programa'])
        form = RegisterAsignatura(request.POST, instance=programa)

        if form.is_valid():
            # Crear la nueva asignatura
            asignatura = Asignatura.objects.create(nombre=request.POST['nombre'], programa=programa)
            Signals.__initial__asignatura(asignatura)
            asignatura.save()
            messages.success(request, "Creación exitosa")
        else:
            if not request.POST.get('nombre'):
                messages.error(request, "Campo descripción es obligatorio")

        return redirect('reload__asignatura')
    except IntegrityError:
        messages.error(request, "Ya existe una asignatura con esa descripción.")
        return redirect('reload__asignatura')
    except Exception as e:
        return HttpResponse(status=500)  # Cambiado a 500 para reflejar un error interno del servidor

# PUT
@csrf_exempt
@login_required
@require_http_methods(["POST"])
@teacher_required
def update_asignatura(request, id):
    try:
        programa = get_object_or_404(Programa, id=request.session['id-programa'])
        form = RegisterAsignatura(request.POST, instance=programa)

        if form.is_valid():
            Asignatura.objects.filter(id=id).update(nombre=request.POST['nombre'])
            messages.info(request, "Actualizado")
        else:
            messages.error(request, "Error al actualizar los datos")

        return redirect('reload__asignatura')
    except IntegrityError:
        messages.error(request, "Error al actualizar la asignatura.")
        return redirect('reload__asignatura')
    except Exception as e:
        return HttpResponse(status=500)  # Cambiado a 500 para reflejar un error interno del servidor

# DELETE
@login_required
@require_http_methods(["DELETE"])
@teacher_required
def delete_asignatura(request):
    try:
        body = json.loads(request.body)
        asignatura_id = body.get('id')

        if not asignatura_id:
            return JsonResponse({'request': 'error', 'message': 'ID de asignatura no proporcionado'}, status=400)

        # Obtener la instancia de la asignatura y eliminarla
        asignatura = get_object_or_404(Asignatura, id=asignatura_id)
        asignatura.delete()
        messages.success(request, "Eliminación exitosa")
        return JsonResponse({'request': 'success'})

    except json.JSONDecodeError:
        return JsonResponse({'request': 'error', 'message': 'Error en el formato del cuerpo de la solicitud'}, status=400)

    except Exception as e:
        return JsonResponse({'request': 'error', 'message': 'Error interno del servidor'}, status=500)
