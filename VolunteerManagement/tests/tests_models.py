# Test models
# also includes tests for the hard-coded data classes used for Assignment 3
from django.test import TestCase

from api import hard_coded_data as data
from api import tokens
import six
from django.contrib.auth.base_user import AbstractBaseUser

from api.models import User

class testUserModel(TestCase):

    def test_create_user(self):
        user = User.objects.create_user('sampleusername@mymail.com',
                                        None,
                                        'myunbreakablepassword',
                                        is_staff=False,
                                        is_active=False)
        
        self.assertIsInstance(user, User)
        self.assertEqual(user.username, 'sampleusername@mymail.com')
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_active)

class testData(TestCase):

    def test_event_change_notification(self):
        event_notification = data.EventChangeNotification()

        assert (len(event_notification.change) > 0)
        assert (len(event_notification.description) > 0)
        assert (len(event_notification.change_type) > 0)
        assert (len(event_notification.old_data) > 0) 
        assert (len(event_notification.new_data) > 0)


    def test_event_matched_notification(self):
        event_matched_notification = data.EventMatchedNotification()

        assert (len(event_matched_notification.title) > 0)
        assert (len(event_matched_notification.text) > 0)
        assert (len(event_matched_notification.description) > 0)


    def test_event_reminder_notification(self):
        event_reminder_notification = data.EventReminderNotification()

        assert (len(event_reminder_notification.title) > 0)
        assert (len(event_reminder_notification.text) > 0)
        assert (len(event_reminder_notification.description) > 0)


    ## testing the hard-coded Profile class and its methods

    def test_profile_constructor(self):
        profile_instance = data.Profile("test_user@email.com",
                                        "Mike White",
                                        "12345 Main Rd.",
                                        "12219 Bridgeview Ave.",
                                        "San Francisco",
                                        "CA",
                                        "55028",
                                        "Construction, Cleaning, Cooking",
                                        "Weekend events are prefferred",
                                        "08/16/2024,08/17/2024,09/22/2024,01/10/2025")
        
        assert (profile_instance.user == 'test_user@email.com')
        assert (profile_instance.full_name == 'Mike White')
        assert (profile_instance.address1 == '12345 Main Rd.')
        assert (profile_instance.address2 == '12219 Bridgeview Ave.')
        assert (profile_instance.city == 'San Francisco')
        assert (profile_instance.state == 'CA')
        assert (profile_instance.zip_code == '55028')
        assert (profile_instance.skills == 'Construction, Cleaning, Cooking')
        assert (profile_instance.preferences == 'Weekend events are prefferred')
        assert (profile_instance.availability == '08/16/2024,08/17/2024,09/22/2024,01/10/2025')


        ## testing the get methods

        assert (profile_instance.get_user() == 'test_user@email.com')
        assert (profile_instance.get_full_name() == 'Mike White')
        assert (profile_instance.get_address1() == '12345 Main Rd.')
        assert (profile_instance.get_address2() == '12219 Bridgeview Ave.')
        assert (profile_instance.get_city() == 'San Francisco')
        assert (profile_instance.get_state() == 'CA')
        assert (profile_instance.get_zip_code() == '55028')
        assert (profile_instance.get_skills() == 'Construction, Cleaning, Cooking')
        assert (profile_instance.get_preferences() == 'Weekend events are prefferred')
        assert (profile_instance.get_availability() == '08/16/2024,08/17/2024,09/22/2024,01/10/2025')



    def test_get_profile(self):
        result = data.get_profile("user@test.com")

        assert (result is None)

    def test_update_profile(self):
        profile_instance = data.Profile("test_user@email.com",
                                "Mike White",
                                "12345 Main Rd.",
                                "12219 Bridgeview Ave.",
                                "San Francisco",
                                "CA",
                                "55028",
                                "Construction, Cleaning, Cooking",
                                "Weekend events are prefferred",
                                "08/16/2024,08/17/2024,09/22/2024,01/10/2025")
        
        profile_instance.update("test_user@email.com",
                                "George Wells",
                                "37219 York Ave.",
                                "21720 Stellar Rd.",
                                "Manhattan",
                                "NY",
                                "87103",
                                "Painting, Acting, Spanish Language",
                                "Events between 2:00pm and 6:00pm are preferred",
                                "09/16/2024,11/10/2024,11/27/2024,12/07/2024,01/12/2025")
        
        assert (profile_instance.user == 'test_user@email.com')
        assert (profile_instance.full_name == 'George Wells')
        assert (profile_instance.address1 == '37219 York Ave.')
        assert (profile_instance.address2 == '21720 Stellar Rd.')
        assert (profile_instance.city == 'Manhattan')
        assert (profile_instance.state == 'NY')
        assert (profile_instance.zip_code == '87103')
        assert (profile_instance.skills == 'Painting, Acting, Spanish Language')
        assert (profile_instance.preferences == 'Events between 2:00pm and 6:00pm are preferred')
        assert (profile_instance.availability == '09/16/2024,11/10/2024,11/27/2024,12/07/2024,01/12/2025')
    
    def test_token_generator(self):
        account_activation_token = tokens.AccountActivationTokenGenerator()

        assert (account_activation_token is not None)