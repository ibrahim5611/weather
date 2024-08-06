import requests
from django.shortcuts import render
from django.http import JsonResponse

def index(request):
    return render(request, 'weather_prediction_app/index.html')

def compare(request):
    return render(request, 'weather_prediction_app/compare.html')

def get_weather(request):
    city = request.GET.get('city')
    api_key = '1d39ee1577c61761e241248b06ce16c6'
    url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric'
    response = requests.get(url)
    data = response.json()
    return JsonResponse(data)

def get_weather_data(place):
    api_key = '1d39ee1577c61761e241248b06ce16c6'
    url = f"http://api.openweathermap.org/data/2.5/weather?q={place}&appid={api_key}&units=metric"
    response = requests.get(url)
    data = response.json()
    weather_info = {
        'place': place,
        'temperature': data['main']['temp'],
        'precipitation': data.get('rain', {}).get('1h', 0),
        'humidity': data['main']['humidity'],
        'wind_speed': data['wind']['speed'],
        'wind_direction': convert_wind_direction(data['wind']['deg']),
        'wind_degrees': data['wind']['deg'],
        'description': data['weather'][0]['description'],
    }
    return weather_info

def compare_weather(request):
    place1 = request.GET.get('place1')
    place2 = request.GET.get('place2')
    weather_data1 = get_weather_data(place1)
    weather_data2 = get_weather_data(place2)
    return JsonResponse({'place1': weather_data1, 'place2': weather_data2})

def convert_wind_direction(degrees):
    directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
    index = int((degrees + 22.5) // 45) % 8
    return directions[index]

def convert_degrees_to_direction(degrees):
    directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
    index = round(degrees / 45) % 8
    return directions[index]