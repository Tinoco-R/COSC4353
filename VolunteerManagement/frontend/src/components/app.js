import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import AdminHomePage from "./adminHomepage";
import VolunteerHomePage from "./volunteerHomepage";
import Sidebar from "./sidebar";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";

// Creates sidebar on the left side of the screen. Needs user authentication to be able to get the administrator OR volunteer homepage
export default class SideBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Check if the url is one of the login pages (do not load the sidebar)
        const excludeRoutes = ['/login/', '/reset-password/', '/email-address-received/', '/sign-up/', '/verification/'];
        const renderSidebar = !excludeRoutes.includes(location.pathname);

        // Check if the url is for admins (load admin sidebar)
        const adminSidebarPattern = /^\/admin\/.*/;
        const isAdmin = adminSidebarPattern.test(location.pathname);

        // Check if the url is for volunteers (load volunteer sidebar); redundant check
        const volunteerSidebarPattern = /^\/volunteer\/.*/;
        const isVolunteer = volunteerSidebarPattern.test(location.pathname);

        return (
        <>
        {renderSidebar && isAdmin && <Sidebar userType="admin" />}
        {renderSidebar && !isAdmin /* && isVolunteer */ && <Sidebar userType="volunteer" />} {/* Commented out isVolunteer as volunteer sites do not yet have /volunteer/ prepended (Had to add !isAdmin as the admin page would get 2 sidebars) */}
        </>
        );
    }
}

// The given application as selected by the homepage.
class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Check if the url is for admins (load admin sidebar)
        const adminSidebarPattern = /^\/admin\/.*/;
        const isAdmin = adminSidebarPattern.test(location.pathname);
        
        // Check if the url is for volunteers (load volunteer sidebar); redundant check
        const volunteerSidebarPattern = /^\/volunteer\/.*/;
        const isVolunteer = volunteerSidebarPattern.test(location.pathname);

        // Render the correct homepage
        // The third row is currently implemented as volunteer pages do not yet have "/volunteer/" prepended to their urls
        return (
            <>
            {isAdmin && <AdminHomePage />}
            {isVolunteer && <VolunteerHomePage />}
            {!isAdmin && !isVolunteer && <VolunteerHomePage />}
            </>
        );
    }
}

const sidebarDiv = document.getElementById("sidebar");
createRoot(sidebarDiv).render(<SideBar />);

const appDiv = document.getElementById("app");
createRoot(appDiv).render(<App />);