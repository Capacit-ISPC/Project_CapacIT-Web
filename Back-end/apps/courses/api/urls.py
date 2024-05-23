from django.urls import path

from apps.courses.api.views.general_views import TutorListApiview, CategoryListApiview
from apps.courses.api.routers import *

urlpatterns = [
    path('tutor/', TutorListApiview.as_view(), name='tutor-list'),
    path('category/', CategoryListApiview.as_view(), name='category-list'),
]

urlpatterns += router.urls