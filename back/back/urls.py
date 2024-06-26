from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.routers import DefaultRouter
from api.views import ProfilViewSet, CvViewSet, CandidatureViewSet, MotivationViewSet, EvaluateCV, EvaluateMotivation

schema_view = get_schema_view(
    openapi.Info(
        title="Your Project API",
        default_version='v1',
        description="API documentation for Your Project",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@yourproject.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

router = DefaultRouter()
router.register(r'profils', ProfilViewSet)
router.register(r'cvs', CvViewSet)
router.register(r'candidatures', CandidatureViewSet)
router.register(r'motivations', MotivationViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/evaluate_cv/', EvaluateCV.as_view(), name='evaluate_cv'),
    path('api/evaluate_motivation/', EvaluateMotivation.as_view(), name='evaluate_motivation'),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
