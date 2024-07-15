##############################
### File with hard coded data
##############################

###################################################################
### Hard coded variables:

states = {
    "TX": "TX",
    "OK": "OK",
    "AL": "AL",
    "NM": "NM"
}


skills = {
    "roofing": "roofing",
    "construction": "construction",
    "mowing": "mowing",
    "vietnameseLanguage": "Vietnamese - Language",
    "computerSkills": "Computer Skilss"
}






##################################################################
### Profile class:
### Class to manage profile (hard-coded for this assignment 3)
### the methods for this class are called from other areas in the 
### backend to read and write values to instances of this class
### (which would represent the tuples of the database)

class Profile():
    user = None # email address (username associated with this profile)
    full_name = None
    address1 = None
    address2 = None
    city = None
    state = None
    zip_code = None
    skills = None
    preferences = None
    availability = None


    def update(self, user, full_name, address1, address2,
               city, state, zip_code, skills,
               preferences, availability):

        self.user = user
        self.full_name = full_name
        self.address1 = address1
        self.address2 = address2
        self.city = city
        self.state = state
        self.zip_code = zip_code
        self.skills = skills
        self.preferences = preferences
        self.availability = availability
    


    def __init__(self, user, full_name, address1, address2,
               city, state, zip_code, skills,
               preferences, availability):
        
        self.user = user
        self.full_name = full_name
        self.address1 = address1
        self.address2 = address2
        self.city = city
        self.state = state
        self.zip_code = zip_code
        self.skills = skills
        self.preferences = preferences
        self.availability = availability

    def get_user(self):
        return self.user
    
    def get_full_name(self):
        return self.full_name
    
    def get_address1(self):
        return self.address1
    
    def get_address2(self):
        return self.address2
    
    def get_city(self):
        return self.city
    
    def get_state(self):
        return self.state
    
    def get_zip_code(self):
        return self.zip_code
    
    def get_skills(self):
        return self.skills
    
    def get_preferences(self):
        return self.preferences
    
    def get_availability(self):
        return self.availability
    

#####################################################################
###### Hard-coded profile instances (to be initialized in the backend)

user1 = Profile(user='testuser2@mail.com',
                full_name='Cloe Thompson',
                address1='19210 Magnolia St.',
                address2='72190 Seven Rd.',
                city='Boulder',
                state='CO',
                zip_code=21002,
                skills='Drawing, Singing, Math Skills',
                preferences='Events near dowtown are preferred',
                availability='08/12/2024,09/27/2024,10/15/2024')
user2 = None
user3 = None
user4 = None
user5 = None
user6 = None
user7 = None
user8 = None
user9 = None
user10 = None

list_of_profiles = [user1, user2, user3, user4, user5,
                 user6, user7, user8, user9, user10]


def get_profile(username):
    for profile in list_of_profiles:
        if (profile is not None) and (profile.user == username):
            # since username is unique, the function can
            # just return as soon as a match is found
            return profile # return the profile that matches the username

    # if no matches found, return none
    return None


'''
 ### Hardcoded user data: #######

    # Since this data is not being persisted right now, I will replace the value of profile_tmp,
    # which is likely to be None, with a created, hard-coded profile
    profile_tmp = hard_coded_data.Profile(user="sample@sample.com",
                                            full_name="Mark White",
                                            address1="12345 Houston Rd.",
                                            address2="7219 Nebraska Ave.",
                                            city="Huntsville",
                                            state="AL",
                                            zip_code="78239", 
                                            skills=["Plumbing", "Construction", "German - Language", 
                                                    "Cooking", "Cleaning", "Mathematics Skills"],
                                            preferences="Events near downtown are preferred. \
                                                        No events after 6 pm.",
                                            availability=["07/25/2024", "07/26/2024", "07/27/2024",
                                                        "08/03/2024", "08/09/2024", "09/15/2024"])
    
'''


#####################################################################
#### Events class


#####################################################################
###### Hard-coded event instances (to be initialized in the backend)

event1 = None
event2 = None
event3 = None
event4 = None
event5 = None
event6 = None
event7 = None
event8 = None
event9 = None
event10 = None


# Initialization of event hard-coded data

class Event():
    #id = None
    #calendarId = None
    #title = None
    #category = None
    #start = None
    #end = None
    #month = None

    def __init__(self, id, calendarId, title, category, start, end, month):
        self.id = id
        self.calendarId = calendarId
        self.title = title
        self.category = category
        self.start = start
        self.end = end
        self.month = month


event1 = Event('1', 'cal1', 'Community Cleaning', 'time', 
               '2024-07-28T12:00:00', '2024-07-28T13:30:00', 7)
event2 = Event('2', 'cal1', 'Senior Living Maintenance', 'time', 
               '2024-07-28T15:00:00', '2024-07-28T15:30:00', 7)


#####################################################################
#### Notifications class

# One user can be mapped to multiple notifications
# Every notification is associated with an event (we are notifying about,
# event matched, changes in an event, and reminders)

# There are 3 generic, customizable notifications that
# the system will use to create the notifications for the
# user

event_id = None
class EventMatchedNotification():
    title = "New Event"
    text = "You have been matched to the following event:"
    description = ""

    #def __init__(self, event_id):
    def __init__(self):
        self.description = "Cleaning Event on July 25, 2025"

class EventReminderNotification():
    title = "Event Reminder"
    text = "You have the following event coming up in 3 days"
    description = ""

    #def __init__(self, event_id):
    def __init__(self):
        self.description = "Cleaning Event on July 25, 2025" 


class EventChangeNotification():
    title = "Event Change"
    text = "There have been changes to the following event"
    description = ""
    prev_data = ""
    new_data = ""
    change = ""
    change_type = ""

    #def __init__(self, event_id):
    def __init__(self):
        self.description = "Cleaning Event on July 25, 2025"
        self.change_type = "Location change"
        self.old_data = "Humble"
        self.new_data = "Sugar Land"
        self.change = "Previously: " + self.old_data + " , Now: " + self.new_data


# Sample hard-coded notification
eventMatched1 = EventMatchedNotification()
eventUpdated1 = EventChangeNotification()
eventReminder1 = EventReminderNotification()



# notifications dictionary to map users to one or many
# notifications 
# Used to get all the notifications for a user using the username
# as the key
notifications = {
    "ax.alvarenga19@gmail.com": [eventMatched1, 
                                 eventUpdated1, 
                                 eventReminder1],

    # these users don't have notifications mapped to them
    
    "user2@user2.com": [eventUpdated1], 
    "user3@user3.com": [eventMatched1, eventReminder1]   
}

#####################################################################


