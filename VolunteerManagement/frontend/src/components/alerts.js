//import React, { Component } from "react";
//import { ShowNotification } from "./notification/NotificationComponent";

import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from "@mui/x-data-grid";

import { GridColDef } from '@mui/x-data-grid';

// New alerts implementation imports:
//import { Grid } from "gridjs-react";
//import { updateConfig } from "gridjs-react";
import { Grid } from "gridjs";
import { h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";

// Handles routing for all pages found within the administrator site
export default function Alerts () {

    
    const rows = [
        //{ id: 1, notification_type: 'Event Change', notification_message: 'None' },
        //{ id: 2, notification_type: 'Matched to new event', notification_message: 'None' },
        //{ id: 3, notification_type: 'Event Reminder', notification_message: 'None' }
    ]

    /* Following code is from example from grid.js documentation (open source) */
    const row = () => ["Axel", "ax.alvarenga19@gmail.com"];
    //const [data, setData] = useState([row()]);
    const [data, setData] = useState([["Axel", "ax.alvarenga19@gmail.com"]]);
    //const wrapperRef = useRef(null);

    //const rowUpdated = () => [["Axel", "ax.alvarenga19@gmail.com"],
    //                        ["Axel2", "ax.alvarenga20@gmail.com"]]
    const update = () => { setData(data.slice(0).concat([row()])) };
    

    //const grid = new Grid({
    //    data: [
    //    ['John', 'john@example.com', '(353) 01 222 3333']
    //    ]
    //});
    /********************************************* */

    /* Following code is from example from grid.js documentation (open source) */
    //grid.updateConfig({
    //    columns: ['Notification Type', 'Message'],
    //    data: [
    //        ['John', 'john@example.com', '(353) 01 222 3333'],
    //        ['Mark', 'mark@gmail.com',   '(01) 22 888 4444']
    //    ]
    //});
    /**********************************************/

    console.log("Hi from component");

    var match_notifications;
    var new_data = [];
    var new_data_copy; // used to store the updated data when the user has dismissed a notification

    /* Documentation */
    const wrapper = useRef(null);
    var grid;

    // All three of the dismiss functions receive a string that is the message of the notification
    // that is to be dismissed
    function dismissMatchedEventNotification(data){
        console.log("dismissMatchedEventNotification called");
        // mark as acknowledges in the database
        var mark_notification_as_acknowledged_api = "http://127.0.0.1:8000/api/acknowledgeNotification"
        var acknolwedge_notification = fetch(mark_notification_as_acknowledged_api,{
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
            method: "POST",
            body: JSON.stringify({
                //user: data.user,
                message: data, // the server can map the user based on the http request and the message 
            }),
            credentials: "same-origin"
        }).then((res) => {

            if (!res.ok){
                console.log("Error in profile api call");
                return;
            }

            //let index = -1;
            new_data_copy = new_data; // updated_data
            console.log('old data:', new_data_copy)
    
            for (let i = 0; i < new_data.length; i++){
                console.log("checking:", new_data_copy[i][1], "against:", data);
                
                if (new_data_copy[i][1] === data){
                    // This assignment of the sliced new_data_copy array
                    // to the new_data_copy is critical because it gives me
                    // the correct values in the updated
                    console.log("Match found");
                    new_data_copy.splice(i,1); // Remove the element where the match was found
                    break;
                }
            }
            //if (index === -1){
            //    console.log("ERROR: No match was made between the notification to be dismissed and the notifications currently in the frontend.")
            //}
            console.log("Edited notifications data:", new_data_copy);
            
            // Render the grid again to make the changes visible on the page
            grid.updateConfig({
                search: false,
                data : new_data_copy
            }).forceRender();

            /*console.log('response from backend:');
            console.log(res);
            
            let status_msg;
            let response_message = (res.text()).then((msg) => {
                console.log('msg');
                console.log(msg);
                status_msg = JSON.parse(msg)
                console.log('status_msg');
                console.log(status_msg)

                console.log('Status received:')
                console.log(status_msg.status) // status_msg is undefined here
    
                if (status_msg.status === "OK"){
                    console.log("Call to the backend completed successfully");
                    // If response from the backend is postiive, give this message to the user
                    // Commenting out the navigation for now
                    navigate('/saved-changes-confirmation');
                }
                else if (status_msg.msg === "ERROR"){
                    console.log("There was an error with the call to the backend");
                }



            })*/


        })
    }

    function dismissReminderNotification(data){
        console.log("dismissReminderNotificaiton called");
        // Modify the dat array in-place (check behavior because I do not know what will happen 
        // because the grid uses the array and I'm about to modify it

        //let index = -1;
        new_data_copy = new_data; // updated_data
        console.log('old data:', new_data_copy)

        for (let i = 0; i < new_data.length; i++){
            console.log("checking:", new_data_copy[i][1], "against:", data);
            
            if (new_data_copy[i][1] === data){
                // This assignment of the sliced new_data_copy array
                // to the new_data_copy is critical because it gives me
                // the correct values in the updated
                console.log("Match found");
                new_data_copy.splice(i,1); // Remove the element where the match was found
                break;
            }
        }
        //if (index === -1){
        //    console.log("ERROR: No match was made between the notification to be dismissed and the notifications currently in the frontend.")
        //}
        console.log("Edited notifications data:", new_data_copy);
        
        // Render the grid again to make the changes visible on the page
        grid.updateConfig({
            search: false,
            data : new_data_copy
        }).forceRender();

    }

    function dismissUpdateNotification(data){
        console.log("dismissUpdateNotification called");

        // remove the entry in the database
        var delete_notification_entry_api = "http://127.0.0.1:8000/api/deleteNotification"
        var delete_notification = fetch(delete_notification_entry_api,{
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
            method: "POST",
            body: JSON.stringify({
                //user: data.user,
                message: data, // the server can map the user based on the http request and the message 
            }),
            credentials: "same-origin"
        }).then((res) => {

            if (!res.ok){
                console.log("Error in profile api call");
                return;
            }

            //let index = -1;
            new_data_copy = new_data; // updated_data
            console.log('old data:', new_data_copy)
    
            for (let i = 0; i < new_data.length; i++){
                console.log("checking:", new_data_copy[i][1], "against:", data);
                
                if (new_data_copy[i][1] === data){
                    // This assignment of the sliced new_data_copy array
                    // to the new_data_copy is critical because it gives me
                    // the correct values in the updated
                    console.log("Match found");
                    new_data_copy.splice(i,1); // Remove the element where the match was found
                    break;
                }
            }
            //if (index === -1){
            //    console.log("ERROR: No match was made between the notification to be dismissed and the notifications currently in the frontend.")
            //}
            console.log("Edited notifications data:", new_data_copy);
            
            // Render the grid again to make the changes visible on the page
            grid.updateConfig({
                search: false,
                data : new_data_copy
            }).forceRender();

            /*console.log('response from backend:');
            console.log(res);
            
            let status_msg;
            let response_message = (res.text()).then((msg) => {
                console.log('msg');
                console.log(msg);
                status_msg = JSON.parse(msg)
                console.log('status_msg');
                console.log(status_msg)

                console.log('Status received:')
                console.log(status_msg.status) // status_msg is undefined here
    
                if (status_msg.status === "OK"){
                    console.log("Call to the backend completed successfully");
                    // If response from the backend is postiive, give this message to the user
                    // Commenting out the navigation for now
                    navigate('/saved-changes-confirmation');
                }
                else if (status_msg.msg === "ERROR"){
                    console.log("There was an error with the call to the backend");
                }



            })*/


        })

    }

    useEffect(() => {
        // initial setup
        grid = new Grid({
            columns: [
                'Notification Type',
                'Message',
                {
                    name: 'Action',
                    formatter: (cell,row) => {
                        return h('button', {
                            className: 'py-2 mb-4 px-4 border rounded-md text-white bg-blue-600',
                            onClick: () => {
                                if (confirm(`Dismissing "${row.cells[0].data}" notification: \n\n "${row.cells[1].data}"`)){
                                    console.log("User wants to dismiss notification.");
                                    console.log("Make/Add API call to dismiss the notification.");
                                    var notification_type_to_dismiss = row.cells[0].data;
                                    var notification_message_to_dismiss = row.cells[1].data;
                                    console.log("Notification to dismiss:", notification_message_to_dismiss);
                                    
                                    // 3 possible cases:
                                    // 1: the notification is a matched to new event
                                    // notification and has to be marked as acknowledged
                                    // in the database DONE - FUNCTIONAL
                                    // 2: the notification is an update of an event,
                                    // and the update notification entry has to be
                                    // deleted in the database 
                                    // 3: the notification is a reminder and has to be 
                                    // hidden in the front-end (which means, delete
                                    // the entry only in the front end and reload
                                    // just the table so that it is not visible DONE - UNTESTED
                                    if (notification_type_to_dismiss === "Matched to new event"){
                                        console.log("Notification to dimiss: Matches to new event");
                                        dismissMatchedEventNotification(notification_message_to_dismiss);
                                    }
                                    else if (notification_type_to_dismiss === "Event Reminder"){
                                        console.log("Notification to dimiss: Event Reminder");
                                        dismissReminderNotification(notification_message_to_dismiss);
                                    }
                                    else if (notification_type_to_dismiss === "Event Updated"){
                                        console.log("Notification to dimiss: Event Updated");
                                        dismissUpdateNotification(notification_message_to_dismiss);
                                    }
                                    else {
                                        console.log("Notification to dismiss was not matched to any notification type.");
                                    }
                                }
                            }
                        }, 'Dismiss');
                    }
                },
            ],
            data: [
            //['John', 'john@example.com'],
            ],
            language: {
                noRecordsFound: 'Loading...'
            }
        }).render(wrapper.current);
        
        /*setTimeout(() => {
            // lets update the config
            grid.updateConfig({
            search: false,
            data: [
                ['John', 'john@example.com', '(353) 01 222 3333'],
                ['Mark', 'mark@gmail.com',   '(01) 22 888 4444'],
            ]
            }).forceRender();
        }, 2000);*/
    }, []);

    var match_notifications;
    var new_data = [];
    function updateMatchNoficiations(data){
        console.log('updateMatchNotifications function called.');
        console.log('data received:');
        console.log(data);
        match_notifications = data;
        console.log("matchs notifications from .then are:");
        console.log(match_notifications);
         // array of arrays of notification entries
        // new_data = [[notificationtype,message1],[notificationtype,message2]]
        match_notifications.forEach((notification) => {
            console.log(notification);
            if (!(notification["message"] === "None")){
                new_data.push([
                    notification["notification_type"], 
                    notification["notification_message"]
                ])
            }
            else {
                console.log("No event matched notifications received.")
            }
        })
        //const update = () => { setData([row()]) };
        //const row2 = () => ["Rolando", "aalvarenga@uh.edu"];
        //const update2 = () => { setData([row2()]) };
        //const update = () => { setData(data.slice(0).concat([row()])) };
        grid.updateConfig({
            search: false,
            /*data: [
                ['John', 'john@example.com', '(353) 01 222 3333'],
                ['Mark', 'mark@gmail.com',   '(01) 22 888 4444'],
            ]*/
            data : new_data
        }).forceRender();
    }

    function updateReminderNoficiations(data){
        console.log('updateReminderNotifications function called.');
        console.log('data received:');
        console.log(data);
        match_notifications = data;
        console.log("reminder notifications from .then are:");
        console.log(match_notifications);
        //var new_data = [] // array of arrays of notification entries
        // new_data = [[notificationtype,message1],[notificationtype,message2]]
        match_notifications.forEach((notification) => {
            if (!(notification["message"] === "None")){
                new_data.push([
                    notification["notification_type"], 
                    notification["notification_message"]
                ])
            }
            else {
                console.log("No reminder notifications received.")
            }
        })
        //const update = () => { setData([row()]) };
        //const row2 = () => ["Rolando", "aalvarenga@uh.edu"];
        //const update2 = () => { setData([row2()]) };
        //const update = () => { setData(data.slice(0).concat([row()])) };
        grid.updateConfig({
            search: false,
            /*data: [
                ['John', 'john@example.com', '(353) 01 222 3333'],
                ['Mark', 'mark@gmail.com',   '(01) 22 888 4444'],
            ]*/
            data : new_data
        }).forceRender();
    }

    function updateChangeNoficiations(data){
        console.log('updateChangeNotifications function called.');
        console.log('data received:');
        console.log(data);
        match_notifications = data;
        console.log("chage notifications from .then are:");
        console.log(match_notifications);
        //var new_data = [] // array of arrays of notification entries
        // new_data = [[notificationtype,message1],[notificationtype,message2]]
        match_notifications.forEach((notification) => {
            if (!(notification["message"] === "None")){
                new_data.push([
                    notification["notification_type"], 
                    notification["notification_message"]
                ])
            }
            else {
                console.log("No change notifications received.")
            }
        })
        //const update = () => { setData([row()]) };
        //const row2 = () => ["Rolando", "aalvarenga@uh.edu"];
        //const update2 = () => { setData([row2()]) };
        //const update = () => { setData(data.slice(0).concat([row()])) };
        grid.updateConfig({
            search: false,
            /*data: [
                ['John', 'john@example.com', '(353) 01 222 3333'],
                ['Mark', 'mark@gmail.com',   '(01) 22 888 4444'],
            ]*/
            data : new_data
        }).forceRender();
    }

    // Getting the Match Event Notifications 
    var get_match_notifications_url = '/api/GetMatchNotifications'
    
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
        console.log("Profile from backend (getMatchNotifications):")
        //console.log(Object.keys(profile).length)
        console.log(profile);
        console.log(arr);  // Array of notifications
        // Add the MatchNotifications to the array
        let rows_tmp = [];
        arr.forEach((notificationElement) => {
            console.log('Notification Element:');
            console.log(notificationElement);
            var id = (rows.length) + 1;
            var message = notificationElement["label"];
            var type = "Matched to new event";
            // Dictionary format:
            // { id: 1, notification_type: 'Event Change', notification_message: 'None' },
            var n = {
                id: id,
                notification_type: type,
                notification_message: message,
            }
            rows_tmp.push(n)
            //Object.assign(rows, rows_tmp)
            //Object.freeze(rows).push(n);
        })
        //apiRef.current.updateRows(rows_tmp);
        console.log("Rows for update:");
        console.log(rows_tmp);
        //console.log(rows);
        updateMatchNoficiations(rows_tmp);
        //return rows_tmp;
    });

    //console.log("Notifications result:");
    //console.log(notificationsResult);

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
        var arr = [];
        console.log('not looped profile:');
        match_notifications = profile;
        console.log(profile);
        for (const data in profile) {
            arr.push({ value: data, label: profile[data]});
        }
        console.log("Profile from backend (getUpdateNotifications):")
        //console.log(Object.keys(profile).length)
        console.log(profile);
        console.log(arr);  // Array of notifications
        // Add the MatchNotifications to the array
        let rows_tmp = [];
        arr.forEach((notificationElement) => {
            console.log('Notification Element:');
            console.log(notificationElement);
            var id = (rows.length) + 1;
            var message = notificationElement["label"];
            var type = "Event Updated";
            // Dictionary format:
            // { id: 1, notification_type: 'Event Change', notification_message: 'None' },
            var n = {
                id: id,
                notification_type: type,
                notification_message: message
            }
            rows_tmp.push(n)
            //Object.assign(rows, rows_tmp)
            //Object.freeze(rows).push(n);
        })
        //apiRef.current.updateRows(rows_tmp);
        console.log("Rows for update:");
        console.log(rows_tmp);
        //console.log(rows);
        updateChangeNoficiations(rows_tmp);
        //return rows_tmp;
    });


    var get_reminder_notifications_url = '/api/GetReminderNotifications'
    var reminder_notifications;
    fetch(get_reminder_notifications_url, {
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
        var arr = [];
        console.log('not looped profile:');
        match_notifications = profile;
        console.log(profile);
        for (const data in profile) {
            arr.push({ value: data, label: profile[data]});
        }
        console.log("Profile from backend (getReminderNotifications):")
        //console.log(Object.keys(profile).length)
        console.log(profile);
        console.log(arr);  // Array of notifications
        // Add the MatchNotifications to the array
        let rows_tmp = [];
        arr.forEach((notificationElement) => {
            console.log('Notification Element:');
            console.log(notificationElement);
            var id = (rows.length) + 1;
            var message = notificationElement["label"];
            var type = "Event Reminder";
            // Dictionary format:
            // { id: 1, notification_type: 'Event Change', notification_message: 'None' },
            var n = {
                id: id,
                notification_type: type,
                notification_message: message
            }
            rows_tmp.push(n)
            //Object.assign(rows, rows_tmp)
            //Object.freeze(rows).push(n);
        })
        //apiRef.current.updateRows(rows_tmp);
        console.log("Rows for update:");
        console.log(rows_tmp);
        //console.log(rows);
        updateReminderNoficiations(rows_tmp);
        //return rows_tmp;
    });


    

    console.log('Notifications:');
    console.log(match_notifications);
    console.log(update_notifications);
    console.log(reminder_notifications);

    const columns = [
        { field: 'notification_type', headerClassName: 'notifications-table-header', headerName: 'Type', width: 300 },
        { field: 'notification_message', headerClassName: 'notifications-table-header', headerName: 'Message', width: 500}
    ]


    console.log("Hi from component");

 


    return (
    <div ref={wrapper} />
    );
}