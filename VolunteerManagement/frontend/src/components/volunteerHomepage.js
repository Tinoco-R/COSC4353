import React, { Component } from "react";
import Login from "./login/Login";
import ResponsiveBar from "./ResponsiveBar";
import MyProfile from "./MyProfile"
import LandingPageWithEvents from "./LandingPage";
import Signup from "./login/Signup";
import InitialVerification from "./login/InitialVerification";
import ResetPassword from "./login/ResetPassword";
import Logout from "./login/Logout";
import EmailAddressReceivedConfirmation from "./login/EmailAddressReceivedConfirmation";
import NotificationComponent from "./notification/NotificationComponent";

import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

// Handles routing for all pages found within the volunteer site
export default class VolunteerHomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Routes>
                    // Home
                    <Route path='/' element={<Navigate replace to = "/login" />} />
                    <Route path='/Home' element = {<p>Home</p>} />

                    // Login Pages
                    <Route path='/login' element = {<Login />} />
                    <Route path='/sign-up' element = {<Signup />} />
                    <Route path='/verification' element = {<InitialVerification />} />
                    <Route path='/reset-password' element = {<ResetPassword />} />
                    <Route path='/email-address-received' element = {<EmailAddressReceivedConfirmation />} />

                    // Volunteer Homepage
                    <Route path='/logout' element = {<Logout />} />
                    <Route path='/landing' element = {
                        <> 
                        <ResponsiveBar />
                        <LandingPageWithEvents />
                        </>
                    }/>
                    <Route path='/my-profile' element = {
                        <> 
                        <ResponsiveBar />
                        <MyProfile />
                        </>
                    }/>
                    <Route path='/notification' element = {<NotificationComponent />} />
                </Routes>
            </Router>
        );
    }
}