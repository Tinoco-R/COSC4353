from django.urls import path
from .views import index

urlpatterns = [
    # Home
    path('', index),
    path('Home', index),

    # Events
    path('Events', index),
    path('Events/My', index),
    path('Events/My/CreateEvent', index),
    path('Events/My/<int:event_id>/', index),
    path('Events/All', index),
    path('Events/Administration', index),
    path('Events/Administration/CreateEvent', index),
    path('Events/Administration/ModifyEvent', index),

    # Volunteers
    path('Volunteers', index),
    path('Volunteers/View', index),
    path('Volunteers/Manage', index),

    # Notifications
    path('Notification', index),
    path('Notification/Setup', index)
]