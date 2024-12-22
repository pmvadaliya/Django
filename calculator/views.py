from django.shortcuts import render
from django.http import JsonResponse

def home(request):
    return render(request, 'calculator/index.html')

def calculate(request):
    if request.method == "POST":
        expression = request.POST.get('expression')
        try:
            result = eval(expression)
            return JsonResponse({'result': result})
        except Exception as e:
            return JsonResponse({'error': 'Invalid expression'})
