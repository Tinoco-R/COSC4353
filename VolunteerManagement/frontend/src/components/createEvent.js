import React, { Component, isValidElement } from "react";
import Stack from '@mui/material/Stack';
import theme from "./themes";
import { ThemeProvider } from "@emotion/react";
import Grid from '@mui/material/Grid';
import Input from "./input"
import Button from '@mui/material/Button';
import MultipleSelect from './multipleSelect';
import { skillsData } from "./skillsData";
import { stateData } from "./stateData";
import { urgencyData } from "./urgencyData";
import { Item, StyledLabel } from "./item";

export default class CreateEvent extends Component {
    constructor(props) {
        super(props);
        const initialState = {
            eventName: '',
            eventDescription: '',
            eventAddress: '',
            eventCity: '',
            eventState: '',
            eventZip: '',
            eventDate: '',
            eventStart: '',
            eventDuration: '',
            eventSkills: [],
            eventUrgency: '',
        };
    
        // Use prefilledData if available, otherwise use initialState (prefilled when modifying an event)
        this.state = props.prefilledData || initialState;

        this.prefilled = props.prefilledData !== null;

        this.eventSkillsRef = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit(event) {
        /* 
        console.log(this.state);
        event.preventDefault();

        const selectedSkills = this.eventSkillsRef.current.getSelectedValues();
        this.setState({ eventSkills: selectedSkills });
        console.log(this.state);
        */
    }

    FlexboxGapStack() {
        // Sets the maximum hours an event can be, and divdes options into equal intervals
        const maxHours = 6;
        const intervalsPerHour = 4;
        const totalIntervals = maxHours * intervalsPerHour;

        const durationOptions = [...Array(totalIntervals).keys()].map((_, index) => {
            let minutes = (index % intervalsPerHour + 1) * 15;
            let hours = Math.floor(index / intervalsPerHour);
            
            if (minutes % 60 === 0) {
                minutes = 0;
                hours += 1;
            }
            return { formattedTime: `${hours}h ${minutes}m` };
        }).map(obj => obj.formattedTime);
        
        // Prepend an empty string to the durationOptions array
        durationOptions.unshift('');

        return (
            <ThemeProvider theme={theme}>
                <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Grid item xs={12} sm={6} md={5}>
                        <Item type="background">
                            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                                <Item>
                                    <StyledLabel htmlFor="eventName">Event Name</StyledLabel>
                                    <Input type="text" label="Event Name" id="eventName" name="eventName" placeholder="Name" value={this.state.eventName || ''} />
                                </Item>

                                <Item>
                                    <StyledLabel htmlFor="eventDescription">Event Description</StyledLabel>
                                    <Input type="text" label="Event Description" id="eventDescription" name="eventDescription" placeholder="Description" value={this.state.eventDescription || ''} />
                                </Item>

                                <Item>
                                    <StyledLabel htmlFor="eventAddress">Location Address</StyledLabel>
                                    <Input type="text" label="Address" id="eventAddress" name="eventAddress" placeholder="Address" value={this.state.eventAddress || ''} />
                                </Item>

                                <Item>
                                    <StyledLabel htmlFor="eventCity">City</StyledLabel>
                                    <Input type="text" label="City" id="eventCity" name="eventCity" placeholder="City" value={this.state.eventCity || ''} />
                                </Item>
                                
                                <Item>
                                    <StyledLabel htmlFor="eventState">State</StyledLabel>
                                    <Item type="inputItem" fontFamily="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif">
                                        <MultipleSelect id="eventState" name="eventState" dataValues={stateData} isMulti={false} helpfulLabel={"State"} value={this.state.eventState ? [this.state.eventState] : []} />
                                    </Item>
                                </Item>
                                
                                <Item>
                                    <StyledLabel htmlFor="eventZip">Zip Code</StyledLabel>
                                    <Input type="text" label="Zip Code" id="eventZip" name="eventZip" placeholder="Zip" value={this.state.eventZip || ''} />
                                </Item>

                                <Item>
                                    <StyledLabel htmlFor="eventDate">Event Date</StyledLabel>
                                    <Input type="date" id="eventDate" name="eventDate" placeholder="Date" label="Date" value={this.state.eventDate || ''} />
                                </Item>

                                <Item>
                                    <StyledLabel htmlFor="eventStart">Start Time</StyledLabel>
                                    <Input label="Start" type="text" id="eventStart" name="eventStart" value={this.state.eventStart || ''} />
                                </Item>

                                <Item>
                                    <StyledLabel htmlFor="eventDuration">Duration</StyledLabel>
                                    <Item type="inputItem">
                                        <MultipleSelect id="eventDuration" name="eventDuration" dataValues={durationOptions} isMulti={false} helpfulLabel={"Duration"} value={this.state.eventDuration ? [this.state.eventDuration] : []} />
                                    </Item>
                                </Item>

                                <Item>
                                    <StyledLabel htmlFor="eventSkills">Required Skills</StyledLabel>
                                    <Item type="inputItem" fontFamily="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif">
                                        <MultipleSelect ref={this.eventSkillsRef} id="eventSkills" name="eventSkills" dataValues={skillsData} isMulti={true} helpfulLabel={"Skills"} value={this.state.eventSkills || []}  />
                                    </Item>
                                </Item>
                                
                                <Item>
                                    <StyledLabel htmlFor="eventUrgency">Urgency</StyledLabel>
                                    <Item type="inputItem" fontFamily="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif">
                                        <MultipleSelect id="eventUrgency" name="eventUrgency" dataValues={urgencyData} isMulti={false} helpfulLabel={"Urgency"} value={this.state.eventUrgency ? [this.state.eventUrgency] : []} />
                                    </Item>
                                </Item>
                            </Stack>
                        </Item>
                    </Grid>
                </Grid>
            </ThemeProvider>
        );
      }

    // Skills here are hardcoded, but should reference the database for all skills admins have created
    render() {
        let pageTitle;
        let eventButton;

        if (!this.prefilled) {
            pageTitle = "Create A New Event";
            eventButton = "Create Event";
        }
        else {
            pageTitle = "Modify Existing Event";
            eventButton = "Update Event";
        }

        return (
            <div className="createEvent" style={{ textAlign: 'center' }}>
                <form id="eventForm" onSubmit={this.handleSubmit}>
                    <StyledLabel >
                        <h1>{pageTitle}</h1>
                    </StyledLabel>
                    {this.FlexboxGapStack()}
                        <Button style={{backgroundColor: "#61892F" /* #86C232 #61892F */}}  variant="contained" type="submit" fontFamily="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif">{eventButton}</Button>                
                </form>
            </div>
        );
    }
}