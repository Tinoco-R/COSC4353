from django.shortcuts import render
from rest_framework import generics
from .serializers import EventSerializer
from .models import Event, Skill

##########################################################
# Axel's models:
from .models import User
from .serializers import UserSerializer

# Axel's utilities:
from rest_framework.response import Response
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login
from api.session import current_session # session hard-coded file (credit: msc at https://stackoverflow.com/questions/12169133/how-to-import-python-code-into-views-py-file-in-django)
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

#############################################################



# Allows us to view all events/skills
class EventView(generics.CreateAPIView):
    eventQuerySet = Event.objects.all() # Returns all event objects
    serializer_class = EventSerializer # Converts to json format

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
        username = request.session.get("session_id") # Getting the value of session_id
        response = {'username' : username}
        print('Sending User data to the front-end')
        return Response(response)
    


#@login_required
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
    username = decoded_request_body["username"] #request.data.get('username') # username from front-end
    password = decoded_request_body["password"] #request.data.get('password') # password from front-end
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
    else:
        print('ERROR: Form not valid')
    #if (request.POST) and (newUser is not None):
    if (newUser is not None):
        response = "{'message': 'OK'}" # User registered in the system
        print('User created successfully')
        return HttpResponse(response)
        #return redirect('') # Redirect the user to the email verification page    
    
    response = "{'message': 'Something went wrong'}"
    print('ERROR: Failed to create user')
    return HttpResponse(response)



#class LoginView(generics.GenericAPIView):
#    serializer_class = UserSerializer
    #queryset = User.objects.all()
    
#    def LoginView(self, request, format=None):
@csrf_exempt
def LoginView(request):

    decoded_request_body = json.loads(request.body.decode("utf-8")) # https://www.freecodecamp.org/news/python-json-how-to-convert-a-string-to-json/

    # Login the user
    username = decoded_request_body["username"]
    password = decoded_request_body["password"]
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
    
    user = request.user
    full_name = decoded_request_body["full_name"]
    address1 = decoded_request_body["address1"]
    
    address2 = None
    if decoded_request_body["address2"]:
        address2 = decoded_request_body["address2"]
    
    city = decoded_request_body["city"]
    state = decoded_request_body["state"]
    zip_code = decoded_request_body["zip_code"]
    skills = decoded_request_body["skills"]    
    preferences = decoded_request_body["preferences"]
    availability = decoded_request_body["availability"]


    #######################################################
    ### Add: check if the user already filled-in their
    ### profile information, and, if so, pre-fill
    ### the data fields


    #######################################################


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

    if new_profile_created is not None:
        print('User profile created:')
        print(new_profile_created)
        response_tmp = {"status" : "OK"}
        response = json.dumps(response_tmp)
        return HttpResponse(response)
    else:
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
    
    user = request.user # get the user object for the user making the request

    # Reading the input from the request (all fields required to perform the update):
    

    full_name = decoded_request_body["full_name"]
    address1 = decoded_request_body["address1"]
    
    address2 = None
    if decoded_request_body["address2"]:
        address2 = decoded_request_body["address2"]
    
    city = decoded_request_body["city"]
    state = decoded_request_body["state"]
    zip_code = decoded_request_body["zip_code"]
    skills = decoded_request_body["skills"]    
    preferences = decoded_request_body["preferences"]
    availability = decoded_request_body["availability"]

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

    if new_profile_created is not None:
        print('User profile created:')
        print(new_profile_created)
        response_tmp = {"status" : "OK"}
        response = json.dumps(response_tmp)
        return HttpResponse(response)
    else:
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

    if (str(request.user) == "ax.alvarenga19@gmail.com"):
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


    # API endpoint Implementation    
    
    user = hard_coded_data.get_profile(username=request.user)

    if user is not None: # the user already created a profile
        print('Profile found')

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
    
    else:
        print('Profile not found')
        # the user has not created a profile yet, return "Noprofile"    
        profile_dictionary = {"user" : "None"}
        response = json.dumps(profile_dictionary)
        return HttpResponse(response)
    



@csrf_exempt
def GetSkills(request):
    skills_dictionary = hard_coded_data.skills
    try:
        response = json.dumps(skills_dictionary)
        return HttpResponse(response)
    except:
        response = "ERROR"
        return HttpResponse(response)



@csrf_exempt
def GetStates(request):
    print(request.user)
    states_dictionary = hard_coded_data.states
    print(states_dictionary)
    try:
        response = json.dumps(states_dictionary)
        print(response)
        return HttpResponse(response)
    except:
        response = "ERROR"
        return HttpResponse(response)