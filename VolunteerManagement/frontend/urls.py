from django.urls import path
from . import views
from .views import index
from django.views.generic import TemplateView

urlpatterns = [
    # Admin Pages
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
    path('Notifications', index),
    path('Notifications/Setup', index),

    # Volunteer Pages
    
    # path("", views.index, name="index"),
    path("hello-webpack/", TemplateView.as_view(template_name='hello_webpack.html')), # polls/hello-webpack/
    path("landing/", views.index, name="index"),
    path("my-profile/", views.index, name="index"),
    path("login/", views.index, name="index"),
    path("sign-up/", views.index, name="index"),
    path("verification/", views.index, name="index"),
    path("reset-password/", views.index, name="index"),
    path("logout/", views.index, name="index"),
    path("email-address-received/", views.index, name="index"),
    path("notification/", views.index, name="index"),
]