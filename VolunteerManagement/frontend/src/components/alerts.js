import React, { Component } from "react";
import { ShowNotification } from "./notification/NotificationComponent";

// Handles routing for all pages found within the administrator site
export default class Alerts extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Show notification
        ShowNotification('Alerts Page', 'This is where you will see your alerts!');
    }
}