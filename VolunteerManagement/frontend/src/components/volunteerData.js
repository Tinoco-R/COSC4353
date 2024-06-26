import React from 'react'
import CottageIcon from '@mui/icons-material/Cottage';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import EventNoteSharpIcon from '@mui/icons-material/EventNoteSharp';
import EventIcon from '@mui/icons-material/Event';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import PeopleSharpIcon from '@mui/icons-material/PeopleSharp';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import CallToActionSharpIcon from '@mui/icons-material/CallToActionSharp';
import EditNotificationsIcon from '@mui/icons-material/EditNotifications';
import EditNotificationsOutlinedIcon from '@mui/icons-material/EditNotificationsOutlined';

// Need to get main panels for volunteer homepage and have the export return one of the lists below

export const volunteerData = [
    {
        row: 1,
        title: "Home",
        icon: <CottageIcon />,
        link: "landing",
        subNav: []
    },
    // Events
    {
        row: 2,
        title: "SubNav1 Events",
        icon: <EventNoteSharpIcon />,
        link: "events",
        subNav: [
            {
                item: "a",
                title: "My Events",
                icon: <EventIcon />,
                link: "events/my"
            },
            
            {
                item: "b",
                title: "All Events",
                icon: <DateRangeIcon />,
                link: "events/all"
            },
            
            {
                item: "c",
                title: "Event volunteeristration",
                icon: <EditCalendarIcon />,
                link: "events/volunteeristration"
            },
        ]
    },

    // Volunteers
    {
        row: 3,
        title: "SubNav2 Volunteers",
        icon: <PeopleSharpIcon />,
        link: "volunteers",
        subNav: [
            {
                item: "a",
                title: "View Volunteers",
                icon: <VolunteerActivismIcon />,
                link: "volunteers/view"
            },
        
            {
                item: "b",
                title: "Manage New Registrations",
                icon: <ManageAccountsIcon />,
                link: "volunteers/manage"
            },
        ]
    },

    // Notifications
    {
        row: 4,
        title: "SubNav3 Notifications",
        icon: <CallToActionSharpIcon />,
        link: "notifications",
        subNav: [
            {
                item: "a",
                title: "Setup Notification System",
                icon: <EditNotificationsIcon />,
                link: "notifications/setup"
            }
        ]
    } 
];