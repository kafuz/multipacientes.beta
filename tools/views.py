from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'tools/index.html', {})

# Create your views here.
def viewMoyers(request):
    return render(request, 'tools/moyers/index.html', {})