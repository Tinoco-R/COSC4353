from django.urls import path, include
from .views import EventView, CreateEventView, UpdateEventView, EventsListView, DeleteEventView, EventVolunteerMatch, EventVolunteerListView

# Axel's imports
from .views import UserView#, UserDetail
from .views import RegisterView
from .views import LoginView
from .views import activate
from .views import CreateProfile, GetProfile, UpdateProfile
from .views import GetStates, GetSkills, GetMonthlyEvents
from .views import GetMatchNotifications, GetUpdateNotifications, GetReminderNotifications
from . import views # Import everything

urlpatterns = [
    path('Event', EventView.as_view()),
    path('User', UserView.as_view(), name='User'),
    #path('UserDetail', UserDetail.as_view(), name='UserDetail'),
    path('Register', RegisterView, name='Register'),
    path('Login', LoginView, name='Login'),
    path('activate/<uidb64>/<token>', activate, name='activate'),
    path('GetStates', GetStates, name='GetStates'),
    path('GetSkills', GetSkills, name='GetSkills'),
    path('GetMonthlyEvents', GetMonthlyEvents, name='GetMonthlyEvents'),
    path('CreateProfile', CreateProfile, name='CreateProfile'),
    path('GetProfile', GetProfile, name='GetProfile'),
    path('UpdateProfile', UpdateProfile, name='UpdateProfile'),
    path('GetMatchNotifications', GetMatchNotifications, name='GetMatchNotifications'),
    path('GetUpdateNotifications', GetUpdateNotifications, name='GetUpdateNotifications'),
    path('GetReminderNotifications', GetReminderNotifications, name='GetReminderNotifications'),
    # Events
    path('eventCreate/', CreateEventView.as_view(), name='create_event'),
    path('eventUpdate/', UpdateEventView.as_view(), name='update_event'),
    path('eventDelete/', DeleteEventView.as_view(), name='delete_event'),
    path('eventsView/', EventsListView.as_view(), name='view_events'),

    # Event Volunteer Match
    path('eventVolunteerMatch/', EventVolunteerMatch.as_view(), name='event_volunteer_match'),
    path('eventVolunteerMatchView/', EventVolunteerListView.as_view(), name='view_event_volunteers'),

    # Volunteer History

    path('', include('frontend.urls'))
]