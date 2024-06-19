from django.shortcuts import render
from rest_framework import generics
from .serializers import EventSerializer
from .models import Event, Skill

# Allows us to view all events/skills
class EventView(generics.CreateAPIView):
    eventQuerySet = Event.objects.all() # Returns all event objects
    serializer_class = EventSerializer # Converts to json format

class SkillView(generics.CreateAPIView):
    skillQuerySet = Skill.objects.all()
    serializer_class = EventSerializer