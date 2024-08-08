from django.urls import path, include
from .views import EventView, CreateEventView, UpdateEventView, EventsListView, DeleteEventView
from .views import EventVolunteerMatch, EventVolunteerListView
from .views import VolunteerHistory, UpdateVolunteerHistory
from .views import pdfReportVolunteer, csvReportVolunteer, pdfReportEvent, csvReportEvent

# Axel's imports
from .views import UserView#, UserDetail
from .views import RegisterView
from .views import LoginView, LogoutUser
from .views import activate
from .views import CreateProfile, GetProfile, UpdateProfile
from .views import GetStates, GetSkills, GetMonthlyEvents
from .views import GetMatchNotifications, GetUpdateNotifications, GetReminderNotifications, acknowledgeNotification
from . import views # Import everything

urlpatterns = [
    path('Event', EventView.as_view()),
    path('User', UserView.as_view(), name='User'),
    #path('UserDetail', UserDetail.as_view(), name='UserDetail'),
    path('Register', RegisterView, name='Register'),
    path('Login', LoginView, name='Login'),
    path('LogoutUser', LogoutUser, name='LogoutUser'), # New: Logout user function
    path('activate/<uidb64>/<token>', activate, name='activate'),
    path('GetStates', GetStates, name='GetStates'),
    path('GetSkills', GetSkills, name='GetSkills'),
    path('GetMonthlyEvents', GetMonthlyEvents, name='GetMonthlyEvents'),
    path('CreateProfile', CreateProfile, name='CreateProfile'),
    path('GetProfile', GetProfile, name='GetProfile'),
    path('UpdateProfile', UpdateProfile, name='UpdateProfile'),
    path('GetMatchNotifications', GetMatchNotifications, name='GetMatchNotifications'),
    path('acknowledgeNotification', acknowledgeNotification, name='acknowledgeNotification'),
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
    path('volunteerHistory/', VolunteerHistory.as_view(), name='volunteer_history'),
    path('updateVolunteerHistory/', UpdateVolunteerHistory.as_view(), name='update_volunteer_history'),

    # Reports
    path('volunteerReport/pdf', pdfReportVolunteer, name='volunteer_report_pdf'),
    path('volunteerReport/csv', csvReportVolunteer, name='volunteer_report_csv'),
    
    path('eventReport/pdf', pdfReportEvent, name='event_report_pdf'),
    path('eventReport/csv', csvReportEvent, name='event_report_csv'),

    path('', include('frontend.urls'))
]