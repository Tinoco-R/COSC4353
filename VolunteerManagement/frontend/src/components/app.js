import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import AdminHomePage from "./adminHomepage";
import Sidebar from "./sidebar";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

export default class SideBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Sidebar />
            </Router>
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AdminHomePage />
        );
    }
}

const appDiv = document.getElementById("app");
createRoot(appDiv).render(<App />);


const sidebarDiv = document.getElementById("sidebar");
createRoot(sidebarDiv).render(<SideBar />);