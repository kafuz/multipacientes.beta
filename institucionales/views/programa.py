from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from django.db import IntegrityError
from django.contrib import messages
from django.urls import reverse
import json

from public.models.Institutional import Institucion, Programa
from public.decorators.book import teacher_required
from ..forms.book import RegisterPrograma
# GET Index
@login_required
@require_http_methods(["GET"])
def index_programa(request, fk):
    try:
        request.session['id-institucion'] = fk
        institucion= Institucion.objects.get(id=fk)
        objs = list(Programa.objects.filter(institucion__user=request.user, institucion=fk).values())
        return render(request, 'programa/index.html', { 'objetos': objs, 'form': RegisterPrograma(), 'institution':institucion })
    except Exception as e:
        return HttpResponse(status=500)

#GET Reload
@login_required
@require_http_methods(["GET"])
@teacher_required #Cambiar
def reload_programa(request):
    try:
        id = request.session.get('id-institucion')
        institucion= Institucion.objects.get(id=id)
        if not id:
            messages.error(request, "Institución no especificada en la sesión.")
            return redirect('index__programa')

        objs = list(Programa.objects.filter(institucion_id=id).values())
        return render(request, 'programa/index.html', { 'objetos': objs, 'form': RegisterPrograma(), 'institution':institucion })
    except Exception as e:
        return HttpResponse(status=500)

# GET UNIC
@login_required
@require_http_methods(["GET"])
@teacher_required #Cambiar
def get_programa(request, id):
    try:
        obj = list(Programa.objects.filter(id=id).values())
        return JsonResponse({ 'message': "success", 'informacion': obj })
    except Exception as e:
        return HttpResponse(status=500)

# CREATE
@login_required
@require_http_methods(["POST"])
@teacher_required
def create_programa(request):
    form = RegisterPrograma(request.POST)
    if form.is_valid():
        try:
            institucion = get_object_or_404(Institucion, id=request.session['id-institucion'])
            form = RegisterPrograma(request.POST, instance=institucion)

            if form.is_valid():
                Programa.objects.create(nombre=request.POST['nombre'], institucion=institucion)
                messages.success(request, "Creación exitosa")
            else:
                if not request.POST.get('nombre'):
                    messages.error(request, "Campo descripción es obligatorio")            
            return redirect('reload__programa')
        except IntegrityError:
            messages.error(request, "Ya existe un programa con esa descripción.")
            return redirect('reload__programa')
        except Exception as e:
            return HttpResponse(status=500)  # Cambiado a 500 para reflejar un error interno del servidor
    return redirect(reverse('index__institucion'))

# PUT
@csrf_exempt
@login_required
@require_http_methods(["POST"])
@teacher_required
def update_programa(request, id):
    try:
        institucion = get_object_or_404(Institucion, id=request.session['id-institucion'])
        form = RegisterPrograma(request.POST, instance=institucion)

        if form.is_valid():
            Programa.objects.filter(id=id).update(nombre=request.POST['nombre'])
            messages.info(request, "Actualizado")
        else:
            messages.error(request, "Error al actualizar los datos")
        return redirect('reload__programa')
    except IntegrityError:
        messages.error(request, "Error al actualizar el programa.")
        return redirect('reload__programa')
    except Exception as e:
        return HttpResponse(status=500)  # Cambiado a 500 para reflejar un error interno del servidor

# DELETE
@login_required
@require_http_methods(["DELETE"])
@teacher_required
def delete_programa(request):
    try:
        body = json.loads(request.body)
        programa_id = body.get('id')

        if not programa_id:
            return JsonResponse({'request': 'error', 'message': 'ID de programa no proporcionado'}, status=400)

        # Obtener la instancia del programa y eliminarla
        programa = get_object_or_404(Programa, id=programa_id)
        programa.delete()
        messages.success(request, "Eliminación exitosa")
        return JsonResponse({'request': 'success'})

    except json.JSONDecodeError:
        return JsonResponse({'request': 'error', 'message': 'Error en el formato del cuerpo de la solicitud'}, status=400)

    except Exception as e:
        return JsonResponse({'request': 'error', 'message': 'Error interno del servidor'}, status=500)