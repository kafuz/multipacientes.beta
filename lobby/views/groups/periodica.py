from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from django.db.models import Sum, Count, FloatField, Prefetch
from public.decorators.book import teacher_required 
from django.shortcuts import get_object_or_404
from django.http import JsonResponse

from public.models.Educational import Dimension, Criterio, Actividad, Calificacion, Monitoreo
from public.models.Institutional import Asignatura
from django.contrib.auth.models import User 
from public.extensions.book import newJson
from public import serializados


MAXIMO_PUNTAJE= 500

@login_required
@teacher_required
@require_http_methods(["GET"])
def GET_Individual(request, id):
    try:
        user = get_object_or_404(User, id=id)
        asignatura_id = request.session.get('id-asignatura')
        asignatura = get_object_or_404(Asignatura, id=asignatura_id)

        # Fetch periods with related dimensions and criteria
        monitoreos = Monitoreo.objects.filter(asignatura=asignatura).select_related('asignatura')
        dimensiones = Dimension.objects.filter(asignatura=asignatura, is_active=True, valor__gt=0).select_related('asignatura')
        criterios = Criterio.objects.filter(dimension__in=dimensiones).select_related('dimension')
        actividades = Actividad.objects.filter(criterio__in=criterios).select_related('criterio', 'monitoreo')
        calificaciones = Calificacion.objects.filter(actividad__in=actividades, asignaturaUser__user=user).select_related('actividad')

        # Prepare data structures for response
        per_data = []

        for per in monitoreos:
            dim_data = []
            for dim in dimensiones:
                crit_data = []
                for crit in criterios.filter(dimension=dim):
                    act_data = []
                    util__actividad=actividades.filter(criterio=crit, monitoreo=per)
                    #print(str(util__actividad[0].valor)+" normal ")
                    for act in util__actividad:
                        cal_data = []
                        calificaciones_act = calificaciones.filter(actividad=act)
                        calificacionAdicion = calificaciones_act.aggregate(total=Sum('valor'))['total'] or 0
                        #<<<Hacer>>>
                        if dim.nombre == 'hacer':
                            all_act = actividades.filter(criterio=crit)
                            MPADD = sum((MAXIMO_PUNTAJE * item.nivel_pertinencia) * item.multiplicador for item in all_act)
                            multiplicaor_pertinente_ideal = (MAXIMO_PUNTAJE * act.nivel_pertinencia) * act.multiplicador
                            act.valor = (multiplicaor_pertinente_ideal / MPADD) * MAXIMO_PUNTAJE
                        #<<<Fin Hacer>>>
                        for cal in calificaciones_act:
                            cal_data.append({'id':cal.id,'valor': cal.valor})

                        if cal_data:
                            act_ideal = (act.valor if len(calificaciones_act) else 0)
                            act_total = calificacionAdicion*act.valor/(len(calificaciones_act)*MAXIMO_PUNTAJE) 
                           
                            act_data.append(newJson(serializados.actividad(act), [{
                                'calificaciones': cal_data,
                                'conversion': 
                                {
                                    'ideal': act_ideal,
                                    'total': act_total
                                }
                            }]))
                           
                    if act_data:
                        crit_total = (sum(act['conversion']['total'] for act in act_data)) 
                        crit_ideal = (sum(act['conversion']['ideal'] for act in act_data))
                        crit_data.append(newJson(serializados.criterio(crit), [{
                            'actividades': act_data,
                            'conversion': 
                            {
                                'ideal': crit_ideal * crit.valor/ MAXIMO_PUNTAJE,
                                'total': crit_total * crit.valor/ MAXIMO_PUNTAJE
                            }
                        }]))
                if crit_data:
                    dim_total = sum(crit['conversion']['total'] for crit in crit_data)
                    dim_ideal = sum(crit['conversion']['ideal'] for crit in crit_data)
                    dim_data.append(newJson(serializados.dimension(dim), [{
                        'criterios': crit_data,
                        'conversion': 
                        {
                            'ideal': dim_ideal * dim.valor/ MAXIMO_PUNTAJE,
                            'total': dim_total * dim.valor/ MAXIMO_PUNTAJE,
                        }
                    }]))

            if dim_data:
                monitoreo_total = sum(dim['conversion']['total'] for dim in dim_data) 
                monitoreo_ideal = sum(dim['conversion']['ideal'] for dim in dim_data) 
                RAE = monitoreo_ideal * 100 / MAXIMO_PUNTAJE
                RAEO= monitoreo_total * 100 / MAXIMO_PUNTAJE

                per_data.append(newJson(serializados.monitoreo(per),[{
                    'dimensiones': dim_data,
                    'conversion': {
                        'Total': monitoreo_total,
                        'ideal': monitoreo_ideal,
                        'RAEO': RAEO,
                        'RAE': RAE
                    }
                }]))

        dimensiones_data = []
        resultadoFinal = 0
        for dim in Dimension.objects.filter(asignatura=asignatura):
            adicion = 0
            for per in per_data:
                for pdim in per['dimensiones']:
                    if dim.nombre == pdim['nombre']:
                        adicion += pdim['conversion']['total']
            resultadoFinal += adicion
            dimensiones_data.append(newJson(serializados.dimension(dim), [{'total': adicion}]))

        response_data = {
            'message': "success",
            'response': {
                'monitoreos': per_data,
                'global': {'dimensiones': dimensiones_data, 'resultado': resultadoFinal},
                'user': serializados.user(user)
            }
        }
        return JsonResponse(response_data)

    except Exception as e:
        print(e)
        return JsonResponse({'message': "error", 'response': str(e)}, status=500)


@login_required
@teacher_required
@require_http_methods(["GET"])
def GET_Grupal(request, id):
    try:
        asignatura_id = request.session.get('id-asignatura')
        asignatura = get_object_or_404(Asignatura, id=asignatura_id)

        # Prefetch monitoreos, actividades, criterios, y calificaciones
        monitoreos = Monitoreo.objects.filter(asignatura=asignatura).prefetch_related(
            Prefetch('actividades', queryset=Actividad.objects.select_related('criterio__dimension').prefetch_related(
                Prefetch('calificaciones', queryset=Calificacion.objects.all())
            ))
        )

        resultados_monitoreos = []

        for monitoreo in monitoreos:
            dimensiones_data = {}
            utils_actividad= monitoreo.actividades.all()
            for actividad in utils_actividad:
                
                dimension = actividad.criterio.dimension
                criterio = actividad.criterio

                if dimension.id not in dimensiones_data:
                    dimensiones_data[dimension.id] = {
                        'dimension': dimension,
                        'criterios': {}
                    }

                if criterio.id not in dimensiones_data[dimension.id]['criterios']:
                    dimensiones_data[dimension.id]['criterios'][criterio.id] = {
                        'criterio': criterio,
                        'actividades': []
                    }
                # Aplicar conversión si la dimensión es 'hacer'
                if dimension.nombre == 'hacer':
                    actividades = Actividad.objects.filter(criterio=criterio)
                    MPADD = sum((MAXIMO_PUNTAJE * act.nivel_pertinencia) * act.multiplicador for act in actividades)
                    multiplicaor_pertinente_ideal = (MAXIMO_PUNTAJE * actividad.nivel_pertinencia) * actividad.multiplicador

                    valor_equivalente_ideal = (multiplicaor_pertinente_ideal / MPADD) *  MAXIMO_PUNTAJE if MPADD else 0
                    actividad.valor = valor_equivalente_ideal

                
                
                # Calcular la conversión de la actividad
                calificaciones = actividad.calificaciones.all()
                calificacion_total = calificaciones.aggregate(
                    total_calificaciones=Sum('valor', output_field=FloatField()),
                    count_calificaciones=Count('valor')
                )

                total_calificaciones = calificacion_total['total_calificaciones'] or 0
                count_calificaciones = calificacion_total['count_calificaciones'] or 1  # evitar división por cero

                act_conversion_total = (total_calificaciones * actividad.valor) / (count_calificaciones * MAXIMO_PUNTAJE)
                actividad_data = {
                    'conversion': {
                        'ideal': count_calificaciones * MAXIMO_PUNTAJE * actividad.valor / (count_calificaciones * MAXIMO_PUNTAJE),
                        'total': act_conversion_total
                    }
                }
                dimensiones_data[dimension.id]['criterios'][criterio.id]['actividades'].append(actividad_data)

            resultados_dimensiones = []
            for dimension_id, dimension_info in dimensiones_data.items():
                criterios_data = []
                for criterio_id, criterio_info in dimension_info['criterios'].items():
                    actividades_data = criterio_info['actividades']
                    if actividades_data:
                        crit_conversion_total = sum(act['conversion']['total'] for act in actividades_data)
                        criterios_data.append({
                            'conversion': {
                                'ideal': sum(act['conversion']['ideal'] for act in actividades_data) * criterio_info['criterio'].valor / MAXIMO_PUNTAJE,
                                'total': crit_conversion_total * criterio_info['criterio'].valor / MAXIMO_PUNTAJE
                            }
                        })

                if criterios_data:
                    dim_conversion_total = sum(crit['conversion']['total'] for crit in criterios_data)
                    resultados_dimensiones.append({
                        'nombre': dimension_info['dimension'].nombre,
                        'conversion': {
                            'ideal': sum(crit['conversion']['ideal'] for crit in criterios_data) * dimension_info['dimension'].valor / MAXIMO_PUNTAJE,
                            'total': dim_conversion_total * dimension_info['dimension'].valor / MAXIMO_PUNTAJE
                        }
                    })

            # Cálculo de RAO y RAEO para el período
            monitoreo_conversion_total = sum(dim['conversion']['total'] for dim in resultados_dimensiones)
            monitoreo_conversion_ideal = sum(dim['conversion']['ideal'] for dim in resultados_dimensiones)
            ideal = monitoreo_conversion_ideal * 100 / MAXIMO_PUNTAJE
            obtenido = monitoreo_conversion_total * 100 / MAXIMO_PUNTAJE

            monitoreo_conversion_ideal
            
            resultados_monitoreos.append(newJson(serializados.monitoreo(monitoreo), [{
                'dimensiones': resultados_dimensiones,
                'conversion': {
                    'total': monitoreo_conversion_total,
                    'ideal': monitoreo_conversion_ideal,
                    'RAEO': obtenido,
                    'RAE':  ideal
                }}]))

        # Cálculo del rendimiento global por dimensión
        dimensiones_data = []
        resultadoFinal = 0
        for dim in Dimension.objects.filter(asignatura=asignatura):
            adicion = 0
            for per in resultados_monitoreos:
                for pdim in per['dimensiones']:
                    if dim.nombre == pdim['nombre']:
                        adicion += pdim['conversion']['total']
            resultadoFinal += adicion
            dimensiones_data.append(newJson(serializados.dimension(dim), [{'total': adicion}]))

        response_data = {
            'message': "success",
            'response': {
                'monitoreos': resultados_monitoreos,
                'global': {'dimensiones': dimensiones_data, 'resultado': resultadoFinal}
            }
        }
        return JsonResponse(response_data)
    except Exception as e:
        print(e)
        return JsonResponse({'message': 'error', 'error': str(e)})


""" 
@login_required
@teacher_required
@require_http_methods(["GET"])
def getInformacionPeriodica(request, user_id):
    try:
        user = get_object_or_404(User, id=user_id)
        asignatura_id = request.session.get('instance__asignatura')
        asignatura = get_object_or_404(Asignatura, id=asignatura_id)

        per_data = []
        for per in monitoreo.objects.filter(asignatura=asignatura):
            dim_data = []
            dimensiones = Dimension.objects.filter(asignatura=asignatura)
            for dim in dimensiones:
                if dim.status == True and dim.valor > 0:
                    crit_data = []
                    criterios = Criterio.objects.filter(dimension=dim)
                    for crit in criterios:
                        act_data = []
                        actividades = Actividad.objects.filter(criterio=crit, monitoreo=per)
                        for act in actividades:
                            cal_data = []
                            calificacionAdicion = 0
                            calificaciones = Calificacion.objects.filter(actividad=act, asignaturaUser__user=user)

                            if dim.descripcion == 'hacer':
                                all_act = Actividad.objects.filter(criterio=crit)
                                multiplicaor_pertinente = 0
                                MPADD = 0
                                for item in all_act:
                                    MPADD += (MAXIMO_PUNTAJE * item.nivel_pertinencia) * item.multiplicador

                                multiplicaor_pertinente_ideal = ((MAXIMO_PUNTAJE * act.nivel_pertinencia) * act.multiplicador)

                                if MPADD != 0:
                                    valor_equivalente_ideal = (multiplicaor_pertinente_ideal / MPADD) * crit.valor
                                else:
                                    valor_equivalente_ideal = 0  # Evitar división por cero
                                    
                                act.valor = valor_equivalente_ideal

                                cal_data.append({'valor': valor_equivalente_ideal})

                            # Calculo para actividades
                            for cal in calificaciones:
                                calificacionAdicion += cal.valor
                                cal_data.append({'valor': cal.valor})
                            if cal_data:
                                act_total = (calificacionAdicion * act.valor) / (MAXIMO_PUNTAJE)
                                act_ideal = (len(calificaciones) * MAXIMO_PUNTAJE * act.valor) / (len(calificaciones) * MAXIMO_PUNTAJE)
                                act_data.append({
                                    'descripcion': act.descripcion,
                                    'valor': act.valor,
                                    'calificaciones': cal_data,
                                    'conversion': {
                                        'add': calificacionAdicion,
                                        'ideal': act_ideal,
                                        'total': act_total
                                    }
                                })
                        #<end actividad>
                        if act_data:
                            crit_total = sum(act['conversion']['total'] for act in act_data)
                            crit_ideal = sum(act['conversion']['ideal'] for act in act_data) / len(act_data) if act_data else crit.valor
                            crit_data.append({
                                'descripcion': crit.descripcion,
                                'valor': crit.valor,
                                'actividades': act_data,
                                'conversion': {
                                    'add': sum(act['conversion']['add'] for act in act_data),
                                    'ideal': crit_ideal,
                                    'total': crit_total
                                }
                            })
                    #<end criterio>
                    if crit_data:
                        dim_total = sum(crit['conversion']['total'] for crit in crit_data)
                        dim_ideal = sum(crit['conversion']['ideal'] for crit in crit_data) * dim.valor / MAXIMO_PUNTAJE
                        dim_data.append({
                            'descripcion': dim.descripcion,
                            'valor': dim.valor,
                            'criterios': crit_data,
                            'conversion': {
                                'add': sum(crit['conversion']['add'] for crit in crit_data),
                                'ideal': dim_ideal,
                                'total': dim_total
                            }
                        })
            #<end dimension>
            if dim_data:
                monitoreo_total = sum(dim['conversion']['total'] for dim in dim_data)
                monitoreo_ideal = sum(dim['conversion']['ideal'] for dim in dim_data)
                per_data.append({
                    'descripcion': per.descripcion,
                    'dimensiones': dim_data,
                    'conversion': {
                        'Total': monitoreo_total,
                        'ideal': monitoreo_ideal,
                        'R.A.E.O': (monitoreo_total / MAXIMO_PUNTAJE) * 100,
                        'R.A.E': (monitoreo_ideal / MAXIMO_PUNTAJE) * 100
                    }
                })
        #<end monitoreo>
        return JsonResponse({'message': "success", 'response': {'monitoreos': per_data, 'user': serializados.user(user)}})

    except Exception as e:
        print(e)
        return JsonResponse({'message': "error", 'response': str(e)}, status=500)
"""