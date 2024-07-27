from django.shortcuts import render
from rest_framework import generics, status
from .serializers import EventSerializer, CreateEventSerializer, UpdateEventSerializer, DeleteEventSerializer, EventVolunteerMatchSerializer, CreateEventVolunteerMatchSerializer, VolunteerHistorySerializer, UpdateVolunteerHistorySerializer
from .models import Event, Skill, Event_Volunteers, Event_Update_Volunteers, States
from rest_framework.views import APIView;
from rest_framework.response import Response;
from django.contrib.auth.models import User
from .models import Profile, Event_Matched_Notification, Event_Update_Volunteers

from datetime import date
from datetime import time
from datetime import datetime, timedelta

# Allows us to view all event details (not being used? maybe use to only output one event)
class EventView(generics.CreateAPIView):
    eventQuerySet = Event.objects.all() # Returns all event objects
    serializer_class = EventSerializer # Converts to json format

# Allows us to view all event details
class EventsListView(generics.ListAPIView):
    queryset  = Event.objects.all().order_by('Event_ID') # Returns all event objects
    serializer_class = EventSerializer # Converts to json format

# Allows us to view all volunteers for a given event
class EventVolunteerListView(generics.ListAPIView):
    serializer_class = EventVolunteerMatchSerializer # Converts to json format

    def get_queryset(self):
        #eventId = request.data.get('Event_ID')
        eventId = self.request.query_params.get('Event_ID', None)
        
        if eventId is not None:
            queryset = Event_Volunteers.objects.filter(Event_ID=eventId).order_by('Event_ID')
        else:
            queryset = Event_Volunteers.objects.none()
        print("EventVolunteerList")
        print(queryset.order_by('Event_ID'))
        return queryset.order_by('Event_ID')

# Allows us to view all volunteer history
class VolunteerHistory(generics.ListAPIView):
    queryset  = Event_Volunteers.objects.all()
    print(queryset)
    serializer_class = VolunteerHistorySerializer # Converts to json format

# Updates a volunteer's attendance at an Event
class UpdateVolunteerHistory(APIView):
    serializer_class = UpdateVolunteerHistorySerializer
    
    def post(self, request, format = None, **kwargs):
        serializer = self.serializer_class(data=request.data)
        print("serializer", serializer)
        if serializer.is_valid():
            eventId = serializer.data.get('Event_ID')
            volunteer = serializer.data.get('Volunteer')
            attended = serializer.data.get('Attended')

            if (attended == "N"):
                modification = "Y"
            else:
                modification = "N"

            try:
                volunteerHistory = Event_Volunteers.objects.get(Event_ID = eventId, Volunteer = volunteer)
                print("Volunteer History:", volunteerHistory)

            except Event_Volunteers.DoesNotExist:
                return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)
            
            volunteerHistory.Attended = modification
            volunteerHistory.save()

            return Response(VolunteerHistorySerializer(volunteerHistory).data, status=status.HTTP_200_OK)

        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Updates pre-existing Event
class UpdateEventView(APIView):
    serializer_class = UpdateEventSerializer

    def post(self, request, format = None, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            eventId = request.data.get('Event_ID')
            eventName = serializer.data.get('Name')
            eventAdministrator = serializer.data.get('Administrator')
            eventDescription = serializer.data.get('Description')
            eventAddress = serializer.data.get('Address')
            eventCity = serializer.data.get('City')
            eventState = serializer.data.get('State')
            eventZip = serializer.data.get('Zip_Code')
            eventDate = serializer.data.get('Date')
            eventStart = serializer.data.get('Start_Time')
            eventDuration = serializer.data.get('Duration')
            eventSkills = serializer.data.get('Skills')
            eventUrgency = serializer.data.get('Urgency')

            # Get existing row
            try:
                event = Event.objects.get(Event_ID = eventId)
                print("Updating", event.Event_ID)

                # Get all current volunteers for the event (using Event_Volunteers)
                if event is not None:
                    queryset = Event_Volunteers.objects.filter(Event_ID = event.Event_ID).order_by('Event_ID', 'Volunteer')
                    for volunteer in queryset:
                        volunteerName = volunteer.Volunteer
                        print(" Adding", volunteer.Volunteer, "to Event_Update_Volunteers...")

                        # Add the Event ID and Volunteer name to the Event Updates table (used to know if volunteers have yet to be alerted of changes to an event they are registered to)
                        Event_Update_Volunteers.objects.create(
                                Event_ID = event.Event_ID,
                                Volunteer = volunteerName,
                        )

                else:
                    queryset = Event_Volunteers.objects.none()

            except Event.DoesNotExist:
                return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)
            
            # Update data for row
            event.Name = eventName
            event.Administrator = eventAdministrator
            event.Description = eventDescription
            event.Address = eventAddress
            event.City = eventCity
            event.State = eventState
            event.Zip_Code = eventZip
            event.Date = eventDate
            event.Start_Time = eventStart
            event.Duration = eventDuration
            event.Skills = eventSkills
            event.Urgency = eventUrgency
            event.save()

            return Response(EventSerializer(event).data, status=status.HTTP_200_OK)
        
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Deletes an event fromt the DB
class DeleteEventView(APIView):
    serializer_class = DeleteEventSerializer

    def post(self, request, format=None, **kwargs):
        
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            eventId = request.data.get('Event_ID')

            # Validates Event ID to be a number
            try:
                eventId = int(eventId)
            except ValueError:
                return Response({"error": "Invalid Event ID format"}, status=status.HTTP_400_BAD_REQUEST)

            # Get existing row
            try:
                event = Event.objects.get(Event_ID=eventId)
            except Event.DoesNotExist:
                return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)

            event.delete()
            return Response({"message": "Event deleted successfully"}, status=status.HTTP_200_OK)
        
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Creates a new Event
class CreateEventView(APIView):
    serializer_class = CreateEventSerializer

    def post(self, request, format=None):

        # Reimplement foreign keY? Or just stick with created by being the administrator
        # Test user ID; pass in request if good
        #eventCreatedBy = 2
        #created_by_user = User.objects.get(id=eventCreatedBy)
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():                
            
            eventId = serializer.data.get('Event_ID')
            eventName = serializer.data.get('Name')
            eventAdministrator = serializer.data.get('Administrator')
            eventDescription = serializer.data.get('Description')
            eventAddress = serializer.data.get('Address')
            eventCity = serializer.data.get('City')
            eventState = serializer.data.get('State')
            eventZip = serializer.data.get('Zip_Code')
            eventDate = serializer.data.get('Date')
            eventStart = serializer.data.get('Start_Time')
            eventDuration = serializer.data.get('Duration')
            eventSkills = serializer.data.get('Skills')
            eventUrgency = serializer.data.get('Urgency')

            event = Event(Event_ID = eventId, Name =  eventName, Administrator = eventAdministrator, Description = eventDescription, Address = eventAddress, City = eventCity, State = eventState, Zip_Code = eventZip, Date = eventDate, Start_Time = eventStart, Duration = eventDuration, Skills = eventSkills, Urgency = eventUrgency)
            event.save()

            return Response(EventSerializer(event).data, status=status.HTTP_201_CREATED)
        
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EventVolunteerMatch(APIView):
    serializer_class = CreateEventVolunteerMatchSerializer
    print("In view")
    def post(self, request, format=None):
        print("Data", request.data)
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            print("Valid", serializer.data)

            eventId = request.data.get('Event_ID')
            volunteer = serializer.data.get('Volunteer')
            print("Event ID:", eventId)
            print("Volunteer:", volunteer)

            eventVolunteer = Event_Volunteers(Event_ID = eventId, Volunteer = volunteer)
            eventVolunteer.save()

            return Response(EventVolunteerMatchSerializer(eventVolunteer).data, status=status.HTTP_201_CREATED)
        
        else:
            print("Not valid")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

##########################################################
# Axel's models:
from .models import User
from .serializers import UserSerializer

# Axel's utilities:
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login
#from api.session import current_session # session hard-coded file (credit: msc at https://stackoverflow.com/questions/12169133/how-to-import-python-code-into-views-py-file-in-django)
from django.http import HttpResponse, HttpResponseRedirect, HttpResponsePermanentRedirect
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json
# For email confirmation:
from django.contrib import messages
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import EmailMessage # https://github.com/pythonlessons/Django_tutorials/blob/main/15_Django-email-confirm/users/views.py
from .tokens import account_activation_token
from django.contrib.auth import get_user_model
# Axel's forms
from .forms import RegisterForm
# Axel's import of hard-coded data for Assignment 3
from . import hard_coded_data
from validator_collection import validators, checkers, errors
#############################################################



# Allows us to view all skills
class SkillView(generics.CreateAPIView):
    skillQuerySet = Skill.objects.all()
    serializer_class = EventSerializer


##########################################
###          Axel's code                ##
##########################################


##########################################
####       Helper functions ##############

def activate(request, uidb64, token):
    print('Activate function called')
    User = get_user_model()
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except:
        user = None
    
    print(user)
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()

        # Inform the user
        messages.success(request, "You have activated your account successfully.")
        print('Account activated successfully')

        if (user.is_staff):
            return redirect('/admin/home') # Redirecting everyone to here for now
        else:
            return redirect('/volunteer/landing')
    else:
        messages.success(request, "Activation link is invalid")
    
    return redirect('/') # Redirect back to login page



def activateEmail(request, user, to_email):
    print('activateEmail function:')
    print('request')
    print(request)
    print('user')
    print(user)
    print('to_email')
    print(to_email)
    mail_subject = "Activate your user account"
    message = render_to_string('template_activate_account.html',
                               {
                                   'user': user,
                                   'domain': get_current_site(request).domain,
                                   'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                                   'token': account_activation_token.make_token(user),
                                   'protocol': 'https' if request.is_secure() else 'http'
                               })

    email = EmailMessage(mail_subject, message, to=[to_email])

    if email.send():
        print('email sent')
        messages.success(request, f'Dear <b>{user}</b>,\
                     please go to your email <b>{to_email}</b>\
                     and click on received confirmation link to\
                     activate your account and complete registration\
                        <b>Note:</b> Check your spam folder')
    else:
        print('email not sent')
        message.error(request, f'Problem sending email to {to_email}, \
                                check if you typed it correctly.')
        
    



##########################################
##########################################



#@login_required
class UserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    #userQuerySet = User.objects.all()

    #def get_queryset(self):
    #    queryset = User.objects.all()
    #    return
    
    def get(self, request, format=None): # Get 1 user
        print('Session:')
        print(request.session)
        print(request.session.get("session_id"))
        # Since the username comes from the Python request object (it is
        # not really a user-given input in this part of the code) there is
        # no validation coded for it
        username = request.session.get("session_id") # Getting the value of session_id
        response = {'username' : username}
        print('Sending User data to the front-end')
        return Response(response)
    


#@login_required
''''
class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def post(self, request, format=None): # Modify 1 user
        message = ''


        if (request.data.get('user_id') == ''):
            print('Cannot modify user (no user_id provided)')
            response = {'error': 'Cannot modify user (no user_id provided)'}
            return Response(response)

        print('Receiving User data from front-end')

        if (request.data.get('password') != ''):
            # Modify password
            print('Modifying user password')
            message = 'Password modified!'
        elif (request.data.get('email') != ''):
            # Modify email
            print('Modifying user Email')
            message = 'Email modified!'

        response = {'message': message}

        return Response(response)
'''


#@method_decorator(csrf_exempt, name="dispatch")
#class RegisterView(generics.CreateAPIView):
#    serializer_class = UserSerializer

#    def dispatch(self, *args, **kwargs):
#        return super().dispatch(*args, **kwargs)

@csrf_exempt
def RegisterView(request):
#def post(request):
    #serializer_class = UserSerializer
    print(request)
    decoded_request_body = json.loads(request.body.decode("utf-8")) # https://www.freecodecamp.org/news/python-json-how-to-convert-a-string-to-json/
    print(decoded_request_body)


    #### Input validation for username and password ####

    validated_username = ''
    validated_password = ''

    # Username (email) validation

    try:
        validated_username = validators.email(decoded_request_body["username"], allow_empty=False) #request.data.get('username') # username from front-end
    except errors.EmptyValueError:
        print("ERROR: username (email) received from the front-end is empty.")
    except errors.InvalidEmailError:
        print("ERROR: username (email) received from the front-end is invalid.")

    # Password validation
    
    if checkers.is_string(decoded_request_body["password"]) and (len(decoded_request_body["password"]) > 0): #request.data.get('password') # password from front-end
        validated_password = decoded_request_body["password"]
    else:
        print("ERROR: password received from the front-end is not valid")
        if (len(decoded_request_body["password"]) == 0):
            print("ERROR INFO: password received from the front-end is empty")
    
    #### Input validation end ####

    if (validated_username != '') and (validated_password != ''):
        username = validated_username
        password = validated_password


        # Validate the user input (missing)
        #form = RegisterForm(request.data)
        form = RegisterForm({"username": username,
                                "password": password,
                                "password1": password,
                                "password2": password,
                                "is_active": False})
        #print(form)
        print('Request.POST:')
        print(request.POST)

        for field in form:
            print("Field Error:", field.name, field.errors)

        # If validation successfull, create the user
        # Database relation needed for line below (Django complains)
        newUser = None
        if (form.is_valid()):
            newUser = form.save(commit=True)
            
            #newUser.is_active = False # Set is_active to false by default
            #newUser() # Save change onde to is_active attribute
            #newUser.is_active = False
            #newUser.save()

            activateEmail(request, newUser, form.cleaned_data.get('username') )
            #newUser = User.objects.create_user(username=username, 
            #                                email=None, 
            #                                password=password)

        #if (request.POST) and (newUser is not None):
        if (newUser is not None):
            response = "{'message': 'OK'}" # User registered in the system
            print('User created successfully')
            return HttpResponse(response)
            #return redirect('') # Redirect the user to the email verification page    
    
    response = "{'message': 'Something went wrong'}"
    print('ERROR: Failed to create user')
    
    return HttpResponse(response).status_code(200)



#class LoginView(generics.GenericAPIView):
#    serializer_class = UserSerializer
    #queryset = User.objects.all()
    
#    def LoginView(self, request, format=None):
@csrf_exempt
def LoginView(request):

    decoded_request_body = json.loads(request.body.decode("utf-8")) # https://www.freecodecamp.org/news/python-json-how-to-convert-a-string-to-json/

    #### Input validation for username and password ####

    # Username (email) validation

    validated_username = ''
    validated_password = ''


    try:
        validated_username = validators.email(decoded_request_body["username"], allow_empty=False) #request.data.get('username') # username from front-end
    except:
        print("ERROR: username (email) received from the front-end is invalid.")

    # Password validation
    
    if checkers.is_string(decoded_request_body["password"], minimum_length=1): #request.data.get('password') # password from front-end
        validated_password = decoded_request_body["password"]
    else:
        print("ERROR: password received from the front-end is not valid")
        if (len(decoded_request_body["password"]) == 0):
            print("ERROR INFO: password received from the front-end is empty")
            
    
    #### Input validation end ####

    # Login the user
    if (validated_username != '') and (validated_password != ''):
        username = validated_username
        password = validated_password
        print(username, password)
        User = get_user_model()
        userAttemptingLogin = User.objects.get(username=username)
        user = authenticate(request, username=username, password=password)
        #user = True # not implementing the authentication quite yet (closely toupled with DB & Django)
        print(user)
        # Get the user_id for the user
        #user_id = 1
        
        if user is not None:

            # User authenticated successfully
            print('User authenticated successfully')

            ################## Session Creation

            # Per Django's documentation, login() saves the userID's
            # in the session, using Django's session framework
            login(request, user)
            print('Session started successfully')
            print('Session:')
            print(request.session)
            
            print(user.get_username())
            request.session["session_id"] = user.get_username() # For this assignment, using username as session_id

            ########################################

            ### Check if the user has verified their account
            ### through the email link

            if (user.is_active):
                ################### User Redirection per user role
                if (user.is_staff == True):
                    #res = redirect('/admin/home') # Redirect to Admin Home page
                    response = '''{"url": "/admin/home"}'''
                    #return HttpResponseRedirect('/admin/home')
                    return HttpResponse(response)
                    #return redirect('/admin/home')
                else:
                    #res = redirect('/volunteer/landing') # Redirect to Volunteer Home page
                    response = '''{"url": "/volunteer/landing"}'''
                    return HttpResponse(response)
                    #return HttpResponseRedirect('/volunteer/landing')
                    #return redirect('/volunteer/landing')
            #else:
                # Account verification process
                # has not been completed.
                # Inform the user
        elif (userAttemptingLogin.is_active):
            print('User account has not been verified')
            # Return an 'invalid login' error message
            response = '''{"url": "/login"}'''
            return HttpResponse(response)
    else: # add check to verify if username or password are incorrect
        print('Username or password are incorrent')
        response = '''{"url": "/login"}'''
        return HttpResponse(response)
    


@csrf_exempt
def CreateProfile(request): # POST REQUEST ONLY
    print(request)
    decoded_request_body = json.loads(request.body.decode("utf-8")) # https://www.freecodecamp.org/news/python-json-how-to-convert-a-string-to-json/
    
    print(decoded_request_body)

    #####################################
    #### Input validation for profile ###
    #####################################

    # Declarations

    validated_full_name = ''
    validated_address1 = ''
    validated_address2 = ''
    validated_city = ''
    validated_state = ''
    validated_zip_code = ''
    validated_skills = ''   
    validated_preferences = ''
    validated_availability = ''

    # Full Name validation

    full_name_is_valid = checkers.is_string(decoded_request_body["full_name"], minimum_length=1,  maximum_length=50)
    if full_name_is_valid and (len(decoded_request_body["full_name"]) > 0):
        validated_full_name = decoded_request_body["full_name"]
    else:
        if (len(decoded_request_body["full_name"]) == 0):
            print("ERROR: Full name is empty.")
        elif (len(decoded_request_body["full_name"]) > 50):
            print("ERROR: Full name has more than 50 characters.")
        else:
            print("ERROR: Some error. Full name could not be validated.")

    # Address 1 validation

    address1_is_valid = checkers.is_string(decoded_request_body["address1"], minimum_length=1, maximum_length=100)
    if address1_is_valid and (len(decoded_request_body["address1"]) > 0):
        validated_address1 = decoded_request_body["address1"]
    else:
        if (len(decoded_request_body["address1"]) == 0):
            print("ERROR: Address 1 is empty.")
        elif (len(decoded_request_body["address1"]) > 100):
            print("ERROR: Address 1 has more than 100 characters.")
        else:
            print("ERROR: Some error. Address 1 could not be validated.")

    # Address 2 validation (Address 2 can be emty because it is optional)

    address2_is_valid = checkers.is_string(decoded_request_body["address2"], minimum_length=None, maximum_length=100)
    if address2_is_valid: # Address 2 is valid and not empty
        print("OK: Address 2 is valid.")
        validated_address2 = decoded_request_body["address2"]
    else:
        if (len(decoded_request_body["address2"]) > 100):
            print("ERROR: Address 2 has more than 100 characters.")
        else:
            print("ERROR: Some error. Address 2 could not be validated.")

    # City validation

    city_is_valid = checkers.is_string(decoded_request_body["city"], minimum_length=1, maximum_length=100)
    if city_is_valid: # Address 2 is valid and not empty
        print("OK: City is valid.")
        validated_city = decoded_request_body["city"]
    else:
        if (len(decoded_request_body["city"]) == 0):
            print("ERROR: Field <city> is empty.")
        elif (len(decoded_request_body["city"]) > 100):
            print("ERROR: Field <City> has more than 100 characters.")
        else:
            print("ERROR: Some error. City could not be validated.")

    # State validation
    print('decoded request body:')
    print(decoded_request_body)
    tmp = ""
    try:
        tmp = decoded_request_body["state"] #["value"]
    except:
        try:
            tmp = decoded_request_body["state"]["value"]
        except:
            print("ERROR: Something went wrong trying to read State for profile")
    
    print('key value pairs')
    #for key, value in decoded_request_body.iteritems():
    #    print(key, value)
    state_is_valid = checkers.is_string(tmp, minimum_length=1, 
                                           maximum_length=2)
    if state_is_valid: # State is valid and not empty
        print("OK: State is valid.")
        validated_state = tmp#decoded_request_body["state"]["value"]
    else:
        if (len(tmp) == 0):
            print("ERROR: Field <State> not assigned any value.")
        elif (len(tmp) > 2):
            print("ERROR: Field <State> has more than 2 characters.")
        else:
            print("ERROR: Some error. State could not be validated.")
    
    # Zip Code validation

    zip_code_is_valid = checkers.is_string(decoded_request_body["zip_code"], minimum_length=5, maximum_length=9)
    if zip_code_is_valid: # Zip code is valid and not empty
        print("OK: Zip code is valid.")
        validated_zip_code = decoded_request_body["zip_code"]
    else:
        if (len(decoded_request_body["zip_code"]) == 0):
            print("ERROR: Field <Zip code> is empty.")
        elif (len(decoded_request_body["zip_code"]) > 9):
            print("ERROR: Field <Zip code> has more than 9 characters.")
        elif (len(decoded_request_body["zip_code"]) < 5):
            print("ERROR: Field <Zip code> has less than 5 characters.")
        else:
            print("ERROR: Some error. Zip code could not be validated.")

    # Skills validation (string) (check all elements are valid)
    skills_is_valid = None
    for skill in decoded_request_body["skills"]:
        try:
            skills_is_valid = checkers.is_string(skill, minimum_length=1)
            if skills_is_valid is False:
                print('Invalid skill input')
                break
        except:
            try:
                skills_is_valid = checkers.is_string(skill["value"], minimum_length=1)
                if skills_is_valid is False:
                    print('Invalid skill input')
                    break
            except:
                print("ERROR validating the skills for the Profile")

    skills_string = ""
    try:
        skills_string = decoded_request_body["skills"]
    except:
        try:
            for i in range(0,len(decoded_request_body["skills"])):
                if i != (len(decoded_request_body["skills"]) - 1):
                    skills_string += decoded_request_body["skills"][i]["value"] + ','
                else:
                    skills_string += decoded_request_body["skills"][i]["value"]
        except:
            print('ERROR: Could not validate the skills for the Profile Creation')

    print('Skills string: ' + skills_string)

    if skills_is_valid: # Skills is valid and not empty
        print("OK: Skills is valid.")
        validated_skills = skills_string
    else:
        if (len(decoded_request_body["skills"]) == 0):
            print("ERROR: Field <Skills> is empty.")
        else:
            print("ERROR: Some error. Skills could not be validated.")
        print(len(decoded_request_body["skills"]))

    # Preferences validation (Preferences can be emty because it is optional)

    preferences_is_valid = checkers.is_string(decoded_request_body["preferences"], minimum_length=None)
    if preferences_is_valid: # Address 2 is valid and not empty
        print("OK: Preferences is valid.")
        validated_preferences = decoded_request_body["preferences"]
    else:
        print("ERROR: Some error. Preferences could not be validated.")
    
    # Availability validation (string)

    availability_is_valid = checkers.is_string(decoded_request_body["availability"], minimum_length=1)
    if availability_is_valid: # Skills is valid and not empty
        print("OK: Availability is valid.")
        validated_availability = decoded_request_body["availability"]
    else:
        print("ERROR: Some error. Availability could not be validated.")

    ##############################
    #### Input validation end ####
    ##############################
    
    # If input validation succeeded, proceed:
    if (validated_full_name != '') and (validated_address1 != '') \
        and (validated_city != '') and (validated_state != '') \
        and (validated_zip_code != '') and (validated_skills != '') \
        and (validated_availability != ''):   
    
        # Validation was successfull, proceeding   
        user = request.user
        full_name = decoded_request_body["full_name"]
        address1 = decoded_request_body["address1"]
        
        address2 = None
        if decoded_request_body["address2"]:
            address2 = validated_address2# decoded_request_body["address2"]
        
        city = decoded_request_body["city"]
        state = validated_state#decoded_request_body["state"]["value"]
        zip_code = decoded_request_body["zip_code"]
        skills = validated_skills 
        preferences = validated_preferences#decoded_request_body["preferences"]
        availability = decoded_request_body["availability"]


        #######################################################
        ### Add: check if the user already filled-in their
        ### profile information, and, if so, pre-fill
        ### the data fields


        #######################################################


        '''
        new_profile_created = hard_coded_data.Profile(user=user,
                                                    full_name=full_name,
                                                    address1=address1,
                                                    address2=address2,
                                                    city=city,
                                                    state=state,
                                                    zip_code=zip_code,
                                                    skills=skills,
                                                    preferences=preferences,
                                                    availability=availability)

        '''
        try:
            print('request.user for create profile:', request.user)
            user = User.objects.get(username=request.user)
            new_profile_created = Profile(user=user,
                                        full_name=full_name,
                                        address1=address1,
                                        address2=address2,
                                        city=city,
                                        state=state,
                                        zip_code=zip_code,
                                        skills=skills,
                                        preferences=preferences,
                                        availability=availability)
            print('New Profile:')
            print(new_profile_created)
            new_profile_created.save()
        
        #if new_profile_created is not None:
            print('User profile created:')
            print(new_profile_created)
            response_tmp = {"status" : "OK"}
            response = json.dumps(response_tmp)
            return HttpResponse(response)
        except Exception as error:
            print('ERROR: Could not create profile.', error)
    #else: # Validation failed
            response_tmp = {"status" : "ERROR"}
            response = json.dumps(response_tmp)
            return HttpResponse(response)



@csrf_exempt
def UpdateProfile(request): # POST REQUEST ONLY
    decoded_request_body = json.loads(request.body.decode("utf-8")) # https://www.freecodecamp.org/news/python-json-how-to-convert-a-string-to-json/
    
    
    ## This is some hard-coded data to show the functionality when the user
    ## has previously given the information for their profile, but now they want
    ## to update it

    
    profile_tmp = hard_coded_data.get_profile(request.user) # get the profile for the user that is making the request
    
    
    ######################################################################
    # Strategy: take all the fields as input, and overwrite all the data in the database for this profile
    # (Update by overwriting the whole profile tuple -or almost all the tuple but the primary key
    # or other field that *cannot* or *should not* be updated due to constraints in the db or programming
    # logic, for example)
    #
    # This is not the most efficient approach for updating the profile data, but it is simple

    print(request)
    decoded_request_body = json.loads(request.body.decode("utf-8")) # https://www.freecodecamp.org/news/python-json-how-to-convert-a-string-to-json/
    
    print(decoded_request_body)

    #####################################
    #### Input validation for profile ###
    #####################################

    # Declarations

    validated_full_name = ''
    validated_address1 = ''
    validated_address2 = ''
    validated_city = ''
    validated_state = ''
    validated_zip_code = ''
    validated_skills = ''   
    validated_preferences = ''
    validated_availability = ''

    # Full Name validation

    full_name_is_valid = checkers.is_string(decoded_request_body["full_name"], minimum_length=1, 
                                            maximum_length=50) #request.data.get('username') # username from front-end
    if full_name_is_valid:
        validated_full_name = decoded_request_body["full_name"]
    else:
        if (len(decoded_request_body["full_name"]) == 0):
            print("ERROR: Full name is empty.")
        elif (len(decoded_request_body["full_name"]) > 50):
            print("ERROR: Full name has more than 50 characters.")
        else:
            print("ERROR: Some error. Full name could not be validated.")

    # Address 1 validation

    address1_is_valid = checkers.is_string(decoded_request_body["address1"], minimum_length=1, 
                                           maximum_length=100)
    if address1_is_valid:
        validated_address1 = decoded_request_body["address1"]
    else:
        if (len(decoded_request_body["address1"]) == 0):
            print("ERROR: Address 1 is empty.")
        elif (len(decoded_request_body["address1"]) > 100):
            print("ERROR: Address 1 has more than 100 characters.")
        else:
            print("ERROR: Some error. Address 1 could not be validated.")

    # Address 2 validation (Address 2 can be emty because it is optional)

    address2_is_valid = checkers.is_string(decoded_request_body["address2"], minimum_length=None, 
                                           maximum_length=100)
    if address2_is_valid: # Address 2 is valid and not empty
        print("OK: Address 2 is valid.")
        validated_address2 = decoded_request_body["address2"]
    else:
        if (len(decoded_request_body["address2"]) > 100):
            print("ERROR: Address 2 has more than 100 characters.")
        else:
            print("ERROR: Some error. Address 2 could not be validated.")

    # City validation

    city_is_valid = checkers.is_string(decoded_request_body["city"], minimum_length=1, 
                                           maximum_length=100)
    if city_is_valid: # Address 2 is valid and not empty
        print("OK: City is valid.")
        validated_city = decoded_request_body["city"]
    else:
        if (len(decoded_request_body["city"]) == 0):
            print("ERROR: Field <city> is empty.")
        elif (len(decoded_request_body["city"]) > 100):
            print("ERROR: Field <City> has more than 100 characters.")
        else:
            print("ERROR: Some error. City could not be validated.")

    # State validation
    print('decoded request body:')
    print(decoded_request_body)
    tmp = ""
    try:
        tmp = decoded_request_body["state"] #["value"]
    except:
        try:
            tmp = decoded_request_body["state"]["value"]
        except:
            print("ERROR: Something went wrong trying to read State for profile")
    state_is_valid = checkers.is_string(tmp, minimum_length=1, 
                                           maximum_length=2)
    if state_is_valid: # State is valid and not empty
        print("OK: State is valid.")
        validated_state = tmp#["value"]
    else:
        if (len(decoded_request_body["state"]) == 0):
            print("ERROR: Field <State> is empty.")
        elif (len(decoded_request_body["state"]["value"]) > 2):
            print("ERROR: Field <State> has more than 2 characters.")

    
    # Zip Code validation

    zip_code_is_valid = checkers.is_string(decoded_request_body["zip_code"],
                                           minimum_length=5, 
                                           maximum_length=9)
    if zip_code_is_valid: # Zip code is valid and not empty
        print("OK: Zip code is valid.")
        validated_zip_code = decoded_request_body["zip_code"]
    else:
        if (len(decoded_request_body["zip_code"]) == 0):
            print("ERROR: Field <Zip code> is empty.")
        elif (len(decoded_request_body["zip_code"]) > 9):
            print("ERROR: Field <Zip code> has more than 9 characters.")
        elif (len(decoded_request_body["zip_code"]) < 5):
            print("ERROR: Field <Zip code> has less than 5 characters.")
        else:
            print("ERROR: Some error. Zip code could not be validated.")

    # Skills validation (string)

    skills_is_valid = None
    for skill in decoded_request_body["skills"]:
        try:
            skills_is_valid = checkers.is_string(skill, minimum_length=1)
            if skills_is_valid is False:
                print('Invalid skill input')
                break
        except:
            try:
                skills_is_valid = checkers.is_string(skill["value"], minimum_length=1)
                if skills_is_valid is False:
                    print('Invalid skill input')
                    break
            except:
                print("ERROR validating the skills for the Profile")

    skills_string = ""
    try:
        skills_string = decoded_request_body["skills"]
    except:
        try:
            for i in range(0,len(decoded_request_body["skills"])):
                if i != (len(decoded_request_body["skills"]) - 1):
                    skills_string += decoded_request_body["skills"][i]["value"] + ','
                else:
                    skills_string += decoded_request_body["skills"][i]["value"]
        except:
            print('ERROR: Could not validate the skills for the Profile Creation')

    print('Skills string: ' + skills_string)

    if skills_is_valid: # Skills is valid and not empty
        print("OK: Skills is valid.")
        validated_skills = skills_string
    else:
        if (len(decoded_request_body["skills"]) == 0):
            print("ERROR: Field <Skills> is empty.")
        else:
            print("ERROR: Some error. Skills could not be validated.")
        print(len(decoded_request_body["skills"]))

    # Preferences validation (Preferences can be emty because it is optional)

    preferences_is_valid = checkers.is_string(decoded_request_body["preferences"], minimum_length=None)
    if preferences_is_valid: # Address 2 is valid and not empty
        print("OK: Preferences is valid.")
        validated_preferences = decoded_request_body["preferences"]
    else:
        print("ERROR: Some error. Preferences could not be validated.")
    
    # Availability validation (string)

    availability_is_valid = checkers.is_string(decoded_request_body["availability"], minimum_length=1)
    if availability_is_valid: # Skills is valid and not empty
        print("OK: Availability is valid.")
        validated_availability = decoded_request_body["availability"]
    else:
        print("ERROR: Some error. Availability could not be validated.")

    ##############################
    #### Input validation end ####
    ##############################

    # If input validation succeeded, proceed:
    print('Printing validations -test')
    print(validated_full_name)
    print(validated_address1)
    print(validated_city)
    print(validated_state)
    print(validated_zip_code)
    print(validated_skills)
    print(validated_availability)

    if (validated_full_name != '') and (validated_address1 != '') \
        and (validated_city != '') and (validated_state != '') \
        and (validated_zip_code != '') and (validated_skills != '') \
        and (validated_availability != ''):  
    
        # Validation was successfull, proceeding      
        user_from_request = str(request.user) # get the user object for the user making the request

        # Reading the input from the request (all fields required to perform the update):
        

        full_name = decoded_request_body["full_name"]
        address1 = decoded_request_body["address1"]
        
        address2 = None
        if decoded_request_body["address2"]:
            address2 = decoded_request_body["address2"]
        
        city = decoded_request_body["city"]
        state = validated_state#decoded_request_body["state"]["value"]
        zip_code = decoded_request_body["zip_code"]
        skills = validated_skills#decoded_request_body["skills"]    
        preferences = decoded_request_body["preferences"]
        availability = decoded_request_body["availability"]

        '''
        new_profile_created = hard_coded_data.Profile(user=user,
                                                    full_name=full_name,
                                                    address1=address1,
                                                    address2=address2,
                                                    city=city,
                                                    state=state,
                                                    zip_code=zip_code,
                                                    skills=skills,
                                                    preferences=preferences,
                                                    availability=availability)
        '''

        # attempt to update the instance, if it fails catch the exepction
        try:
            print(request.user.id)
            #user_object = User.objects.get(username=user_from_request)
            #print(user_object)
            #users = User.get_queryset()
            #print(users)
            profile_to_update = Profile.objects.get(user_id=request.user.id)# get the instance from the database
            print(profile_to_update)

            profile_to_update.full_name=full_name,
            profile_to_update.address1=address1
            profile_to_update.address2=address2
            profile_to_update.city=city
            profile_to_update.state=state
            profile_to_update.zip_code=zip_code
            profile_to_update.skills=skills
            profile_to_update.preferences=preferences
            profile_to_update.availability=availability
            profile_to_update.save()

        #if new_profile_created is not None:
            print('User profile updated:')
            print(profile_to_update)
            response_tmp = {"status" : "OK"}
            response = json.dumps(response_tmp)
            return HttpResponse(response)
        except Exception as error:
            print("ERROR: Profile could not be updated", error)
    #else:
            print("Some error")
            response_tmp = {"status" : "ERROR"}
            response = json.dumps(response_tmp)
            return HttpResponse(response)








@csrf_exempt
def GetProfile(request): # GET REQUEST ONLY

    #############################################################
    ######                                                   ####
    # This block of code is a tempoary block of code with hardcoded
    # data for 1 user. The purpose of doing this is to test
    # the functionality that when the user already created a profile,
    # it will tell them the current values stored in the system for 
    # their profile. To accomplish that, I have hardcoded data for 1
    # value, simulating the data stored in the database for that user

    print(request.user)
    #user = request.user

    try:
        profile_from_database = Profile.objects.get(user=request.user)
    except:
        print("ERROR: Could not retrieve an existing profile from the database")
        profile_dictionary = {"user" : "None"}
        response = json.dumps(profile_dictionary)
        return HttpResponse(response)
    
    print(type(profile_from_database))
    #if (str(request.user) == "ax.alvarenga19@gmail.com"):
    '''
        user = hard_coded_data.Profile(user="sample@sample.com",
                                        full_name="Mark White",
                                        address1="12345 Houston Rd.",
                                        address2="7219 Nebraska Ave.",
                                        city="Huntsville",
                                        state="AL",
                                        zip_code="78239", 
                                        skills=["Plumbing,", "Construction,", "German - Language,", 
                                                "Cooking,", "Cleaning,", "Mathematics Skills,"],
                                        preferences="Events near downtown are preferred. \
                                                    No events after 6 pm.",
                                        availability=["07/25/2024,", "07/26/2024,", "07/27/2024,",
                                                    "08/03/2024,", "08/09/2024,", "09/15/2024,"])

        profile_dictionary = {
            "user": user.user,
            "full_name": user.full_name,
            "address1": user.address1,
            "address2": user.address2,
            "city": user.city,
            "state": user.state,
            "zip_code": user.zip_code,
            "skills": user.skills,
            "preferences": user.preferences,
            "availability": user.availability
        }

        response = json.dumps(profile_dictionary)
        return HttpResponse(response)
    

    ## End of temporary block of code                                                       
    ##############################################################
    '''

    # API endpoint Implementation    
    '''
    user = hard_coded_data.get_profile(username=request.user)

    if user is not None: # the user already created a profile
        print('Profile found')
    '''
    print("profile from database")
    #print("user",request.user)
    print(type(str(request.user)))
    print(profile_from_database)
    #print(profile_from_database.user)
    print(profile_from_database.full_name)
    print(profile_from_database.address1)
    print(profile_from_database.address2)
    print(profile_from_database.city)
    print(profile_from_database.state)
    print(profile_from_database.zip_code)
    print(profile_from_database.skills)
    print(profile_from_database.preferences)
    print(profile_from_database.availability)

    profile_dictionary = {
        "user": str(request.user),#profile_from_database.user,#.get_user(),
        "full_name": profile_from_database.full_name, #user.get_full_name(),
        "address1": profile_from_database.address1,#user.get_address1(),
        "address2": profile_from_database.address2,#user.get_address2(),
        "city": profile_from_database.city,#user.get_city(),
        "state": profile_from_database.state,#user.get_state(),
        "zip_code": profile_from_database.zip_code,#user.get_zip_code(),
        "skills": profile_from_database.skills,#user.get_skills(),
        "preferences": profile_from_database.preferences,#user.get_preferences(),
        "availability": profile_from_database.availability#user.get_availability()
    }
    print(type(profile_dictionary))

    try:
        response = json.dumps(profile_dictionary)
    except Exception as error:
        print(error)
    return HttpResponse(response)

    


###################################
### Notifications Module endpoints

@csrf_exempt
def GetMatchNotifications(request): # Called by the front-end the moment the user visits the alerts page

    user = request.user
    print(user)

    #notifications_for_user = hard_coded_data.notifications[user]

    # Get all the event match notifications for the logged in user

    events_matched_notifications = Event_Matched_Notification.objects.filter(
        username = request.user,
        acknowledged = False
    )

    #eventMatched1 = hard_coded_data.EventMatchedNotification()
    #eventUpdated1 = hard_coded_data.EventChangeNotification()
    #eventReminder1 = hard_coded_data.EventReminderNotification()

    #notifications_for_user = [eventMatched1, eventUpdated1, eventReminder1]

    if len(events_matched_notifications) > 0:
        notifications = {}
        i = 1
        for notification in events_matched_notifications:
            notification_number = "matchNotification"+str(i)

            

            associated_event = Event.objects.get(Event_ID = notification.event_id)
            notification_message = "You have been matched to event " + \
                                    associated_event.Name + " " + \
                                    "in " + associated_event.City + ", " + \
                                    associated_event.State + " " + \
                                    "on " + associated_event.Date + " " \
                                    "at " + associated_event.Start_Time

            notifications.update({
                notification_number : notification_message
                })
            i += 1
        #response_tmp = {
        #    "matchNotification1": "You have been matched to the event Sugar Land Park Cleaning \
        #                        on 07/26/2024."
        #}
        response = json.dumps(notifications)
        return HttpResponse(response)
    
    else:
        response_tmp = {"message": "None"} # No notifications
        response = json.dumps(response_tmp)
        return HttpResponse(response)
    


@csrf_exempt
def GetUpdateNotifications(request): # Called by the front-end the moment the user visits the alerts page

    user = request.user
    print(user.id)

    #notifications_for_user = hard_coded_data.notifications[user]
    #events_updated_notifications = []
    events_updated_notifications = Event_Update_Volunteers.objects.filter(pk=user.id)
    
    #print(events_updated_notifications)
    #if (user == "ax.alvareng19@gmail.com"): # Hard-coded data for 1 volunteer now
    '''
    eventMatched1 = hard_coded_data.EventMatchedNotification()
    eventUpdated1 = hard_coded_data.EventChangeNotification()
    eventReminder1 = hard_coded_data.EventReminderNotification()
    '''
    print(events_updated_notifications)
    #notifications_for_user = [eventMatched1, eventUpdated1, eventReminder1]

    if len(events_updated_notifications) > 0:

        notifications = {}
        i = 1
        for notification in events_updated_notifications:
            notification_number = "changeNotification"+str(i)

            

            associated_event = Event.objects.get(Event_ID = notification.Event_ID)
            notification_message = "There has been an update to the event " + \
                                    associated_event.Name + "." + \
                                    "-Current Details: " + \
                                    "City: " + associated_event.City + ", " + \
                                    associated_event.State + " " + \
                                    "Date: " + associated_event.Date + " " \
                                    "Time: " + associated_event.Start_Time

            notifications.update({
                notification_number : notification_message
                })
            i += 1

        response = json.dumps(notifications)
        return HttpResponse(response)
        
        #response_tmp = {
        #    "changeNotification1": "There was a change in the location of the event Kids STEM camp \
        #        with Houston Children Foundation on 07/30/2024. New location: Houston Zoo"
        #}
        #response = json.dumps(response_tmp)
        #return HttpResponse(response)
    
    else:
        response_tmp = {"message": "None"} # No notifications
        response = json.dumps(response_tmp)
        return HttpResponse(response)
    

    
@csrf_exempt
def GetReminderNotifications(request): # Called by the front-end the moment the user visits the alerts page

    user = request.user
    print(user)

    #notifications_for_user = hard_coded_data.notifications[user]
    events_matched_notifications = Event_Matched_Notification.objects.filter(
        username = request.user,
        acknowledged = False
    )
    print(events_matched_notifications)

    #eventMatched1 = hard_coded_data.EventMatchedNotification()
    #eventUpdated1 = hard_coded_data.EventChangeNotification()
    #eventReminder1 = hard_coded_data.EventReminderNotification()

    #notifications_for_user = [eventMatched1, eventUpdated1, eventReminder1]

    if len(events_matched_notifications) > 0:
        #response_tmp = {                         
        #    "reminderNotification1": "Event Reminder: House Building event is coming up in 3 days. \
        #        Details of the event: Location: Humble, TX, Date: 08/12/2024"
        #}
        notifications = {}
        i = 1
        for notification in events_matched_notifications:
            notification_number = "matchNotification"+str(i)

            

            associated_event = Event.objects.get(Event_ID = notification.event_id)
            
            ## Check if the event date and time is within 24 hours 
            ## of the current date and time
            
            if "-" in associated_event.Date:
                date_clean = associated_event.Date.split("-")
                if date_clean[0][0] == "0":
                    date_clean_month = date_clean[0][1:]
                else:
                    date_clean_month = date_clean[0]
                
                if date_clean[0][1] == "0":
                    date_clean_day = date_clean[1][1:]
                else:
                    date_clean_day = date_clean[1]
            else:
                date_clean = associated_event.Date.split("/")
                if date_clean[0][0] == "0":
                    date_clean_month = date_clean[0][1:]
                else:
                    date_clean_month = date_clean[0]
                
                if date_clean[0][1] == "0":
                    date_clean_day = date_clean[1][1:]
                else:
                    date_clean_day = date_clean[1]

            event_date = date(year=int(date_clean[2]),
                               month=int(date_clean[0]),
                               day=int(date_clean[1]))
            print("event_date:")
            print(event_date)
            event_time = (associated_event.Start_Time).split(' ') # format: HH:MM AM/PM (no padding zero)
            event_hour_int = int(event_time[0][:event_time[0].find(':')]) # HH:MM
            event_minute_int = int(event_time[0][event_time[0].find(':') + 1:])
            #event_am_or_pm_string = event_time[1] # AM/PM
            

            

            #current_date = date.today()
            current_time = datetime.now()

            event_datetime = datetime(event_date.year, event_date.month, event_date.day,
                                        event_hour_int, event_minute_int)
            
            current_datetime = datetime(current_time.year, current_time.month, current_time.day,
                                                 current_time.hour, current_time.minute)
            
            print('event datetime', event_datetime)
            print('current datetime', current_datetime)
            delta = event_datetime - current_datetime
            print('delta days')
            print(delta.days)
            # If the day difference is more than 1 day, we know
            # the event is not within 24 hours
            if (delta.days == 0): # for programming ease, the notification will be given when there is less than 1 day to the event
                event_is_within_24_hours = True
            else:
                # Check the time
                # if the event time is the same as or earlier in the day
                # with than the current time, the event is within 24 hours
                
                # convert the times to 24 hr format and compare with
                # inequality operators
                #current_time_24_hr_format = None
                #event_time_24_hr_format = None

                #if event_time_24_hr_format <= current_time_24_hr_format:
                #    event_is_within_24_hours = True
                #else:
                #    event_is_within_24_hours = False
                event_is_within_24_hours = False
            
            print('event is within 24 hours', event_is_within_24_hours)
            
            ##
            if (event_is_within_24_hours):
                notification_message = "Reminder - You have an event coming up within 1 day.\
                                        Event: " + \
                                        associated_event.Name + " " + \
                                        "in " + associated_event.City + ", " + \
                                        associated_event.State + " " + \
                                        "on " + associated_event.Date + " " \
                                        "at " + associated_event.Start_Time

                notifications.update({
                    notification_number : notification_message
                    })
                i += 1
        response = json.dumps(notifications)
        return HttpResponse(response)
    
    else:
        response_tmp = {"message": "None"} # No notifications
        response = json.dumps(response_tmp)
        return HttpResponse(response)

# CreateNotification function is not needed as an API endpoint because the notifications
# are not created by any external system, rather, they are created programatically
# by our app whenever the events that trigger an action happen (event created, event information
# changed, and event reminders). There is no need to provide an interface for external systems
# to create notifications.
#   This applies to UpdateNotification API endpoint



###################################




@csrf_exempt
def GetSkills(request):
    #skills_dictionary = hard_coded_data.skills
    '''
    skills = {
    "roofing": "roofing",
    "construction": "construction",
    "mowing": "mowing",
    "vietnameseLanguage": "Vietnamese - Language",
    "computerSkills": "Computer Skilss"
    }
    '''
    try:
        skills_dictionary = {}
        print('trying to get skills')
        skills = Skill.objects.get_queryset()
        print(type(skills))
        print('got skills')
        #print(type(skills))
        
        #print(skills)
        for skill in skills:
        #pass
            print(skill)#.Name
            skills_dictionary.update({skill.Name: skill.Name})
            
        print('skills dictionary')
        print(skills_dictionary)
        response = json.dumps(skills_dictionary)
        return HttpResponse(response)
    except:
        response = "ERROR"
        return HttpResponse(response)



@csrf_exempt
def GetStates(request):
    print(request.user)
    #states_dictionary = hard_coded_data.states
    #print(states_dictionary)
    try:
        states_dictionary = {}
        states = States.objects.get_queryset()
        for state in states:
            states_dictionary.update({state.abbreviation : state.abbreviation})

        response = json.dumps(states_dictionary)
        print(response)
        return HttpResponse(response)
    except:
        response = "ERROR"
        return HttpResponse(response)
    

@csrf_exempt
def GetMonthlyEvents(request):
    '''
    event1 = hard_coded_data.event1
    event2 = hard_coded_data.event2
    print(event1.calendarId)

    print(event1)
    print(event2)

    if (event1 is not None) and (event2 is not None):
        events = {
            "event1": {
                "id": event1.id,
                "calendarId": event1.calendarId,
                "category": event1.category,
                "end": event1.end,
                "start": event1.start,
                "title": event1.title,
                #"month": event1.month
            },
            "event2": {
                "id": event2.id,
                "calendarId": event2.calendarId,
                "category": event2.category,
                "end": event2.end,
                "start": event2.start,
                "title": event2.title,
                #"month": event2.month
            }
        }

        

        response = json.dumps(events)
        return HttpResponse(response)
    '''
    #print(request.user.pk)
    #user = User.objects.get(id=request.user.pk)
    username_str = str(request.user)
    print("username_str", username_str)
    user = User.objects.get(username=username_str)
    print('user:',user)
    print('username:', user.username)
    #user = User.objects.get(username=str(request.user)) # get user object for the user that made the request
    events = Event_Volunteers.objects.filter(id = int(user.pk)) # get alll the events for this user
    print(events)
    if (len(events) > 0):
        events_dictionary = {}
        i = 1
        for event in events:
            event_id = event.Event_ID
            '''
            "event1": {
                "id": event1.id,
                "calendarId": event1.calendarId,
                "category": event1.category,
                "end": event1.end,
                "start": event1.start,
                "title": event1.title,
                #"month": event1.month
            }
            '''
            event_from_database = Event.objects.get(Event_ID = event_id)
            # if the event is in the currently selected month, proceed, else, skip this event
            #event_date = datetime.fromisoformat(event_from_database.Date)
            #currently_selected_month = datetime.now() 
            
            #if (event_date.month == current_date.month):

            # Send everything to the front end (all events, client should filter those according to the curently selected month)
            
            # calculate the event end time

            event_date = event_from_database.Date.split('-')
            event_duration = event_from_database.Duration

            if ' ' in event_duration:
                duration_list = event_duration.split(' ')
                duration_hrs_str = duration_list[0][:-1] # exclude last character which is the h for hours
                duration_min_str = duration_list[1][:-1] # exclude last character which is the m for minutes
                duration_hrs_int = int(duration_hrs_str)
                duration_min_int = int(duration_min_str)

            else:
                # take the event duration to be hours and convert it immediately to integer
                duration_in_hours = str(event_duration)
            
            event_start_time = event_from_database.Start_Time.split(' ')
            event_am_or_pm_str = event_start_time[1]
            event_start_hr_int = int(event_start_time[0][ :  event_start_time[0].find(':')])
            event_start_min_int = int(event_start_time[0][event_start_time[0].find(':') + 1 : ])

            print(event_date)
            start_time = datetime(year=int(event_date[0]), month=int(event_date[1]), day=int(event_date[2]),
                                  hour=event_start_hr_int, minute=event_start_min_int)
            duration_time = timedelta(minutes=(duration_hrs_int*60 + duration_min_int))

            end_time = start_time + duration_time #time(hour=start_time.) + duration_time
            #end_time_str = end_time.strftime("%I:%M %p")
            end_hr_int = end_time.hour
            end_min_int = end_time.min
            end_hr_and_min_str = str(end_hr_int) + ':' + str(end_min_int)
            
            event_number = "event" + str(i)
            events_dictionary.update({
                event_number : {
                "id": event_from_database.Event_ID,
                "calendarId": "cal1",#event1.calendarId, # constant
                "category": "time",#event1.category, # constant
                "end": end_hr_and_min_str,#event1.end, # end time
                "start": event_from_database.Start_Time, # start time
                "title": event_from_database.Name # name
                }
            })
            i += 1
            print('checkpoint')
        response = json.dumps(events_dictionary)
        print(response)
        return HttpResponse(response)
    else:
        response = "ERROR"
        return HttpResponse(response)