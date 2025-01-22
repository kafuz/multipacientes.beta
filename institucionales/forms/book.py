from django import forms
from public.models.Institutional import Institucion, Programa, Asignatura

class RegisterInstitucion(forms.ModelForm):
    class Meta:
        model = Institucion
        fields = ['nit', 'nombre']  # Incluye solo los campos necesarios

class RegisterPrograma(forms.ModelForm):
    class Meta:
        model = Programa
        fields = ['nombre']
        labels = { 'nombre': 'Nombre' }

class RegisterAsignatura(forms.ModelForm):
    class Meta:
        model = Asignatura
        fields = ['nombre']
        labels = { 'nombre': 'Nombre' }