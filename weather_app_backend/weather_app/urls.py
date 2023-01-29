from django.urls import path

from weather_app.views import Login, GetWeatherData

urlpatterns = [
    path('login', Login.as_view(), name="login"),
    path('get_weather_data', GetWeatherData.as_view(), name="get_weather_data")
]
