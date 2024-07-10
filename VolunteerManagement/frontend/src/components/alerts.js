//import React, { Component } from "react";
//import { ShowNotification } from "./notification/NotificationComponent";

import * as React from 'react';

import Box from '@mui/material/Box';
import { DataGrid } from "@mui/x-data-grid";

import { GridColDef } from '@mui/x-data-grid';

/*
const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
  ];
  */

/*
const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
 */ 




// Handles routing for all pages found within the administrator site
export default function Alerts () {

    


    console.log("Hi from component");

    // Getting the Match Event Notifications 
    var get_match_notifications_url = '/api/GetMatchNotifications'
    var match_notifications;
    fetch(get_match_notifications_url, {
        //mode: "cors",
        headers: {
            "Content-Type": "application/json", // credit: https://rapidapi.com/guides/request-headers-fetch
            "Host": "http://127.0.0.1:8000",
            //"Content-Length": "",
            "Origin": "http://127.0.0.1:8000",
            "User-Agent": "",
            "Accept": "*/*",
            "Accept-Encoding": "gzip,deflate,br",
            "Connection": "keep-alive",
            //"X-CSRF-Token": "",
            "mode": "cors",
        },
        method: "GET",
        credentials: "same-origin"
    })
    .then((res) => {
        //console.log("States from backend:");
        //console.log(res);
        //var res_json;
        //var tmp_ignore = res.text().then((tmp) => {
        //    res_json = JSON.parse(tmp);
        //});
        console.log('res');
        console.log(res);
        return res.json(); //res_json;/*response in json format*/
    })
    .then((profile) => {
        var arr = [];
        console.log('not looped profile:');
        match_notifications = profile;
        console.log(profile);
        for (const data in profile) {
            arr.push({ value: data, label: profile[data]});
        }
        console.log("Profile from backend:")
        console.log(Object.keys(profile).length)
        console.log(profile);
        console.log(arr);
    });

    // Getting the Update Event Notifications 
    var get_update_notifications_url = '/api/GetUpdateNotifications'
    var update_notifications;
    fetch(get_update_notifications_url, {
        //mode: "cors",
        headers: {
            "Content-Type": "application/json", // credit: https://rapidapi.com/guides/request-headers-fetch
            "Host": "http://127.0.0.1:8000",
            //"Content-Length": "",
            "Origin": "http://127.0.0.1:8000",
            "User-Agent": "",
            "Accept": "*/*",
            "Accept-Encoding": "gzip,deflate,br",
            "Connection": "keep-alive",
            //"X-CSRF-Token": "",
            "mode": "cors",
        },
        method: "GET",
        credentials: "same-origin"
    })
    .then((res) => {
        //console.log("States from backend:");
        //console.log(res);
        //var res_json;
        //var tmp_ignore = res.text().then((tmp) => {
        //    res_json = JSON.parse(tmp);
        //});
        console.log('res');
        console.log(res);
        return res.json(); //res_json;/*response in json format*/
    })
    .then((profile) => {
        var arr = [];
        console.log('not looped profile:');
        console.log(profile);
        update_notifications = profile;
        for (const data in profile) {
            arr.push({ value: data, label: profile[data]});
        }
        console.log("Profile from backend:")
        console.log(Object.keys(profile).length)
        console.log(profile);
        console.log(arr);
    });

    // Getting the Reminder Event Notifications 
    var get_reminder_notifications_url = '/api/GetReminderNotifications'
    //var reminder_notifications;
    var reminder_notifications = fetch(get_reminder_notifications_url, {
        //mode: "cors",
        headers: {
            "Content-Type": "application/json", // credit: https://rapidapi.com/guides/request-headers-fetch
            "Host": "http://127.0.0.1:8000",
            //"Content-Length": "",
            "Origin": "http://127.0.0.1:8000",
            "User-Agent": "",
            "Accept": "*/*",
            "Accept-Encoding": "gzip,deflate,br",
            "Connection": "keep-alive",
            //"X-CSRF-Token": "",
            "mode": "cors",
        },
        method: "GET",
        credentials: "same-origin"
    })
    .then((res) => {
        //console.log("States from backend:");
        //console.log(res);
        //var res_json;
        //var tmp_ignore = res.text().then((tmp) => {
        //    res_json = JSON.parse(tmp);
        //});
        console.log('res');
        console.log(res);
        return res.json(); //res_json;/*response in json format*/
    })
    .then((profile) => {
        var arr = [];
        console.log('not looped profile:');
        console.log(profile);
        reminder_notifications = profile;
        for (const data in profile) {
            arr.push({ value: data, label: profile[data]});
        }
        console.log("Profile from backend:")
        console.log(Object.keys(profile).length)
        console.log(profile);
        console.log(arr);
        return profile;
    });

    console.log('Notifications:');
    console.log(update_notifications);
    console.log(update_notifications);
    console.log(reminder_notifications);

    const columns = [
        { field: 'notification_type', headerClassName: 'notifications-table-header', headerName: 'Type', width: 300 },
        { field: 'notification_message', headerClassName: 'notifications-table-header', headerName: 'Message', width: 500}
    ]

    const rows = [
        { id: 1, notification_type: 'Event Change', notification_message: 'None' },
        { id: 2, notification_type: 'Matched to new event', notification_message: 'None' },
        { id: 3, notification_type: 'Event Reminder', notification_message: 'None' }
    ]


    

    console.log("Hi from component");

        return (
            <>
            <h2>Notifications</h2>
            <Box sx={{ height: 400, width: '100%', backgroundColor: 'white' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 7,
                  },
                },
              }}
              pageSizeOptions={[7]}
              checkboxSelection={false}
              disableRowSelectionOnClick
              disableColumnSorting
              sx={{ color: "black" }}
            />
          </Box>
          </>
        );
        // Show notification
        //ShowNotification('Alerts Page', 'This is where you will see your alerts!');

}