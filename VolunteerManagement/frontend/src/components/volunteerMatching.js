import React, { Component } from "react";
import Event from "./table/event"
import VolunteerDetailsAdmin from "./table/volunteer";

export default class VolunteerMatching extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const test = 1;
        return (
            <>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ flex: 2 }}>
                        <Event />
                    </div>
                    <div style={{ flex: 1 }}>
                        <VolunteerDetailsAdmin />
                    </div>
                </div>
            </>
        );
    }
}