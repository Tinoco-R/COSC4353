import React from 'react'

import MyEventsHeader from './WelcomeMessage';
import ResponsiveBar from './ResponsiveBar';

import { CustomCalendar } from './CustomCalendarv2';

import { render, unmountComponentAtNode } from "react-dom";

import { createRoot } from 'react-dom/client';
import { ShowNotification } from "./notification/NotificationComponent";


export default function LandingPageWithEvents(){
    // Credit for idea about how to do rendering of this class component
    // in a file that is not the on in which it was defined
    // source: user HoldPffHUnger at https://stackoverflow.com/questions/44744673/import-reactjs-component-from-another-file
    
    //////// code below did not work
    //console.log(window.location.pathname);
    //if (window.location.pathname === '/landing/' ||
    //    window.location.pathname === '/landing'){ // credit: https://www.freecodecamp.org/news/how-to-get-the-current-url-with-javascript/
        
        //const calendarDiv = document.getElementById("calendar");
        //render(<CustomCalendar />, calendarDiv);
    //}
    //else {
    //    console.log()
        //unmountComponentAtNode(document.getElementById("calendar"));
    //}
    ////////

    return (
        <>

            {/*<ResponsiveBar />*/}
            {/*{ShowNotification('Welcome!', 'Thank you for visiting our site for the first time')}*/}
            <MyEventsHeader />

            <CustomCalendar />
        </>
    );
}