from rest_framework.routers import DefaultRouter

from apps.courses.api.views.course_views import CourseViewSet
from apps.courses.api.views.general_views import CategoryListApiview, TutorListApiview

router = DefaultRouter()

router.register(r'courses', CourseViewSet, basename= 'courses')
#router.register(r'category_list', CategoryListApiview, basename= 'category_list')
#router.register(r'tutorial_list', TutorListApiview, basename= 'tutor_list')

urlpatterns = router.urls