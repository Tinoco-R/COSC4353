from django.urls import path
from .views import EventView

# Axel's imports
from .views import UserView

urlpatterns = [
    path('Event', EventView.as_view()),
    path('User', UserView.as_view(), name='User')
]