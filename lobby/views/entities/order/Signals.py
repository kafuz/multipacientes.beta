from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.db import transaction

from public.models.Educational import Dimension, Criterio, Actividad, Calificacion
from public.models.Institutional import Asignatura, AsignaturaUser
from public.models.Rubrica import Rubrica


MAXIMO_PUNTAJE=500
# Constantes
status = True
VALOR_INICIAL = 0

def crear_dimension(nombre, fk_asignatura):
    return Dimension.objects.create(is_active=status, nombre=nombre, valor=VALOR_INICIAL, asignatura_id=fk_asignatura)

def crear_criterio(nombre, fk_dimension):
    return Criterio.objects.create(is_active=status, nombre=nombre, valor=VALOR_INICIAL, dimension=fk_dimension)

def crear_actividad(nombre, fk_criterio):
    return Actividad.objects.create(is_active=status, nombre=nombre, criterio=fk_criterio)

def crear_rubrica(fk_asignatura):
    print('create rubrica')
    return Rubrica.objects.create(asignatura_id=fk_asignatura)


def __initial__asignatura(asignatura):
    try:
        # Crear dimensiones
        ser = crear_dimension('ser', asignatura.id)
        conocer = crear_dimension('conocer', asignatura.id)
        hacer = crear_dimension('hacer', asignatura.id)
        rubrica= crear_rubrica(asignatura.id)
    except Exception as e:
        # Manejar la excepción adecuadamente
        print(f"Ocurrió un error al crear las dimensiones: {e}")


def update__asignatura(request):
    with transaction.atomic():
        try:
            # Obtener la asignatura desde la sesión
            asignatura_id = request.session.get('id-asignatura')
            if not asignatura_id:
                raise ValueError("No se encontró 'id-asignatura' en la sesión.")

            # Obtener la asignatura desde la base de datos
            asignatura = get_object_or_404(Asignatura, id=asignatura_id)

            # Obtener las actividades relacionadas con la asignatura
            actividades = Actividad.objects.select_related('criterio__dimension').filter(
                criterio__dimension__asignatura=asignatura
            ).prefetch_related('calificaciones')  # Usar 'calificaciones' en lugar de 'calificacion_set'

            # Obtener todos los estudiantes de la asignatura
            estudiantes = asignatura.user.all()

            # Utilizar una transacción para asegurar la consistencia de los datos
            with transaction.atomic():
                for estudiante in estudiantes:
                    # Obtener o crear la relación AsignaturaUser
                    asignatura_user, _ = AsignaturaUser.objects.get_or_create(asignatura=asignatura, user=estudiante)

                    for actividad in actividades:
                        # Obtener el valor del multiplicador de la actividad
                        multiplicador = actividad.multiplicador

                        # Verificar cuántas calificaciones tiene el estudiante para esta actividad
                        cantidad_actual = Calificacion.objects.filter(
                            actividad=actividad, asignaturaUser=asignatura_user
                        ).count()

                        if cantidad_actual < multiplicador:
                            # Si tiene menos calificaciones de las necesarias, crear las faltantes
                            calificaciones_faltantes = multiplicador - cantidad_actual
                            for _ in range(calificaciones_faltantes):
                                Calificacion.objects.create(actividad=actividad, valor=0, asignaturaUser=asignatura_user)
                        elif cantidad_actual > multiplicador:
                            # Si tiene más calificaciones de las necesarias, eliminar las excedentes
                            calificaciones_excedentes = Calificacion.objects.filter(
                                actividad=actividad, asignaturaUser=asignatura_user
                            ).order_by('-id')[:cantidad_actual - multiplicador]

                            # Eliminar cada calificación excedente
                            for calificacion in calificaciones_excedentes:
                                calificacion.delete()

            return JsonResponse({'message': "success", 'response': 'students related ' + str(len(estudiantes))})
        except Asignatura.DoesNotExist:
            return JsonResponse({'message': "error", 'error': 'Asignatura no encontrada'}, status=404)
        except Exception as e:
            print(e)
            return JsonResponse({'message': "error", 'error': str(e)}, status=500)

def validar_valor(objeto, valor, objetos):
    # Condicionales
    if valor < 0:
        raise ValueError('El puntaje mínimo por casilla es '+str(0))
    elif valor > MAXIMO_PUNTAJE:
        raise ValueError('El puntaje máximo por casilla es '+str(MAXIMO_PUNTAJE))
    else:
        # Inicializar la suma
        suma_valor = valor
        # Iterar sobre los objetos y sumar el campo 'valor'
        for objeto in objetos:
            suma_valor+= int(objeto.valor)
        # Verificar si la suma es mayor a maximo
        if suma_valor > MAXIMO_PUNTAJE:
            raise ValueError('Sumatoria de los dimensiones no debe superar '+str(MAXIMO_PUNTAJE)+':'+str(suma_valor))
