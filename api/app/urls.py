from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/', views.login),
    path('user/', views.UserView.as_view()),
    path('job/', views.JobView.as_view()),
    path('job/<int:id>/', views.JobView.as_view()),

]
