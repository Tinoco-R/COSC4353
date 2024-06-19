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

export const sidebarData = [
    {
        row: 1,
        title: "Home",
        icon: <CottageIcon />,
        link: "/Home",
        subNav: []
    },
    // Events
    {
        row: 2,
        title: "Events",
        icon: <EventNoteSharpIcon />,
        link: "/Events",
        subNav: [
            {
                item: "a",
                title: "My Events",
                icon: <EventIcon />,
                link: "/Events/My"
            },
            
            {
                item: "b",
                title: "All Events",
                icon: <DateRangeIcon />,
                link: "/Events/All"
            },
            
            {
                item: "c",
                title: "Event Administration",
                icon: <EditCalendarIcon />,
                link: "/Events/Administration"
            },
        ]
    },

    // Volunteers
    {
        row: 3,
        title: "Volunteers",
        icon: <PeopleSharpIcon />,
        link: "/Volunteers",
        subNav: [
            {
                item: "a",
                title: "View Volunteers",
                icon: <VolunteerActivismIcon />,
                link: "/Volunteers/View"
            },
        
            {
                item: "b",
                title: "Manage New Registrations",
                icon: <ManageAccountsIcon />,
                link: "/Volunteers/Manage"
            },
        ]
    },

    // Notifications
    {
        row: 4,
        title: "Notifications",
        icon: <CallToActionSharpIcon />,
        link: "/Notification",
        subNav: [
            {
                item: "a",
                title: "Setup Notification System",
                icon: <EditNotificationsIcon />,
                link: "/Notification/Setup"
            }
        ]
    } 
];