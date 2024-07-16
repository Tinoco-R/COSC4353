import React, { useEffect } from 'react';
import { useState } from 'react';

export default function MyEventsHeader() {

    const [loggedUser, setLoggedUser] = useState([]);
    useEffect(() => {
        var get_user_url = '/api/User'
        fetch(get_user_url, {
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
            console.log("res:");
            console.log(res);
            return res.json(); //res_json;/*response in json format*/
        })
        .then((data) => {
            /*
            console.log('data:')
            console.log(data.username);
            var arr = [];
            for (const state in data) {
                arr.push({ value: state, label: data[state]});
            }

            console.log(arr);*/
            setLoggedUser(data.username); // final data for the component
        });
    }, []);

    return (
        <h1 className='welcomeMessage'>Welcome, {loggedUser}! Here are your monthly events</h1>
    );
};