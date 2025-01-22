###Serializados###

def handle_serialization_error(entity_name, exception):
    # Secuencias de escape para texto en color
    RED = '\033[91m'
    ORANGE = '\033[33m'
    RESET = '\033[0m'
    
    print(f"{RED}Error al serializar {entity_name}: {exception}{RESET}")
    return {'message': 'error', 'response': f'Ocurrió un error inesperado al serializar {entity_name}'}

# <<<Criterio>>>
def criterio(obj):
    try:
        return {
            'id': getattr(obj, 'id', None),
            'nombre': getattr(obj, 'nombre', None),
            'valor': getattr(obj, 'valor', None),
        }
    except AttributeError as e:
        return handle_serialization_error('Criterio', e)
    except Exception as e:
        return handle_serialization_error('Criterio', e)

# <<<Actividad>>>
def actividad(obj):
    try:
        return {
            'id': getattr(obj, 'id', None),
            'is_active': getattr(obj, 'is_active', None),
            'nombre': getattr(obj, 'nombre', None),
            'valor': getattr(obj, 'valor', None),
            'multiplicador': getattr(obj, 'multiplicador', None),
            'nivel_pertinencia': getattr(obj, 'nivel_pertinencia', None),
            'np_is': getattr(obj, 'np_is', None),
        }
    except AttributeError as e:
        return handle_serialization_error('Actividad', e)
    except Exception as e:
        return handle_serialization_error('Actividad', e)

# <<<Calificación>>>
def calificacion(obj):
    try:
        return {
            'id': getattr(obj, 'id', None),
            'descripcion': getattr(obj, 'descripcion', None),
            'anotacion': getattr(obj, 'anotacion', None),
            'valor': getattr(obj, 'valor', None),
            'actividad_id': getattr(obj, 'actividad_id', None),
        }
    except AttributeError as e:
        return handle_serialization_error('Calificacion', e)
    except Exception as e:
        return handle_serialization_error('Calificacion', e)

# <<<CustumerUser>>>
def user(obj):
    try:
        return {
            'id': getattr(obj, 'id', None),
            'username': getattr(obj, 'username', None),
            'first_name': getattr(obj, 'first_name', None),
            'last_name': getattr(obj, 'last_name', None),
            'email': getattr(obj, 'email', None),
            'telephone': getattr(obj.profile, 'telephone', None),
            'avatar': getattr(obj.profile.avatar, 'url', None) if obj.profile and obj.profile.avatar else None,
            'address': getattr(obj.profile, 'address', None),
            'sexo': getattr(obj.profile, 'sexo', None),
        }
    except AttributeError as e:
        return handle_serialization_error('CustumerUser', e)
    except Exception as e:
        return handle_serialization_error('CustumerUser', e)
    
# <<<dimension>>>
def dimension(obj):
    try:
        return {
                'id': getattr(obj, 'id', None),
                'is_active': getattr(obj, 'is_active', None),
                'nombre': getattr(obj, 'nombre', None),
                'valor': getattr(obj, 'valor', None),
                'asignatura': getattr(obj.asignatura, 'id', None) if obj.asignatura else None,
            }
    except AttributeError as e:
        return handle_serialization_error('dimension', e)
    except Exception as e:
        return handle_serialization_error('dimension', e)

from datetime import date
# <<<monitoreo>>>
def monitoreo(obj):
    try:
        hoy = date.today()
        valor = -1  # Inicializa la variable con un valor predeterminado
        
        # Determina el estado del período
        if obj.fecha_inicio < hoy and obj.fecha_fin < hoy:
            valor = 0  # Periodo ya terminó
        elif obj.fecha_inicio <= hoy and obj.fecha_fin >= hoy:
            valor = 1  # Periodo en curso
        elif obj.fecha_inicio > hoy and obj.fecha_fin > hoy:
            valor = 2  # Periodo aún no ha comenzado

        return {
            'nombre': getattr(obj, 'nombre', None),
            'color': getattr(obj, 'color', None),
            'fecha_inicio': getattr(obj.fecha_inicio, 'strftime', lambda fmt: '')('%Y-%m-%d'),
            'fecha_fin': getattr(obj.fecha_fin, 'strftime', lambda fmt: '')('%Y-%m-%d'),
            'status': valor
        }
    except AttributeError as e:
        return handle_serialization_error('periodo', e)
    except Exception as e:
        return handle_serialization_error('periodo', e)
    
# <<<niveles>>>
def nivel(obj):
    try:
        return {
                'id': getattr(obj, 'id', None),
                'nombre': getattr(obj, 'nombre', None),
                'valorMinimo': getattr(obj, 'valorMinimo', None),
                'valorMaximo': getattr(obj, 'valorMaximo', None),
                'color': getattr(obj, 'color', None),
                'rubrica': getattr(obj.rubrica, 'id', None) if obj.rubrica else None,
            }
    except AttributeError as e:
        return handle_serialization_error('nivel', e)
    except Exception as e:
        return handle_serialization_error('nivel', e)