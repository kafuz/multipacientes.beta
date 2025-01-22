from django.contrib.auth.models import User 
from django.contrib.auth.forms import UserCreationForm
from django.utils.translation import gettext as _
from django import forms

class CustomUserCreationsForm(UserCreationForm):
    password1 = forms.CharField(
        label='Password',
        strip=False,
        widget=forms.PasswordInput,
        help_text=None
    )
    password2 = forms.CharField(
        label='Confirm Password',
        strip=False,
        widget=forms.PasswordInput,
        help_text=None
    )

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Eliminar cualquier campo no deseado
        if 'usable_password' in self.fields:
            del self.fields['usable_password']

    def clean_password1(self):
        password1 = self.cleaned_data.get('password1')
        if len(password1) < 8:
            raise forms.ValidationError(_("Password must be at least 8 characters long"))
        return password1

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user

# Formulario para información del usuario
class UserInformation(forms.ModelForm):
    SEXO_CHOICES = [ 
        ('M', 'Masculino'),
        ('F', 'Femenino'),
        ('O', 'Otro'),
    ]
    sexo = forms.ChoiceField(choices=SEXO_CHOICES, widget=forms.RadioSelect)
    address = forms.CharField(max_length=150, required=False, label='Dirección')
    location = forms.CharField(max_length=150, required=False, label='Ubicación')
    telephone = forms.CharField(max_length=50, required=False, label='Teléfono')
    
    class Meta:
        model = User
        fields = ['first_name', 'last_name']

    def __init__(self, *args, **kwargs):
        super(UserInformation, self).__init__(*args, **kwargs)
        if self.instance.profile.address:
            self.fields['address'].initial = self.instance.profile.address
        if self.instance.profile.location:
            self.fields['location'].initial = self.instance.profile.location
        if self.instance.profile.telephone:
            self.fields['telephone'].initial = self.instance.profile.telephone
        if self.instance.profile.sexo:
            self.fields['sexo'].initial = self.instance.profile.sexo

    # Guardar la información del perfil junto con el usuario
    def save(self, commit=True):
        user = super(UserInformation, self).save(commit=commit)
        if commit:
            profile = user.profile
            profile.address = self.cleaned_data.get('address', profile.address)
            profile.location = self.cleaned_data.get('location', profile.location)
            profile.telephone = self.cleaned_data.get('telephone', profile.telephone)
            profile.sexo = self.cleaned_data.get('sexo', profile.sexo)
            profile.save()
        return user

# Formulario para el perfil del usuario
class UserProfileForm(forms.ModelForm):
    avatar = forms.ImageField(required=False)

    class Meta:
        model = User
        fields = ['username', 'email']
        labels = {'username': 'Nombre de usuario'}

    def __init__(self, *args, **kwargs):
        super(UserProfileForm, self).__init__(*args, **kwargs)
        if self.instance.profile.avatar:
            self.fields['avatar'].initial = self.instance.profile.avatar

    # Guardar el avatar del perfil junto con el usuario
    def save(self, commit=True):
        user = super(UserProfileForm, self).save(commit=commit)
        if commit:
            if 'avatar' in self.cleaned_data:
                user.profile.avatar = self.cleaned_data['avatar']
                user.profile.save()
        return user
