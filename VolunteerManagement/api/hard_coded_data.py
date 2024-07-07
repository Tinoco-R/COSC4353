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

user1 = None
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

