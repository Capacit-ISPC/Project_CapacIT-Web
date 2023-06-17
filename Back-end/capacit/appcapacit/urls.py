from django.urls import path, include, re_path
from appcapacit import views
#from .views import LoginView, LogoutView, SignupView, ProfileView, ListarUsuarios
#from .views import ListarCurso, agregarCurso

# urlpatterns = [
#     # Auth views
#     # path('auth/login/',LoginView.as_view(), name='auth_login'),

#     # path('auth/logout/',LogoutView.as_view(), name='auth_logout'),
#     # #path('auth/reset/',include('django_rest_passwordreset.urls',namespace='password_reset')),
#     # path('auth/registro/',SignupView.as_view(), name='auth_signup'),
#     # path('user/profile/',ProfileView.as_view(), name='user_profile'),
#     # path('usuarios/',ListarUsuarios.as_view(), name='listar_usuarios'),

#     # path('usuarios/',ListarCurso.as_view({'get': 'list'}), name='listar_cursos'),
#     # path('usuarios/',agregarCurso.as_view(), name='agregar_curso'),
    
# ]    

urlpatterns = [
    path('create/', views.CreateUserView.as_view(), name='create'),
    path('token/', views.CreateTokenView.as_view(), name='token'),
    path('me/', views.ManageUserView.as_view(), name='me'),
]