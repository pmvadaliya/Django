import requests
from django.shortcuts import render
from django.http import JsonResponse

def home(request):
    return render(request, 'weather/index.html')

def get_weather(request):
    if request.method == 'POST':
        city = request.POST.get('city')
        api_key = '065d8a371772da15168729392eeedfda'
        url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric'

        response = requests.get(url)
        data = response.json()

        if data.get('cod') != 200:
            return JsonResponse({'error': 'City not found'}, status=400)

        weather = {
            'city': data.get('name'),
            'country': data.get('sys', {}).get('country'),
            'temperature': data['main']['temp'],
            'humidity': data['main']['humidity'],
            'wind_speed': data['wind']['speed'],
            'description': data['weather'][0]['description'],
            'pressure': data['main']['pressure'],
            'clouds': data['clouds']['all'],
            'sunrise': data['sys']['sunrise'],
            'sunset': data['sys']['sunset'],
        }

        return JsonResponse(weather)
