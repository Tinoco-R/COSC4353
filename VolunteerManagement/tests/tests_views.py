# Test for views.py

from django.test import TestCase, Client
from django.urls import reverse
from api.models import *
from api.views import *

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


        
    
    '''
    def test_LoginView(self):
        client = Client()
        response = client.post(reverse('Login'),headers={'Content-Type: application/json'},
                               data=bytes(json.dumps({"username": "ax.alvarenga19@gmail.com","password": "houston123"}).encode("utf-8")))
            #"username": "ax.alvarenga19@gmail.com",
            #"password": "houston123"
        #}))
        self.assertEquals(response.status_code, 200)
    '''

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

    
    
        
        


