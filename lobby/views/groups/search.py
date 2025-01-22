from django.contrib.auth.decorators import login_required
from django.shortcuts import  get_object_or_404
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.contrib.auth.models import User 
from public.models.Institutional import  Asignatura
from django.db.models import Q
from public.decorators.book import teacher_required
from public import serializados

#Search ALUMNOS
@login_required
@teacher_required 
@require_http_methods(["GET"])
def GET_Alumnos(request):
    try:
        asignatura = get_object_or_404(Asignatura, id= request.session.get('id-asignatura'))
        # <-> variables
        boolean = int(request.GET.get('bool'))
        termino_busqueda = request.GET.get('termino_busqueda').strip()
        # Construir la consulta base
        base_query = User.objects.exclude(id=request.user.id).order_by('first_name').distinct()

        if boolean == 0:
            # Usuarios que <NO> están en la asignatura
            base_query = base_query.exclude(asignaturauser__asignatura=asignatura)
        elif boolean == 1:
            # Usuarios que <SI> están en la asignatura
            base_query = base_query.filter(asignaturauser__asignatura=asignatura)

        # Construir la consulta de búsqueda
        if termino_busqueda:
            partes = termino_busqueda.split()
            query = Q(first_name__istartswith=partes[0]) | Q(last_name__icontains=partes[0])
            if len(partes) > 1:
                query &= Q(last_name__icontains=partes[1])
            resultados = base_query.filter(query)
        else:
            resultados = base_query

        informacion = [ serializados.user(usuario) for usuario in resultados ]
        return JsonResponse({'informacion': informacion})
    except (ValueError, TypeError) as e:
        return JsonResponse({'message': 'error', 'response': str(e)})
    except Exception as e:
        print(e)
        return JsonResponse({'message': 'error', 'response': 'Ocurrió un error inesperado.'}, status=500)

