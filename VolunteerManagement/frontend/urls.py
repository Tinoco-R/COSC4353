from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('Home', index),
    path('Events', index),
    path('Events/My', index),
    path('Events/All', index),
    path('Events/Administration', index),
    path('Volunteers', index),
    path('Volunteers/View', index),
    path('Volunteers/Manage', index),
    path('Notification', index),
    path('Notification/Setup', index),
    path('AllEvents', index),
    path('EventAdministration', index),
    path('ViewVolunteers', index),
    path('ManageRegistration', index),
    path('NotificationSystem', index),
    path('Administration', index),
]