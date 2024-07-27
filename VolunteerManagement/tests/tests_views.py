# Test for views.py

from django.test import TestCase, Client
from django.utils import timezone
from django.urls import reverse
from api.models import *
from api.views import *
from api.serializers import *
from rest_framework import status
import datetime

import json

from django.contrib.auth.models import AnonymousUser
from api.models import User
from django.test import RequestFactory

class testViews(TestCase):

    def setUp(self): # source: https://docs.djangoproject.com/en/5.0/topics/testing/advanced/ (setUp and requests object code is from this link)
        self.factory = RequestFactory()
        self.user = User.objects.create_user(username="testuser@mail.com",
                                             password="secret@key")

    '''
    def test_activate_email(self): # test the sending of email with activation link
        client = Client()

        response = client.post(reverse('activate'), data={
            'uidb64' = 1,

        })

        self.assertEquals(response.status_code, 200)
    '''

    def test_UserView(self):
        client = Client()

        response = client.get(reverse('User'))

        self.assertEquals(response.status_code, 200)


    
    def test_RegisterView(self):
        '''
        request = self.factory.post('api/Register')
        body = str({
            'password': 'mypreferredpassword',
            'last_login': 0,
            'is_superuser': False,
            'username': 'myemail@example.com',
            'first_name': '',
            'last_name': '',
            'email': '',
            'is_staff': False,
            'is_active': False,
            'date_joined': 0,
            'groups': [],
            'user_permissions': []
        })
        request.body = body.encode("utf-8")
        request.content_type = "application/json"
        response = RegisterView(request=request)
        self.assertEqual(response.status_code, 200)
        '''
        
        client = Client()

        '''
        h =  {
                    "Content-Type": "application/json", # credit: https://rapidapi.com/guides/request-headers-fetch
                    "Host": "http://127.0.0.1:8000",
                    #"Content-Length": "",
                    "Origin": "http://127.0.0.1:8000",
                    "User-Agent": "",
                    "Accept": "*/*",
                    "Accept-Encoding": "gzip,deflate,br",
                    "Connection": "keep-alive",
                    #"X-CSRF-Token": "",
                    "mode": "cors",
                }
        '''

            
        #cred = "same-origin"

        body_data = {
            'password': 'mypreferredpassword',
            #'last_login': 0,
            'is_superuser': False,
            'username': 'myemail@example.com',
            'first_name': '',
            'last_name': '',
            'email': '',
            'is_staff': False,
            'is_active': False,
            #'date_joined': 0,
            'groups': [],
            'user_permissions': []
        }
        response = client.post(reverse('Register'),
                               data=json.dumps(body_data),
                               content_type='application/json'
                               )
        
        
        #print(response)

        #self.assertEquals(response, '''"{'message': 'OK'}"''')


        body_data2 = {
            'password': '',
            #'last_login': 0,
            'is_superuser': False,
            'username': 'myemail@example.com',
            'first_name': '',
            'last_name': '',
            'email': '',
            'is_staff': False,
            'is_active': False,
            #'date_joined': 0,
            'groups': [],
            'user_permissions': []
        }
        try:
            response2 = client.post(reverse('Register'),
                                data=json.dumps(body_data2),
                                content_type='application/json'
                                )
        except:
            print("ERROR")

        body_data3 = {
            'password': '',
            #'last_login': 0,
            'is_superuser': False,
            'username': '',
            'first_name': '',
            'last_name': '',
            'email': '',
            'is_staff': False,
            'is_active': False,
            #'date_joined': 0,
            'groups': [],
            'user_permissions': []
        }
        try:
            response3 = client.post(reverse('Register'),
                                data=json.dumps(body_data3),
                                content_type='application/json'
                                )
        except:
            print("ERROR")

        body_data3["username"] = "bademail#mymail.com"
        try:
            response4 = client.post(reverse('Register'),
                                data=json.dumps(body_data3),
                                content_type='application/json'
                                )
        except:
            print("ERROR")

        

        body_data3["username"] = "myemail@example.com"
        body_data3["password"] = ""
        try:
            response4 = client.post(reverse('Register'),
                                data=json.dumps(body_data3),
                                content_type='application/json'
                                )
        except:
            print("ERROR")

        body_data3["username"] = "myemail@example.com"
        body_data3["password"] = "myValidPassword"
        try:
            response4 = client.post(reverse('Register'),
                                data=json.dumps(body_data3),
                                content_type='application/json'
                                )
        except:
            print("ERROR")


        
    
    
    def test_LoginView(self):
        client = Client()
        try:
            response = client.post(reverse('Login'), content_type='application/json',
                                data=json.dumps({"username": "","password": "houston123"}))
                #"username": "ax.alvarenga19@gmail.com",
                #"password": "houston123"
            #}))
        except:
            print("MESSAGE: FAILED LOGIN TEST AS EXPECTED")
 
        try:
            response = client.post(reverse('Login'), content_type='application/json',
                                data=json.dumps({"username": "myemail@example.com","password": ""}))
                #"username": "ax.alvarenga19@gmail.com",
                #"password": "houston123"
            #}))
        except:
            print("MESSAGE: FAILED LOGIN TEST AS EXPECTED")

        
        try:
            response = client.post(reverse('Login'), content_type='application/json',
                                data=json.dumps({"username": "myemail@example.com","password": "myValidPassword"}))
                #"username": "ax.alvarenga19@gmail.com",
                #"password": "houston123"
            #}))
        except:
            print("MESSAGE: LOGIN TEST SUCCESSFUL AS EXPECTED")
        
 
        #self.assertEquals(response.status_code, 200)
    

    def test_GetStates(self):
        client = Client()
        response = client.get(reverse('GetStates'))
        self.assertEquals(response.status_code, 200)



    def test_GetSkills(self):
        client = Client()
        response = client.get(reverse('GetSkills'))
        self.assertEquals(response.status_code, 200)

    def test_GetProfile(self):

        # Case 1
        request = self.factory.get('/api/GetProfile')
        request.user = "ax.alvarenga19@gmail.com"
        response = GetProfile(request=request)
        self.assertEqual(response.status_code, 200)

        # Case 2
        request = self.factory.get('/api/GetProfile')
        request.user = self.user # Testing with a different user to reach more code
        response = GetProfile(request=request)
        self.assertEqual(response.status_code, 200)

        # Case 3
        temporary_user = User.objects.create_user(username="testuser2@mail.com",
                                        password="secret@key2")
        request = self.factory.get('/api/GetProfile')
        request.user = temporary_user.username # Testing with a different user to reach more code
        response = GetProfile(request=request)
        self.assertEqual(response.status_code, 200)

        '''
        client = Client()
        response = client.get(reverse('GetProfile'))
        self.assertEquals(response.status_code, 200)
        self.assertDictEqual
        '''

    def test_GetMatchNotifications(self):
        client = Client()
        response = client.get(reverse('GetMatchNotifications'))
        self.assertEquals(response.status_code, 200)

    def test_GetUpdateNotifications(self):
        client = Client()
        response = client.get(reverse('GetUpdateNotifications'))
        self.assertEquals(response.status_code, 200)

    def test_GetReminderNotifications(self):
        client = Client()
        response = client.get(reverse('GetReminderNotifications'))
        self.assertEquals(response.status_code, 200)

    
    '''
    def test_activateEmail(self):
        
        response = activateEmail(request=,
                                 user=,
                                 to_email=)
    '''

    def test_CreateProfile(self):
        client = Client()
        body_data = {
            "user": "sample@sample.com",
            "full_name": "Mark White",
            "address1": "12345 Houston Rd.",
            "address2": "7219 Nebraska Ave.",
            "city": "Huntsville",
            "state": "AL",
            "zip_code": "78239", 
            "skills": "Plumbing,Construction,German - Language, Cooking, Cleaning, Mathematics Skills",
            "preferences": "Events near downtown are preferred. No events after 6 pm.",
            "availability": "07/25/2024,07/26/2024,07/27/2024,08/03/2024,08/09/2024,09/15/2024"
        }
        response = client.post(reverse('CreateProfile'), content_type="application/json",
                                data=json.dumps(body_data))
        self.assertEquals(response.status_code, 200)

    def test_UpdateProfile(self):
        client = Client()
        body_data = {
            "user": "sample@sample.com",
            "full_name": "Mark White",
            "address1": "12345 Houston Rd.",
            "address2": "7219 Nebraska Ave.",
            "city": "Huntsville",
            "state": "AL",
            "zip_code": "78239", 
            "skills": "Plumbing,Construction,German - Language, Cooking, Cleaning, Mathematics Skills",
            "preferences": "Events near downtown are preferred. No events after 6 pm.",
            "availability": "07/25/2024,07/26/2024,07/27/2024,08/03/2024,08/09/2024,09/15/2024"
        }
        response = client.post(reverse('UpdateProfile'), content_type="application/json",
                                data=json.dumps(body_data))
        self.assertEquals(response.status_code, 200)

    def test_GetMonthlyEvents(self):
        client = Client()
        response = client.get(reverse('GetMonthlyEvents'))
        self.assertEquals(response.status_code, 200)

# Testing to see all volunteers for a given event
class EventVolunteerListViewTests(TestCase):

    def setUp(self):
        self.client = Client()
        self.factory = RequestFactory()
        self.view = EventVolunteerListView.as_view()

    # Given an Event ID, will return all volunteers registered at that event (in this case 3)
    def test_with_event_id(self):
        eventVolunteer1 = Event_Volunteers.objects.create(
            Event_ID=1,
            Volunteer="Alice"
        )
        eventVolunteer2 = Event_Volunteers.objects.create(
            Event_ID=1,
            Volunteer="Bob"
        )
        eventVolunteer3 = Event_Volunteers.objects.create(
            Event_ID=1,
            Volunteer="Charlie"
        )

        response = self.client.get(reverse('view_event_volunteers'), {'Event_ID': 1})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Gather the volunteers and assert they show as expected
        volunteers = [volunteer['Volunteer'] for volunteer in response.data]

        # Check that the returned queryset contains all expected event volunteers
        self.assertIn('Alice', volunteers)
        self.assertIn('Bob', volunteers)
        self.assertIn('Charlie', volunteers)

    # If no Event ID is given, we can't provide a list of volunteers (composite keys) so the response should be empty
    def test_with_no_event_id(self):
        response = self.client.get(reverse('view_event_volunteers'))

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

# Testing to see if we can update an existing row of data in the DB
class UpdateEventViewTests(TestCase):

    def setUp(self):
        self.client = Client()
        self.factory = RequestFactory()
        self.view = UpdateEventView.as_view()

        # Initial Test Event (to be modified during test)
        self.event = Event.objects.create(
            Name="Initial Event Name",
            Administrator="Admin Joe",
            Description="This is a testing description",
            Address="123 Main St",
            City="TestCity",
            State="Texas",
            Zip_Code="77777",
            Date="2024/07/19",
            Start_Time="12:00 PM",
            Duration="3h 0m",
            Skills="Dexterity, Teamwork",
            Urgency="Low",
            Created_At=timezone.now(),
        )

    def test_update_event(self):
        # Modified event values
        newData = {
            "Event_ID": self.event.pk,
            "Name": "Updated Event Name",
            "Administrator": "Super Admin Joe",
            "Description": "This is a shorter description",
            "Address": "456 Main St",
            "City": "Test Town",
            "State": "Oklahoma",
            "Zip_Code": "88888",
            "Date": "2024/07/20",
            "Start_Time": "02:00 PM",
            "Duration": "4h 0m",
            "Skills": "Dexterity, Teamwork, Patience",
            "Urgency": "Critical",
        }

        # Convert newData dictionary to JSON
        newDataJSON = json.dumps(newData)

        # Tests good data update
        response = self.client.post('/api/eventUpdate/', data=newDataJSON, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Load our updated event
        updated_event = Event.objects.get(pk=self.event.pk)

        # Assert that the event was updated correctly
        self.assertEqual(updated_event.Name, newData["Name"])
        self.assertEqual(updated_event.Administrator, newData["Administrator"])
        self.assertEqual(updated_event.Description, newData["Description"])
        self.assertEqual(updated_event.Address, newData["Address"])
        self.assertEqual(updated_event.City, newData["City"])
        self.assertEqual(updated_event.State, newData["State"])
        self.assertEqual(updated_event.Zip_Code, newData["Zip_Code"])
        self.assertEqual(updated_event.Date, newData["Date"])
        self.assertEqual(updated_event.Start_Time, newData["Start_Time"])
        self.assertEqual(updated_event.Duration, newData["Duration"])
        self.assertEqual(updated_event.Skills, newData["Skills"])
        self.assertEqual(updated_event.Urgency, newData["Urgency"])

    def test_update_fake_event(self):
        # Modified event values
        nonExistingData = {
            "Event_ID": -1,
            "Name": "Updated Event Name",
            "Administrator": "Super Admin Joe",
            "Description": "This is a shorter description",
            "Address": "456 Main St",
            "City": "Test Town",
            "State": "Oklahoma",
            "Zip_Code": "88888",
            "Date": "2024/07/20",
            "Start_Time": "02:00 PM",
            "Duration": "4h 0m",
            "Skills": "Dexterity, Teamwork, Patience",
            "Urgency": "Critical",
        }

        # Convert newData dictionary to JSON
        newDataJSON = json.dumps(nonExistingData)

        # Tests fake event update
        response = self.client.post('/api/eventUpdate/', data=newDataJSON, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_event_empty_Values(self):
        # Modified event values
        emptyData = {
            "Event_ID": self.event.pk,
            "Name": "",
            "Administrator": "",
            "Description": "",
            "Address": "",
            "City": "",
            "State": "",
            "Zip_Code": "",
            "Date": "",
            "Start_Time": "",
            "Duration": "",
            "Skills": "",
            "Urgency": "",
        }

        # Convert newData dictionary to JSON
        newDataJSON = json.dumps(emptyData)

        # Tests update with bad fields
        response = self.client.post('/api/eventUpdate/', data=newDataJSON, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

# Testing to see if we can create a new row of data in the DB
class CreateEventViewTests(TestCase):

    def setUp(self):
        self.client = Client()
        self.view = CreateEventView.as_view()

    def test_create_event_good(self):
        newEventData = {
            "Name": "My Event Name",
            "Administrator": "Admin User Joe",
            "Description": "Exciting event description",
            "Address": "456 New St",
            "City": "Test City",
            "State": "Texas",
            "Zip_Code": "12345",
            "Date": "2024/07/22",
            "Start_Time": "12:00 PM",
            "Duration": "2h 30m",
            "Skills": "Patience, Strength",
            "Urgency": "High",
        }
        newEventDataJSON = json.dumps(newEventData)

        # Send POST request to create a new event
        response = self.client.post(
            path=reverse('create_event'),
            data=newEventDataJSON,
            content_type='application/json',
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_create_event_bad(self):
        newEventData = {
            "Name": "Missing Fields Jimmy"
        }
        newEventDataJSON = json.dumps(newEventData)

        # Send POST request to create a new event
        response = self.client.post(
            path=reverse('create_event'),
            data=newEventDataJSON,
            content_type='application/json',
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_event_empty(self):
        emptyEventData = {
            "Name": "",
            "Administrator": "",
            "Description": "",
            "Address": "",
            "City": "",
            "State": "",
            "Zip_Code": "",
            "Date": "20",
            "Start_Time": "",
            "Duration": "",
            "Skills": "",
            "Urgency": "",
        }
        newEventDataJSON = json.dumps(emptyEventData)

        # Send POST request to create a new event
        response = self.client.post(
            path=reverse('create_event'),
            data=newEventDataJSON,
            content_type='application/json',
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Name cannot be empty.", str(response.content))
        self.assertIn("Description cannot be empty.", str(response.content))
        self.assertIn("Address cannot be empty.", str(response.content))
        self.assertIn("City cannot be empty.", str(response.content))
        self.assertIn("State cannot be empty.", str(response.content))
        self.assertIn("Zip Code cannot be empty.", str(response.content))


# Testing to see if we can delete an existing row of data in the DB
class DeleteEventViewTests(TestCase):

    def setUp(self):
        self.client = Client()
        self.view = DeleteEventView.as_view()

        # Initial Test Event (to be deleted during test)
        self.event = Event.objects.create(
            Name="Initial Event Name",
            Administrator="Admin Joe",
            Description="This is a testing description",
            Address="123 Main St",
            City="TestCity",
            State="Texas",
            Zip_Code="77777",
            Date="2024/07/19",
            Start_Time="12:00 PM",
            Duration="3h 0m",
            Skills="Dexterity, Teamwork",
            Urgency="Low",
            Created_At=timezone.now(),
        )

    def test_delete_event_good(self):
        # Gets the primary key (Event ID) of the just created event so that we can find it and delete it
        eventID = {"Event_ID" : self.event.pk}
        deleteEventDataJSON = json.dumps(eventID)

        # Send POST request to delete above event
        response = self.client.post(
            path=reverse('delete_event'),
            data=deleteEventDataJSON,
            content_type='application/json',
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_nonexistent_event_(self):
        # Attempts to delete a non-existing event and should return 404 NOT FOUND
        eventID = {"Event_ID" : -1}
        deleteEventDataJSON = json.dumps(eventID)

        # Send POST request to delete above event
        response = self.client.post(
            path=reverse('delete_event'),
            data=deleteEventDataJSON,
            content_type='application/json',
        )

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    
    def test_delete_event_bad(self):
        # We will not be sending anything so that we can see if we get the expected "BAD REQUEST" response
        eventID = {"Event_Identification": "Not a Number"}
        deleteEventDataJSON = json.dumps(eventID)

        # Send POST request to delete above event
        response = self.client.post(
            path=reverse('delete_event'),
            data=deleteEventDataJSON,
            content_type='application/json',
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

# Testing to see if we can update an existing row of data in the DB
class UpdateVolunteerHistoryTests(TestCase):

    def setUp(self):
        self.client = Client()
        self.factory = RequestFactory()
        self.view = UpdateVolunteerHistory.as_view()

        # Initial Test Volunteer History (to be modified during test)
        self.history = Event_Volunteers.objects.create(
            Event_ID = "1",
            Volunteer = "Billy",
            Attended = "N"            
        )

    def test_update_history_to_yes(self):
        # Modified event values
        newData = {
            "id": self.history.pk,
            "Event_ID": "1",
            "Volunteer": "Billy",
            "Attended": "N"
        }

        # Convert newData dictionary to JSON
        newDataJSON = json.dumps(newData)

        # Tests good data update
        response = self.client.post('/api/updateVolunteerHistory/', data=newDataJSON, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Load our updated history
        updated_history = Event_Volunteers.objects.get(pk=self.event.pk)

        # Assert that the history was updated correctly
        self.assertEqual(updated_history.Event_ID, newData["Event_ID"])
        self.assertEqual(updated_history.Volunteer, newData["Volunteer"])
        self.assertEqual(updated_history.Attended, "Y")

    def test_update_history_to_no(self):
        # Modified event values
        newData = {
            "id": self.history.pk,
            "Event_ID": "1",
            "Volunteer": "Billy",
            "Attended": "Y"
        }

        # Convert newData dictionary to JSON
        newDataJSON = json.dumps(newData)

        # Tests good data update
        response = self.client.post('/api/updateVolunteerHistory/', data=newDataJSON, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Load our updated history
        updated_history = Event_Volunteers.objects.get(pk=self.event.pk)

        # Assert that the history was updated correctly
        self.assertEqual(updated_history.Event_ID, newData["Event_ID"])
        self.assertEqual(updated_history.Volunteer, newData["Volunteer"])
        self.assertEqual(updated_history.Attended, "N")

    def test_update_history_not_existing(self):
        # Modified event values
        newData = {
            "id": -1,
            "Event_ID": "-1",
            "Volunteer": "Billy",
            "Attended": "Y"
        }

        # Convert newData dictionary to JSON
        newDataJSON = json.dumps(newData)

        # Tests good data update
        response = self.client.post('/api/updateVolunteerHistory/', data=newDataJSON, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_history_bad_data(self):
        # Modified event values
        newData = {
            "id": self.history.pk,
            "Event_Identification": "1",
            "Volunteer_Name": "Billy",
            "Attended_Value": "Y"
        }

        # Convert newData dictionary to JSON
        newDataJSON = json.dumps(newData)

        # Tests good data update
        response = self.client.post('/api/updateVolunteerHistory/', data=newDataJSON, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

# Testing to see if we can update an existing row of data in the DB
class VolunteerMatchingTests(TestCase):

    def setUp(self):
        self.client = Client()
        self.factory = RequestFactory()
        self.view = EventVolunteerMatch.as_view()

    def test_create_event_volunteer(self):
        # Modified event values
        newData = {
            "Event_ID": "1",
            "Volunteer": "Billy",
        }

        # Convert newData dictionary to JSON
        newDataJSON = json.dumps(newData)

        # Tests good data update
        response = self.client.post('/api/eventVolunteerMatch/', data=newDataJSON, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_event_bad_request(self):
        # Modified event values
        newData = {
            "Event_Identification": "2",
            "Volunteer": "Bob",
        }

        # Convert newData dictionary to JSON
        newDataJSON = json.dumps(newData)

        # Tests good data update
        response = self.client.post('/api/eventVolunteerMatch/', data=newDataJSON, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)