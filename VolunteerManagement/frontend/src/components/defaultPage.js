import React, { Component } from "react";
import { ShowNotification } from "./notification/NotificationComponent";

export default class DefaultPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        ShowNotification('Welcome Admin!', 'This is your homepage.');
    }
}