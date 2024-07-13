from django.db import models
import string, random


from django.core.validators import MinLengthValidator # https://stackoverflow.com/questions/15845116/how-to-set-min-length-for-models-textfield
from django.contrib.auth.models import User as UserDefault

from django.contrib.postgres.fields import ArrayField
from datetime import date

# Generates unique ID code and ensures it doesn't yet exist in the database
def generate_unique_code():
    length = 10
    
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k = length))
        if Event.objects.filter(code).count() == 0:
            break

class Skill(models.Model):
    Name = models.CharField(max_length = 20, unique = True)

class Event(models.Model):
    Event_ID = models.CharField(max_length = 10, default = "", unique = True, primary_key = True)
    Administrator = models.CharField(max_length = 50)
    Urgency = models.CharField(max_length= 10, default = "") # Immediate, High, Moderate, Low
    Address = models.CharField(max_length = 75)
    State = models.CharField(max_length = 2)
    City = models.CharField(max_length = 45)
    Zip_Code = models.CharField(max_length = 10)
    Volunteer_Count = models.IntegerField()
    Skills = models.ManyToManyField(Skill, related_name='events')
    Created_By = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    Created_At = models.DateTimeField(auto_now_add = True)


# Axel's code
class User(UserDefault):
    #user_id = models.IntegerField(unique=True)
    #username = models.CharField(max_length=100) # email
    #password = models.CharField()
    # Min length requirement code, credit: Felipe Gabriel Souze Martins at https://stackoverflow.com/questions/15845116/how-to-set-min-length-for-models-textfield
    #password = models.CharField(validators=[
    #    MinLengthValidator(8, 'The password must contain at least 8 characters')
    #])


    #verified = models.BooleanField() # True means verified, False means not verified
    pass
    # is_staff attribute from django will replace type attribute
    #type = models.BooleanField() # True for Admin, False for Volunteer



#def get_today_date():
#    l = []
#    l.append(date.today)
#    return l
'''
class Date(models.Model):
    date = models.DateField()
'''

# Profile class "extends" the default auth User model
# the class below is the class that should contain
# data like the availability of the user, their skills,
# preferences, etc.
'''
class Profile(models.Model): 
    user = models.OneToOneField(UserDefault, on_delete=models.CASCADE)

    full_name = models.CharField(null=False, blank=False, max_length=50, default='') # "blank=False" (required)
    # must ensure, in the view, at the programming level that the value is not null
    address1 = models.CharField(null=False, blank=False, max_length=100, default='') 
    address2 = models.CharField(null=True, blank=True, max_length=100)
    city = models.CharField(null=False, blank=False, max_length=100, default='Houston')
    state = models.CharField(null=False, blank=False, max_length=2, default='TX')
    zip_code = models.CharField(null=False, blank=False, max_length=9, validators=[MinLengthValidator(5)], default='12345')
    skills = models.CharField(null=False, blank=False)
    #skills = models.ManyToManyField(to=Skill, related_name='user_skills_relation')
    preferences = models.TextField(null=True, blank=True, max_length=1000)
    availability = models.ManyToManyField(to=Date, related_name='dates_availability')
'''



