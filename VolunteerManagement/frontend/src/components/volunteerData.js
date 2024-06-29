import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CottageIcon from '@mui/icons-material/Cottage';

// Need to get main panels for volunteer homepage and have the export return one of the lists below

export const volunteerData = [
    {
        row: 1,
        title: "Home",
        icon: <CottageIcon />,
        link: "landing",
        subNav: []
    },
    {
        row: 2,
        title: "My Profile",
        icon: <AccountCircleIcon />,
        link: "my-profile",
        subNav: []
    },
    {
        row: 3,
        title: "Logout",
        icon: <LogoutIcon />,
        link: "logout",
        subNav: []
    }, 
    {
        row: 4,
        title: "Alerts",
        icon: <NotificationsIcon />,
        link: "alerts",
        subNav: []
    }, 
];