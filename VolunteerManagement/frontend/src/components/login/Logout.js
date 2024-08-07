import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import GenericButton from "../GenericButton";


export default function Logout(){


    //const [logout, setLogout] = useState([]);
    var logout_suceeded = false; // Initially false
    // Ask the server to log the user out of the current session
    var logout_url = "http://127.0.0.1:8000/api/LogoutUser"



    const logoutUser = async () => {
        try {
            console.log("Wait for the logout fetch. Logout suceeded is:", logout_suceeded);
            const tmp = await fetch(logout_url, {
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
            });
            //const result = await tmp.json();
            console.log(tmp);
            //console.log(result);
            if (true) { // Logout succeeded 
                logout_suceeded = true;
                console.log("logout_succeeded changed to:", logout_suceeded);
                if (!alert("Successfully logged out")){
                    window.location.replace("http://127.0.0.1:8000/login/");
                }
            }


        } catch (error) {
            console.log("Error with the logout request to the server.");
        }
    }
    logoutUser();

    return(
        <></>
    )

  
    


}