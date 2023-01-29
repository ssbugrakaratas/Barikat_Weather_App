
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated

from rest_framework.views import APIView
from django.contrib.auth import authenticate, login
import http.client
import xmltodict
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token


class Login(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = dict()
        try:
            body = request.data
            user = authenticate(username=body['username'], password=body['password'])
            if user is not None:
                response['username'] = body['username']
                login(request, user)
                token, created = Token.objects.get_or_create(user=user)
                response['token'] = 'Token ' + str(token.key)
                response['status'] = True
            else:
                response['status'] = False
        except Exception as e:
            print(str(e))
            response['status'] = False
        return JsonResponse(response, safe=True)


class GetWeatherData(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        response = dict()
        key = '9a2cf37043174f9c9f3143101232901'
        try:
            body = request.query_params
            days = body['day']
            city = body['city']
            conn = http.client.HTTPSConnection("api.worldweatheronline.com")
            payload = ''
            headers = {}
            conn.request("GET", """/premium/v1/weather.ashx?q={city_name}&key={key}&num_of_days={days}""".format(city_name=city, days=days, key=key),
                         payload, headers)
            res = conn.getresponse()
            data = xmltodict.parse(res.read().decode("utf-8"))

            response['data'] = data["data"]
            response['status'] = True
        except Exception as e:
            print(str(e))
            response['status'] = False
        return JsonResponse(response, safe=True)
