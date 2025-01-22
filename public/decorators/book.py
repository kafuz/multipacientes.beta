from functools import wraps
from django.http import JsonResponse
from django.core.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from public.models.Institutional import Institucion

def teacher_required(view_func):
    """
    Decorador que verifica si el usuario tiene acceso a la institución almacenada en la sesión.
    """
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        # Obtener el ID de la institución desde la sesión
        institucion_id = request.session.get('id-institucion')
        if not institucion_id:
            raise PermissionDenied("No se pudo determinar la institución asociada.")
        # Obtener la institución y verificar el acceso del usuario
        institucion = get_object_or_404(Institucion, id=institucion_id)
        if not institucion.user == request.user:
            raise PermissionDenied("No tienes permiso para realizar esta acción.")
        return view_func(request, *args, **kwargs)

    return _wrapped_view