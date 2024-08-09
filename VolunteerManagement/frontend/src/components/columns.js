import { useTheme } from '@mui/material/styles';
import React from 'react';

export const eventMatchingColumns = [
    { field: 'Event_ID', headerName: 'ID', flex: 1 },
    { field: 'Name', headerName: 'Name', flex: 2 },
    { field: 'Administrator', headerName: 'Administrator', flex: 2 },
    { field: 'Date', headerName: 'Date', flex: 1 },
    { field: 'Urgency', headerName: 'Urgency', flex: 1 },
    //{ field: 'Volunteers', headerName: 'Volunteers', flex: 1 }, need to fix implementation to allow to keep track of how many volunteers are at an event
    { field: 'Skills', headerName: 'Skills', flex: 5 },
];

export const volunteerViewColumns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'Event_ID', headerName: 'Event ID', flex: 1 },
    { field: 'Volunteer', headerName: 'Volunteer', flex: 1 },
    {
        field: 'Attended',
        headerName: 'Attended',
        flex: 1,
        renderCell: (params) => {
            const theme = useTheme();
            if (params.value === "N") {
                return <span style={{ color: theme.palette.error.main }}>No</span>;
            }
            else {
                return <span style={{ color: theme.palette.success.main }}>Yes</span>;
            }
        },
    },
];

export const eventModificationColumns = [
    { field: 'Event_ID', headerName: 'ID', flex: 1 },
    { field: 'Name', headerName: 'Event Name', flex: 2 },
    { field: 'Administrator', headerName: 'Administrator', flex: 2 },
    { field: 'Description', headerName: 'Description', flex: 4 },
    { field: 'Address', headerName: 'Address', flex: 2 },
    { field: 'City', headerName: 'City', flex: 1 },
    { field: 'State', headerName: 'State', flex: 1 },
    { field: 'Zip_Code', headerName: 'Zip Code', flex: 1 },
    { field: 'Date', headerName: 'Date', flex: 2 },
    { field: 'Start_Time', headerName: 'Time', flex: 1 },
    { field: 'Duration', headerName: 'Duration', flex: 1 },
    { field: 'Skills', headerName: 'Skills', flex: 4 },
    { field: 'Urgency', headerName: 'Urgency', flex: 1 },
];