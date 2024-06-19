from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('Event_ID', 'Administrator', 'Urgency', 'Address', 'State', 'City' ,'Zip_Code', 'Volunteer_Count', 'Skills', 'Created_By', 'Created_At')
