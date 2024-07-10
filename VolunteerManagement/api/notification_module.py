################################
# Notification module

from . import hard_coded_data

# The notification module would run every time
# a user logs in



def create_event_change_notification():
    # hard-coded notification
    # at login, the front-end must call the get notifications
    # endpoint to see if there is any notifications
    # for the user that just logged in

    # 1. Front-end calls the endpoint to see if there is any notifications
    # 2. If any, the backend sends the notifications list
    #    to the front-end
    # 3. Front-end has to notify the user somehow (look-up Raphaels front end 
    # to display notifications -where the user could see all their notifications
    # - you can display the notifications there)
    notification = hard_coded_data.EventChangeNotification()
    return notification



def create_event_matched_notification():
    # hard-coded notification
    # at login, the front-end must call the get notifications
    # endpoint to see if there is any notifications
    # for the user that just logged in

    # 1. Front-end calls the endpoint to see if there is any notifications
    # 2. If any, the backend sends the notifications list
    #    to the front-end
    # 3. Front-end has to notify the user somehow (look-up Raphaels front end 
    # to display notifications -where the user could see all their notifications
    # - you can display the notifications there)
    notification = hard_coded_data.EventMatchedNotification()
    return notification
    


def create_reminder_notification():
    # hard-coded notification
    # at login, the front-end must call the get notifications
    # endpoint to see if there is any notifications
    # for the user that just logged in

    # 1. Front-end calls the endpoint to see if there is any notifications
    # 2. If any, the backend sends the notifications list
    #    to the front-end
    # 3. Front-end has to notify the user somehow (look-up Raphaels front end 
    # to display notifications -where the user could see all their notifications
    # - you can display the notifications there)
    notification = hard_coded_data.EventReminderNotification()
    return notification


