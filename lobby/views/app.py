from django.shortcuts import render
from django.shortcuts import  get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from public.decorators.book import teacher_required 
from public.models.Institutional import Institucion, Programa, Asignatura

@login_required
@teacher_required
def index(request, fk):
    try:
        if request.method == 'GET':
            institucion=get_object_or_404(Institucion, pk=request.session['id-institucion'])
            programa=get_object_or_404(Programa, pk=request.session['id-programa'])
            asignatura=get_object_or_404(Asignatura, pk=fk)
            data= { 'institucion': institucion, 'programa':programa, 'asignatura':asignatura }
            #save fk
            request.session['id-asignatura']=fk
            return render(request, 'start/index.html', data)
    except Exception as e:
        messages.error(request, str(e))
        return render(request, 'home/index.html')
        
@teacher_required
@login_required
def Reload__start(request):
    return render(request, 'start/index.html')



