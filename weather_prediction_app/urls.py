# weather_prediction_app/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # This will now be accessible at '/'
    path('compare/', views.compare, name='compare'),  # Accessible at '/compare/'
    path('compare_weather/', views.compare_weather, name='compare_weather'),  # Accessible at '/compare_weather/'
    path('get_weather/', views.get_weather, name='get_weather'),  # Accessible at '/get_weather/'
]
