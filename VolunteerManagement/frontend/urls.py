from django.urls import path
from . import views
from .views import index
from django.views.generic import TemplateView

urlpatterns = [
    # Admin Pages
    # Home
    path('', index),
    path('admin/', index),
    path('admin/home', index),

    # Events
    path('admin/events', index),
    path('admin/events/my', index),
    path('admin/events/my/create-event', index),
    path('admin/events/my/<int:event_id>/', index),
    path('admin/events/all', index),
    path('admin/events/administration', index),
    path('admin/events/administration/create-event', index),
    path('admin/events/administration/modify-event', index),

    # Volunteers
    path('admin/volunteers', index),
    path('admin/volunteers/view', index),
    path('admin/volunteers/manage', index),
    path('admin/volunteers/matching', index),
    path('admin/volunteers/skills', index),

    # Reports
    path('admin/reports', index),
    path('admin/reports/event', index),
    path('admin/reports/volunteer', index),

    # Notifications
    #path('admin/notifications', index),
    #path('admin/notifications/setup', index),

    # Volunteer Pages
    
    # path("", views.index, name="index"),
    path("volunteer/landing/", views.index, name="index"),
    path("volunteer/alerts/", views.index, name="index"),
    path("volunteer/my-profile/", views.index, name="index"),
    path("saved-changes-confirmation/", views.index, name="index"),
    path("login/", views.index, name="index"),
    path("sign-up/", views.index, name="index"),
    path("verification/", views.index, name="index"),
    path("reset-password/", views.index, name="index"),
    path("new-password/<str:username>", views.index, name="index"),
    path("volunteer/logout/", views.index, name="index"),
    path("email-address-received/", views.index, name="index"),
    path("notification/", views.index, name="index"),
]