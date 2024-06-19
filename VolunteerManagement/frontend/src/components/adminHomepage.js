import React, { Component } from "react";
import PersonalAdminEvents from "./personalAdminEvents";
import EventAdministration from "./eventAdministration";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";


export default class AdminHomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <Routes>
                        <Route path='/' element={<Navigate replace to="/Home" />} />
                        <Route path='/Administration'/>
                        <Route path='/MyEvents' element={<PersonalAdminEvents />} />
                        <Route path='/EventAdministration' element={<EventAdministration />} />
                    </Routes>
                </div>
            </Router>
        );
    }
}