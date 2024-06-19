from django.db import models
import string, random

# Generates unique ID code and ensures it doesn't yet exist in the database
def generate_unique_code():
    length = 10
    
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k = length))
        if Event.objects.filter(code).count() == 0:
            break

from django.db import models

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