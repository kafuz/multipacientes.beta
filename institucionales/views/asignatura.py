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
from public.models.Educational import Dimension, Criterio, Monitoreo, Actividad
from public.models.Rubrica import Rubrica, Nivel, NivelCriterio

from public.decorators.book import teacher_required

from ..forms.book import RegisterAsignatura

import logging
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required

# Configuración del logger
logger = logging.getLogger(__name__)

# GET Index
@login_required
@require_http_methods(["GET"])
@teacher_required  # Cambiar
def index_asignatura(request, fk):
    try:
        # Guardar el id del programa en la sesión
        request.session['id-programa'] = fk
        logger.info(f'ID programa: {request.session["id-programa"]}')
        programa= Programa.objects.get(id=fk)
        # Obtener las asignaturas filtradas por el id del programa
        objs = list(Asignatura.objects.filter(programa_id=fk).values())
        logger.info(f'Asignaturas obtenidas: {objs}')

        # Renderizar la página con los objetos y el formulario
        return render(request, 'asignatura/index.html', {'objetos': objs, 'form': RegisterAsignatura(), 'programa':programa})
    except Exception as e:
        # Registrar el error con stack trace
        logger.error('Error en la vista index_asignatura', exc_info=True)
        return HttpResponse(status=500)


#GET Reload
@login_required
@require_http_methods(["GET"])
@teacher_required #Cambiar
def reload_asignatura(request):
    try:
        id = request.session.get('id-programa')
        programa= Programa.objects.get(id=id)
        if not id:
            messages.error(request, "Programa no especificado en la sesión.")
            return redirect('index__asignatura')
        objs = list(Asignatura.objects.filter(programa_id=id).values())
        return render(request, 'asignatura/index.html', { 'objetos': objs, 'form': RegisterAsignatura(), 'programa':programa })
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


@login_required
@teacher_required
@require_http_methods(["POST"])
def clonar_asignatura_view(request):
    try:
        # Obtener el ID de la asignatura a clonar desde la solicitud POST
        body = json.loads(request.body)
        asignatura_id = body.get('id')
       
        if not asignatura_id:
            messages.error(request, "No se proporcionó el ID de la asignatura a clonar.")
            return redirect('reload__asignatura')

        # Obtener la asignatura original
        asignatura_original = get_object_or_404(Asignatura, id=asignatura_id)
      
        # Clonar la asignatura y sus relaciones
        nueva_asignatura = clonar_asignatura(asignatura_original)

        # Mensaje de éxito
        messages.success(request, f"Asignatura '{asignatura_original.nombre}' clonada exitosamente como '{nueva_asignatura.nombre}'.")
        return JsonResponse({'request': 'success'})
    except Exception as e:
        # Log del error (opcional)
        logger.error(f"Error inesperado: {e}")
        return HttpResponse(status=500)  # Error interno del servidor

def clonar_asignatura(asignatura):
    try:
        # Clonar la asignatura
        nueva_asignatura = Asignatura.objects.create(
            is_active=asignatura.is_active,
            nombre=f"* {asignatura.nombre}",
            programa=asignatura.programa
        )

        # Diccionario para mapear monitoreos originales a sus clones
        monitoreos_clonados = {}

        # Clonar los monitoreos de la asignatura
        for monitoreo in asignatura.Monitoreos.all():  # Usar 'Monitoreos' (con mayúscula)
            nuevo_monitoreo = Monitoreo.objects.create(
                nombre=monitoreo.nombre,
                color=monitoreo.color,
                fecha_inicio=monitoreo.fecha_inicio,
                fecha_fin=monitoreo.fecha_fin,
                asignatura=nueva_asignatura
            )
            monitoreos_clonados[monitoreo.id] = nuevo_monitoreo

        # Clonar las dimensiones y sus criterios
        for dimension in asignatura.dimensiones.all():
            nueva_dimension = Dimension.objects.create(
                is_active=dimension.is_active,
                nombre=dimension.nombre,
                valor=dimension.valor,
                asignatura=nueva_asignatura
            )

            for criterio in dimension.criterios.all():
                nuevo_criterio = Criterio.objects.create(
                    is_active=criterio.is_active,
                    nombre=criterio.nombre,
                    valor=criterio.valor,
                    dimension=nueva_dimension
                )

                # Clonar las actividades relacionadas con el criterio
                for actividad in criterio.actividades.all():
                    # Reutilizar el monitoreo clonado si existe
                    nuevo_monitoreo = None
                    if actividad.monitoreo:
                        nuevo_monitoreo = monitoreos_clonados.get(actividad.monitoreo.id)

                    Actividad.objects.create(
                        is_active=actividad.is_active,
                        nombre=actividad.nombre,
                        valor=actividad.valor,
                        multiplicador=actividad.multiplicador,
                        np_is=actividad.np_is,
                        nivel_pertinencia=actividad.nivel_pertinencia,
                        criterio=nuevo_criterio,
                        monitoreo=nuevo_monitoreo
                    )

        # Clonar las rúbricas, niveles y nivel_criterios
        for rubrica in asignatura.rubricas.all():
            nueva_rubrica = Rubrica.objects.create(
                anotacion=rubrica.anotacion,
                imagen=rubrica.imagen,
                asignatura=nueva_asignatura
            )

            for nivel in rubrica.niveles.all():
                nuevo_nivel = Nivel.objects.create(
                    nombre=nivel.nombre,
                    valorMaximo=nivel.valorMaximo,
                    valorMinimo=nivel.valorMinimo,
                    color=nivel.color,
                    rubrica=nueva_rubrica
                )

                # Clonar las relaciones NivelCriterio
                for nivel_criterio in nivel.nivel_criterios.all():
                    # Obtener el criterio clonado correspondiente
                    criterio_clonado = Criterio.objects.filter(
                        dimension__asignatura=nueva_asignatura,
                        nombre=nivel_criterio.criterio.nombre
                    ).first()

                    if criterio_clonado:
                        NivelCriterio.objects.create(
                            nivel=nuevo_nivel,
                            criterio=criterio_clonado,
                            anotacion=nivel_criterio.anotacion
                        )

        return nueva_asignatura
    except Exception as e:
        logger.error(f'Error al clonar asignatura: {e}')
        raise e