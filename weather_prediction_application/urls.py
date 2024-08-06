# weather_prediction_application/urls.py
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('weather_prediction_app.urls')),
    path('weather/', include('weather_prediction_app.urls')),    # Include app URLs without '/weather' prefix
]
