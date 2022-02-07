from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import UserView, GroupView

router = DefaultRouter()
router.register(r'users', UserView, basename='user_view')
router.register(r'groups', GroupView, basename='group_view')


urlpatterns = router.urls
