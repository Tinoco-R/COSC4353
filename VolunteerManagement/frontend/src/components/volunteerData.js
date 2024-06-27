import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

// Need to get main panels for volunteer homepage and have the export return one of the lists below

export const volunteerData = [
    {
        row: 1,
        title: "My Profile",
        icon: <AccountCircleIcon />,
        link: "my-profile",
        subNav: []
    },
    {
        row: 2,
        title: "Logout",
        icon: <LogoutIcon />,
        link: "logout",
        subNav: []
    }, 
];