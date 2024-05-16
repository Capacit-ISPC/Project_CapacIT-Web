from rest_framework import status
from rest_framework.response import Response
from rest_framework import generics, authentication, permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.settings import api_settings
from django.contrib.auth import authenticate

from appcapacit.serializers import (
    UserSerializer,
    AuthTokenSerializer,
    CourseSerializer,
    CourseDetailSerializer,
    UserTokenSerializer,
    CategorySerializer,
    TutorSerializer
)
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from appcapacit.models import Course, User,Tutor, Category
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes

class CreateUserView(generics.CreateAPIView):
    """Create a new user in the system."""
    serializer_class = UserSerializer

class ManageUsersView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes= [permissions.IsAuthenticated]

    def get_object(self):
        return super().get_object()

class CreateTokenView(ObtainAuthToken):
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

#########################################################################
""" def allow_access_without_authentication(view_func):
    decorated_view_func = permission_classes([AllowAny])(view_func)
    return decorated_view_func """
"""views for the Course APIs"""
#@allow_access_without_authentication

class CourseViewSet(viewsets.ModelViewSet):
    """View for managing course API."""
    serializer_class = CourseDetailSerializer
    queryset = Course.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes =[IsAuthenticated]

    def get_queryset(self):
        """Retrieve Courses for authenticated user."""
        return self.queryset.all().order_by('-id')

    def get_serializer_class(self):
        """Return the serializer class for the request."""
        if self.action == 'list':
            return CourseSerializer
        return self.serializer_class
    
##Category
#@allow_access_without_authentication
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

##Tutor
#@allow_access_without_authentication
class TutorViewSet(viewsets.ModelViewSet):
    queryset = Tutor.objects.all()
    serializer_class = TutorSerializer


# Login
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
                user_serializer = UserTokenSerializer(user)

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
    model = User
    serializer_class = UserSerializer
    permission_classes=(AllowAny,)
    
    def post(self, request):
        user_serializer =self.serializer_class(data=request.data)
        if user_serializer.is_valid():
            user = user_serializer.save()
            # Crear un carrito para el usuario recién registrado
            #Cart.objects.create(user=user)
            return Response({
                'message': 'Usuario registrado correctamente.'
            }, status=status.HTTP_201_CREATED)
        return Response({
            'message': 'Hay errores en el registro',
            'errors': user_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class Logout(APIView):

    def get(self, request,*args,**kwargs):
        token = request.GET.get('token')# el token se debe enviar como una variable en la petision 
        token = Token.objects.filter(key = token).first
        if token:
            user= token.user
