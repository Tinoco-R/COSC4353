from rest_framework import serializers
from .models import Event

# Axel's models:
from .models import User

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('Event_ID', 'Administrator', 'Urgency', 'Address', 'State', 'City' ,'Zip_Code', 'Volunteer_Count', 'Skills', 'Created_By', 'Created_At')

# Axel' code:
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('__all__')