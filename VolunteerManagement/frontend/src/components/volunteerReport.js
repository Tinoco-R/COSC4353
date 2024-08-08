import React, { Component } from "react";
import { Button } from "@mui/material";

export default class VolunteerReport extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Button style={{backgroundColor: "#86C232"}} onClick={() => {this.alterStatus()}} variant="contained" type="submit" fontFamily="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif">Alter Attended Status</Button>
        )
    }
}