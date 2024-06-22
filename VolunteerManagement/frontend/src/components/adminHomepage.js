import React, { Component } from "react";
import PersonalAdminEvents from "./personalAdminEvents";
import EventDetails from "./eventDetails"
import CreateEvent from "./createEvent"
import ModifyEvent from "./modifyEvent"
import EventAdministration from "./eventAdministration";
import ManageNewRegistrations from "./manageNewRegistrations";
import NotificationSetup from "./notificationSetup";
import DefaultPage from "./defaultPage"
import ViewVolunteers from "./viewVolunteers"
import AllAdminEvents from "./allAdminEvents"

import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

// Handles routing for all pages found within the administrator site
export default class AdminHomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Routes>
                    // Home
                    <Route path='/' element={<Navigate replace to = "/Home" />} />
                    <Route path='/Home' element = {<DefaultPage />} />

                    // Events
                    <Route path='/Events' element = {<p>Events</p>} />
                    <Route path='/Events/My' element = {<PersonalAdminEvents />} />
                    <Route path='/Events/My/CreateEvent' element={<Navigate replace to = "/Events/Administration/CreateEvent" />} />
                    <Route path='/Events/My/:eventId' element={<EventDetails />} />
                    <Route path='/Events/All' element = {<AllAdminEvents/>} />
                    <Route path='/Events/Administration' element = {<EventAdministration />} />
                    <Route path='/Events/Administration/CreateEvent' element = {<CreateEvent />} />
                    <Route path='/Events/Administration/ModifyEvent' element = {<ModifyEvent />} />

                    // Volunteers
                    <Route path='/Volunteers/' element = {<p>Volunteers</p>} />
                    <Route path='/Volunteers/View' element = {<ViewVolunteers />} />
                    <Route path='/Volunteers/Manage' element = {<ManageNewRegistrations />} />

                    // Notifications
                    <Route path='/Notifications' element = {<p>Notifications</p>} />
                    <Route path='/Notifications/Setup' element = {<NotificationSetup />} />
                </Routes>
            </Router>
        );
    }
}