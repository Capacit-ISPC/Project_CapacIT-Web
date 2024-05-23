from rest_framework import generics
from rest_framework.permissions import AllowAny
from apps.base.api import GeneralListApiView
from apps.courses.api.serializers.general_serializers import TutorSerializer, CategorySerializer

class TutorListApiview(GeneralListApiView):
    serializer_class = TutorSerializer
    permission_classes = (AllowAny,)
    
class CategoryListApiview(GeneralListApiView):
    serializer_class = CategorySerializer
    permission_classes = (AllowAny,)

    