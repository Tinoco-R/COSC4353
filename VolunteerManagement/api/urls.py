from django.urls import path, include
from .views import EventView

# Axel's imports
from .views import UserView
from .views import RegisterView
from .views import LoginView
from .views import activate
from .views import CreateProfile, GetProfile, UpdateProfile
from .views import GetStates, GetSkills
from . import views # Import everything

urlpatterns = [
    path('Event', EventView.as_view()),
    path('User', UserView.as_view(), name='User'),
    path('Register', RegisterView, name='Register'),
    path('Login', LoginView, name='Login'),
    path('activate/<uidb64>/<token>', activate, name='activate'),
    path('GetStates', GetStates, name='GetStates'),
    path('GetSkills', GetSkills, name='GetSkills'),
    path('CreateProfile', CreateProfile, name='CreateProfile'),
    path('GetProfile', GetProfile, name='GetProfile'),
    path('UpdateProfile', UpdateProfile, name='UpdateProfile'),
    path('', include('frontend.urls'))
]