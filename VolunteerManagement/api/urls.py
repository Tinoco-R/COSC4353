from django.urls import path
from .views import EventView

urlpatterns = [
    path('Event', EventView.as_view())
]