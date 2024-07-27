import React, { Component } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import theme from "./themes";
import { ThemeProvider } from "@emotion/react";
import { cardData } from "./cardData";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import { fetchEvents, fetchEventVolunteers } from "./eventData";

const StyledLabel = styled('label')({
    fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
});

const CustomTypography = styled(Typography)(({ theme }) => ({
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main
  }));  

export default class PersonalAdminEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            administrator: "ADMIN",
            cardData: [],
        }
    }

    componentDidMount() {
        // Fetch current administrator username (hardcoded atm)
        let admin = this.state.administrator;

        // Get all events from the database
        fetchEvents().then(events => {
            this.setState({
                events: this.filterEvents(admin, events)
            });

            setTimeout(() => {
                // Get all the volunteers for each event (used to show a count)
                let events = this.state.events;
                let cards = [];
                // Loop through all events to get the volunteer count for that event
                for (let index = 0; index < events.length; index++) {
                    let data = {};
                    const event = events[index];
                    //console.log("Event", event);

                    data.eventId = event.Event_ID;
                    data.eventName = event.Name;
                    data.eventAddress = event.Address;
                    data.eventDate = event.Date;
                    data.eventStart = event.Start_Time;
                    data.eventDuration = event.Duration;
                    data.eventUrgency = event.Urgency;

                    // Fetch event volunteers
                    fetchEventVolunteers(data.eventId).then(volunteersOfEvent => {
                        // Keep track of the members for the currently selected event
                        const volunteerNamesArray = volunteersOfEvent.map(volunteer => volunteer.Volunteer);
                        data.eventVolunteers = volunteerNamesArray.length;
                    });

                    cards.push(data);
                }
                //console.log("Cards", cards);
                
                this.setState({ cardData: cards });
            }, 0);
        });
    }

    // Filter events to show only those for the logged in administrator
    filterEvents(admin, events) {
        let filtered = [];
        for (let index = 0; index < events.length; index++) {
            const event = events[index];
            const eventAdmin = event.Administrator;
            if (eventAdmin === admin) {
                filtered.push(event);
            }
        }

        return filtered;
    }

    basicCard(data) {
        return(
            <Card id="card" event={data.eventId} onClick={() => window.location.href += "/" + data.eventId} sx={{ minWidth: 100, minHeight: 140, bgcolor: theme.palette.primary.main, mb: 2 }}>
                <CardContent>
                    <CustomTypography variant="h5" component="div" className="name" gutterBottom>
                        {data.eventName}
                    </CustomTypography>
                    <CustomTypography className="location" gutterBottom>
                        {data.eventAddress}
                    </CustomTypography>
                    <CustomTypography gutterBottom>
                        {data.eventVolunteers} {`Urgency: ${data.eventUrgency}`}
                    </CustomTypography>
                    <CustomTypography gutterBottom>
                        {data.eventDate} {data.eventStart} {data.eventDuration}
                    </CustomTypography>
                </CardContent>
            </Card>
        );
    }

    newCard() {
        return(
            <Card id="card" type="new" onClick={() => window.location.href += "/create-event"} sx={{ minWidth: 100, minHeight: 140, bgcolor: theme.palette.primary.main, mb: 2 }}>
                <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <AddCircleOutlineIcon sx={{ fontSize: '6rem' }} />
                </CardContent>
            </Card>
        );
    }

    render() {
/*
         console.log("Testing with hardcoded administrator name: ADMIN");
        console.log("Cards:", this.state.cardData);
*/

        return (
            <ThemeProvider theme={theme}>
                <div>
                    <StyledLabel>
                        <h1>My Events</h1>
                    </StyledLabel>
                    <Grid container spacing={2}>
                        {this.state.cardData.map((val, index) => {
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                    {this.basicCard(val)}
                                </Grid>
                            );
                        })}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            {this.newCard()}
                        </Grid>
                    </Grid>
                </div>
            </ThemeProvider>
        );
    }
}