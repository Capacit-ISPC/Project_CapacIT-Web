from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from apps.users.api.serializers import  CustomUserSerializer, CustomUserRegisterSerializer
from apps.users.models import CustomUser


class Login(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'error': 'Por favor, proporcione tanto el correo electrónico como la contraseña'}, 
                            status=status.HTTP_400_BAD_REQUEST)
        # Autenticar al usuario
        user = authenticate(request, email=email, password=password)
        if user:
            if user.is_active:
                # Generar o obtener el token 
                token, created = Token.objects.get_or_create(user=user)
                user_serializer = CustomUserSerializer(user)
                if created:
                    return Response({
                        'token': token.key,
                        'user': user_serializer.data,
                        'msj': "Inicio de sesión exitoso"
                    }, status=status.HTTP_201_CREATED)
                else:
                    token.delete()
                    token = Token.objects.create(user=user)
                    return Response({
                        'token': token.key,
                        'user': user_serializer.data,
                        'msj': "Inicio de sesión exitoso"
                    }, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': 'El usuario no puede iniciar sesión'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({'error': "Correo electrónico o contraseña incorrectos"}, status=status.HTTP_400_BAD_REQUEST)



class Register(APIView):
    model = CustomUser
    serializer_class = CustomUserRegisterSerializer
    permission_classes=(AllowAny,)
    
    def post(self, request):
        user_serializer = self.serializer_class(data=request.data)
        if user_serializer.is_valid():
            # Guardar el usuario en la base de datos
            user = user_serializer.save()
            
            # Crear un token para el usuario si no existe
            try:
                token = Token.objects.get(user=user)
            except Token.DoesNotExist:
                token = Token.objects.create(user=user)
            
            return Response({
                'token': token.key,
                'user': user_serializer.data,
                'message': 'Usuario registrado correctamente.'
            }, status=status.HTTP_201_CREATED)
        
        return Response({
            'message': 'Hay errores en el registro',
            'errors': user_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class Logout(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            # Obtener el token de autenticación del usuario
            token = Token.objects.get(user=request.user)
            # Eliminar el token de autenticación
            token.delete()
            return Response({'message': 'Sesión cerrada correctamente.'}, status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return Response({'error': 'El usuario no tiene un token de autenticación válido.'}, status=status.HTTP_400_BAD_REQUEST)



