from rest_framework import serializers
from .models import Event, Event_Volunteers
import datetime

# Axel's models:
#from .models import User
from django.contrib.auth.models import User

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('Event_ID', 'Name', 'Administrator', 'Description', 'Address', 'City', 'State', 'Zip_Code', 'Date', 'Start_Time', 'Urgency', 'Created_At', 'Skills', 'Duration')
        #fields = ('Event_ID', 'Name', 'Administrator', 'Description', 'Address', 'City', 'State', 'Zip_Code', 'Date', 'Start_Time', 'Urgency', 'Created_At', 'Created_By', 'Skills', 'Duration')

class VolunteerHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Event_Volunteers
        fields = ('id', 'Event_ID', 'Volunteer', 'Attended')

class UpdateVolunteerHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Event_Volunteers
        fields = ('Event_ID', 'Volunteer', 'Attended')
        validators = []


class CreateEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('Event_ID', 'Name', 'Administrator', 'Description', 'Address', 'City', 'State', 'Zip_Code', 'Date', 'Start_Time', 'Urgency', 'Skills', 'Duration')

    # Required
    def validate_Name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Name cannot be empty.")
        return value
    
    # Required
    def validate_Description(self, value):
        if not value.strip():
            raise serializers.ValidationError("Description cannot be empty.")
        
        elif len(value) > 256:
            raise serializers.ValidationError("Description exceeds the maximum length of 256 characters.")
        return value
    
    # Required
    def validate_Address(self, value):
        if not value.strip():
            raise serializers.ValidationError("Address cannot be empty.")
        elif len(value) > 75:
            raise serializers.ValidationError("Address exceeds the maximum length of 75 characters.")
        return value

    # Required
    def validate_City(self, value):
        if not value.strip():
            raise serializers.ValidationError("City cannot be empty.")
        elif len(value) > 28:
            raise serializers.ValidationError("City exceeds the maximum length of 28 characters.")
        return value

    # Required
    def validate_State(self, value):
        if not value.strip():
            raise serializers.ValidationError("State cannot be empty.")
        if len(value) > 13:
            raise serializers.ValidationError("State exceeds the maximum length of 13 characters.")
        return value

    # Required
    def validate_Zip_Code(self, value):
        if not value.strip():
            raise serializers.ValidationError("Zip Code cannot be empty.")
        if len(value) > 5:
            raise serializers.ValidationError("Zip Code exceeds the maximum length of 5 characters.")
        return value

    def validate_Urgency(self, value):
        if len(value) > 10:
            raise serializers.ValidationError("Urgency exceeds the maximum length of 10 characters.")
        return value

    def validate_Skills(self, value):
        if len(value) > 200:
            raise serializers.ValidationError("Skills exceeds the maximum length of 200 characters.")
        return value

    def validate_Duration(self, value):
        if len(value) > 6:
            raise serializers.ValidationError("Duration exceeds the maximum length of 6 characters.")
        return value

class UpdateEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('Event_ID', 'Name', 'Administrator', 'Description', 'Address', 'City', 'State', 'Zip_Code', 'Date', 'Start_Time', 'Urgency', 'Skills', 'Duration')
        extra_kwargs = {
            'Event_ID': {'required': True}
        }

    # Required
    def validate_Name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Name cannot be empty.")
        return value
    
    # Required
    def validate_Description(self, value):
        if not value.strip():
            raise serializers.ValidationError("Description cannot be empty.")
        
        elif len(value) > 256:
            raise serializers.ValidationError("Description exceeds the maximum length of 256 characters.")
        return value
    
    # Required
    def validate_Address(self, value):
        if not value.strip():
            raise serializers.ValidationError("Address cannot be empty.")
        elif len(value) > 75:
            raise serializers.ValidationError("Address exceeds the maximum length of 75 characters.")
        return value

    # Required
    def validate_City(self, value):
        if not value.strip():
            raise serializers.ValidationError("City cannot be empty.")
        elif len(value) > 28:
            raise serializers.ValidationError("City exceeds the maximum length of 28 characters.")
        return value

    # Required
    def validate_State(self, value):
        if not value.strip():
            raise serializers.ValidationError("State cannot be empty.")
        if len(value) > 13:
            raise serializers.ValidationError("State exceeds the maximum length of 13 characters.")
        return value

    # Required
    def validate_Zip_Code(self, value):
        if not value.strip():
            raise serializers.ValidationError("Zip Code cannot be empty.")
        if len(value) > 5:
            raise serializers.ValidationError("Zip Code exceeds the maximum length of 5 characters.")
        return value

    def validate_Urgency(self, value):
        if len(value) > 10:
            raise serializers.ValidationError("Urgency exceeds the maximum length of 10 characters.")
        return value

    def validate_Skills(self, value):
        if len(value) > 200:
            raise serializers.ValidationError("Skills exceeds the maximum length of 200 characters.")
        return value

    def validate_Duration(self, value):
        if len(value) > 6:
            raise serializers.ValidationError("Duration exceeds the maximum length of 6 characters.")
        return value

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