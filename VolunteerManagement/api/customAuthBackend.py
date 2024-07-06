# Custom auth backend that will authenticate the hard-coded value

from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.models import User

class MyCustomAuthenticationBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None):

        # Authenticate any credentials for now
        try:
            user = User.objects.create_user(username=username,email=None,password=password)
        except:
            print('Something went wrong creating the user in customAuthBackend.py')

        if user is not None:
            return user # User authenticated
        else:
            return None