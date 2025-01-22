from django.contrib import messages
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import PasswordChangeView
from django.db import IntegrityError
from .forms.user import CustomUserCreationsForm, UserInformation, UserProfileForm
import logging

logger = logging.getLogger(__name__)

# Vista para el registro de usuarios
def Signup(request):
    if request.method == 'GET':
        form = CustomUserCreationsForm()
        return render(request, 'signup/index.html', {'form': form})
    
    if request.method == 'POST':
        form = CustomUserCreationsForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, '¡Registro exitoso! Por favor inicia sesión.')
            return redirect('login')
        else:
            messages.error(request, 'Error al crear usuario. Por favor, inténtalo de nuevo.')
            return render(request, 'signup/index.html', {'form': form})

    return render(request, 'signup/index.html', {'form': ''})

# Vista para la configuración del usuario (requiere autenticación)
@login_required
def Setting_Index(request):
    try:
        if request.method == 'GET':
            return render(request, 'setting/index.html')
    except Exception as e:
        logger.error(f'Error al cargar la configuración: {e}')
        messages.error(request, 'Error al cargar la configuración.')
        return redirect('index')

# Vista para ver la información del usuario (requiere autenticación)
@login_required
def User_ViewInformation(request):
    try:
        if request.method == 'GET':
            form = UserInformation(instance=request.user)
            return render(request, 'setting/information/index.html', {'form': form})
        elif request.method == 'POST':
            form = UserInformation(request.POST, instance=request.user)
            if form.is_valid():
                form.save()
                messages.success(request, '¡Usuario actualizado exitosamente!')
            else:
                messages.error(request, 'Error al actualizar el usuario. Por favor, inténtalo de nuevo.')
            return redirect('User_ViewInformation')
    except Exception as e:
        logger.error(f'Error al ver/actualizar información del usuario: {e}')
        messages.error(request, 'Error al procesar la solicitud. Por favor, inténtalo de nuevo.')
        return redirect('User_ViewInformation')

# Vista para cambiar la contraseña del usuario (requiere autenticación)
class User_ChangePassword(PasswordChangeView):
    template_name = 'setting/password/index.html'
    
    def get_success_url(self):
        return self.request.path

    def form_valid(self, form):
        messages.success(self.request, '¡Contraseña cambiada con éxito!')
        return super().form_valid(form)
    
    def form_invalid(self, form):
        messages.error(self.request, 'Ha ocurrido un error al cambiar la contraseña. Por favor, inténtalo de nuevo.')
        return super().form_invalid(form)

# Vista para ver el perfil del usuario (requiere autenticación)
@login_required
def User_ViewProfile(request):
    try:
        if request.method == 'GET':
            form = {
                'username': request.user.username,
                'avatar': request.user.profile.avatar,
                'email': request.user.email
            }
            return render(request, 'setting/profile/index.html', {'form': form})
    except Exception as e:
        logger.error(f'Error al cargar el perfil del usuario: {e}')
        messages.error(request, 'Error al cargar el perfil.')
        return redirect('index')

# Vista para actualizar el perfil del usuario (requiere autenticación)
@login_required
def User_UpdateProfile(request):
    try:
        if request.method == 'POST':
            form = UserProfileForm(request.POST, request.FILES, instance=request.user)
            if form.is_valid():
                form.save()
                messages.success(request, '¡Perfil actualizado exitosamente!')
            else:
                messages.error(request, 'Error al actualizar el perfil. Por favor, inténtalo de nuevo.')
            return redirect('User_ViewProfile')
    except IntegrityError:
        messages.error(request, 'El nombre de usuario ya existe.')
        return redirect('User_ViewProfile')
    except Exception as e:
        logger.error(f'Error al actualizar usuario: {e}')
        messages.error(request, 'Error al actualizar el perfil. Por favor, inténtalo de nuevo.')
        return redirect('User_ViewProfile')

    return redirect('User_ViewProfile')
