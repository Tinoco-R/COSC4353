from rest_framework import serializers
from .models import Event, Event_Volunteers

# Axel's models:
from .models import User

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('Event_ID', 'Name', 'Administrator', 'Description', 'Address', 'City', 'State', 'Zip_Code', 'Date', 'Start_Time', 'Urgency', 'Created_At', 'Skills', 'Duration')
        #fields = ('Event_ID', 'Name', 'Administrator', 'Description', 'Address', 'City', 'State', 'Zip_Code', 'Date', 'Start_Time', 'Urgency', 'Created_At', 'Created_By', 'Skills', 'Duration')

class CreateEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('Event_ID', 'Name', 'Administrator', 'Description', 'Address', 'City', 'State', 'Zip_Code', 'Date', 'Start_Time', 'Urgency', 'Skills', 'Duration')

class UpdateEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('Event_ID', 'Name', 'Administrator', 'Description', 'Address', 'City', 'State', 'Zip_Code', 'Date', 'Start_Time', 'Urgency', 'Skills', 'Duration')
        extra_kwargs = {
            'Event_ID': {'required': True}
        }

class DeleteEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['Event_ID']
        extra_kwargs = {
            'Event_ID': {'required': True}
        }

class EventVolunteerMatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event_Volunteers
        fields = ['Event_ID', 'Volunteer']

class CreateEventVolunteerMatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event_Volunteers
        fields = ['Event_ID', 'Volunteer']
        extra_kwargs = {
            'Event_ID': {'required': True}
        }

# Axel' code:
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('__all__')