from django.urls import path, include
from .views import EventView

# Axel's imports
from .views import UserView
from .views import RegisterView
from .views import LoginView
from .views import activate
from . import views # Import everything

urlpatterns = [
    path('Event', EventView.as_view()),
    path('User', UserView.as_view(), name='User'),
    path('Register', RegisterView, name='Register'),
    path('Login', LoginView, name='Login'),
    path('activate/<uidb64>/<token>', activate, name='activate'),
    path('', include('frontend.urls'))
]