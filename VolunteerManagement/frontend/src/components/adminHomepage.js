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
                    <Route path='/admin/' element={<Navigate replace to = "/admin/home" />} />
                    <Route path='admin/home' element = {<DefaultPage />} />

                    // Events
                    <Route path='admin/events' element = {<p>Events</p>} />
                    <Route path='admin/events/my' element = {<PersonalAdminEvents />} />
                    <Route path='admin/events/my/create-event' element={<CreateEvent />} />
                    <Route path='admin/events/my/:eventId' element={<EventDetails />} />
                    <Route path='admin/events/all' element = {<AllAdminEvents/>} />
                    <Route path='admin/events/administration' element = {<EventAdministration />} />
                    <Route path='admin/events/administration/create-event' element = {<CreateEvent />} />
                    <Route path='admin/events/administration/modify-event' element = {<ModifyEvent />} />

                    // Volunteers
                    <Route path='admin/volunteers/' element = {<p>Volunteers</p>} />
                    <Route path='admin/volunteers/View' element = {<ViewVolunteers />} />
                    <Route path='admin/volunteers/Manage' element = {<ManageNewRegistrations />} />

                    // Notifications
                    <Route path='admin/notifications' element = {<p>Notifications</p>} />
                    <Route path='admin/notifications/setup' element = {<NotificationSetup />} />
                </Routes>
            </Router>
        );
    }
}