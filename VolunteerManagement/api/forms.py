from django import forms
from django.core.validators import *
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

from django.core.exceptions import ValidationError

class RegisterForm(UserCreationForm):

    '''
    username = forms.CharField(min_length=1, max_length=100, 
                                validators=[
                                        MinLengthValidator(1),
                                        MaxLengthValidator(100),
                                        EmailValidator()
                                ])
    
    password = forms.CharField(min_length=8, validators=[
        MinLengthValidator(8)
    ])
    '''

    class Meta(UserCreationForm.Meta):
        model = User
        #fields = ("username", "password", "password1", "password2")
        fields = ["username", "password","is_active"]
    