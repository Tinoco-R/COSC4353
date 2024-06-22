import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import AdminHomePage from "./adminHomepage";
import VolunteerHomePage from "./volunteerHomepage";
import Sidebar from "./sidebar";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

// Creates sidebar on the left side of the screen. Needs user authentication to be able to get the administrator OR volunteer homepage
export default class SideBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<Sidebar />);
    }
}

// The given application as selected by the homepage.
class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
            <AdminHomePage />
            <VolunteerHomePage />
            </>
        );
    }
}

const sidebarDiv = document.getElementById("sidebar");
createRoot(sidebarDiv).render(<SideBar />);

const appDiv = document.getElementById("app");
createRoot(appDiv).render(<App />);