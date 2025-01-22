from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db import IntegrityError
import json

from public.models.Institutional import Institucion
from ..forms.book import RegisterInstitucion
from django.urls import reverse


@login_required
@require_http_methods(["GET"])
def index_institucion(request):
    try:
        objs = list(Institucion.objects.filter(user=request.user).values())
        return render(request, 'institucion/index.html', { 'objetos': objs, 'form': RegisterInstitucion() })
    except Exception as e:
        return HttpResponse(status=500)
               
@login_required
@require_http_methods(["GET"])
def get_institucion(request, id):
    try:
        obj = list(Institucion.objects.filter(id=id, user=request.user).values())
        return JsonResponse({ 'message': "success", 'informacion': obj })
    except Exception as e:
        return HttpResponse(status=500)

@login_required
@require_http_methods(["POST"])
def create_institucion(request):
    form = RegisterInstitucion(request.POST)
    if form.is_valid():
        try:
            Institucion.objects.create(
                nit=form.cleaned_data['nit'],
                nombre=form.cleaned_data['nombre'],
                user=request.user
            )
            messages.success(request, "Creación exitosa")
            return redirect(reverse('index__institucion'))
        except IntegrityError:
            messages.error(request, f"Error: Ya existe una institución con el NIT {form.cleaned_data['nit']}")
    else:
        messages.error(request, "Error: Formulario inválido. Verifique los datos ingresados.")

    return redirect(reverse('index__institucion'))

@csrf_exempt
@login_required
@require_http_methods(["POST"])
def update_institucion(request, id):
    try:
        institucion = Institucion.objects.get(id=id, user=request.user)
        form = RegisterInstitucion(request.POST, instance=institucion)
        if form.is_valid():
            try:
                form.save()  # Guarda la instancia actualizada
                messages.info(request, "Institución actualizada con éxito")
                return redirect(reverse('index__institucion'))
            except IntegrityError:
                messages.error(request, f"No se puede actualizar el NIT: Ya existe una institución con el número {form.cleaned_data['nit']}")
        else:
            messages.error(request, "Error al actualizar los datos. Verifique los campos.")
    except Exception as e:
        messages.error(request, "Error al actualizar la institución.")
    
    return redirect(reverse('index__institucion'))


@login_required
@require_http_methods(["DELETE"])
def delete_institucion(request):
    try:
        body = json.loads(request.body)
        id = body.get('id')
        if not id:
            return JsonResponse({'request': 'error', 'message': 'ID de institución no proporcionado'}, status=400)
        obj= Institucion.objects.get(user=request.user, id=id)
        obj.delete()
        return JsonResponse({'request': 'success'})
    except (json.JSONDecodeError, Institucion.DoesNotExist):
        return JsonResponse({'request': 'error', 'message': 'Solicitud inválida o institución no encontrada'}, status=400)
    
    except Exception as e:
        return JsonResponse({'request': 'error', 'message': 'Error inesperado'}, status=500)