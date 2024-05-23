from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

from django.contrib.auth import authenticate

class CustomAuthToken(ObtainAuthToken):
    
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, email=email, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'email': user.email,
                'password': user.password,
                'id': user.id
            })
        else:
            return Response({'error': 'Credenciales inválidas'}, status=400)