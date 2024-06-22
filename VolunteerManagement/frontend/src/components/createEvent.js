import React, { Component, isValidElement } from "react";
import Stack from '@mui/material/Stack';
import theme from "./themes";
import { ThemeProvider } from "@emotion/react";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Input from "./input"

const Item = styled(Paper)(({ theme, type }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(1),
  fontSize: '1.5rem',
  textAlign: 'center',
  color: "white",
  flexGrow: 1,
  backgroundColor: type === 'background'? '#2f4050' :
                   type === 'inputItem'? '#2f4050' : 
                   type === 'yetAnotherType'? '#00FF00' : '#000000'
                   // #293846 ACTIVE COLOR
                   // #2f4050 BACKGROUND COLOR OF SIDEBAR
}));

export default class CreateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventName: '',
            eventDescription: '',
            eventAddress: '',
            eventCity: '',
            eventState: '',
            eventZip: '',
            eventDate: '',
            eventStart: '',
            eventEnd: '',
            eventSkills: '',
            eventUrgency: '',
            formIsValid: false,
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    validateInputs() {
        // Check if all required inputs are entered
        if (this.state.eventName === '' || this.state.eventDescription === '' || this.state.eventAddress === '' || this.state.eventCity === '' || this.state.eventState === '' || this.state.eventZip === '' || this.state.eventSkills === '' || this.state.eventUrgency === '') {
            console.log(this.state.eventName, this.state.eventDescription, this.state.eventAddress, this.state.eventCity, this.state.eventState, this.state.eventZip, this.state.eventDate, this.state.eventStart, this.state.eventEnd, this.state.eventSkills, this.state.eventUrgency);
            console.log("Empty required field detected");
            return false;
        }
        // Event Name should be max 100 characters
        if (this.state.eventName.length() > 100) {
            console.log("Over 100 characters for event name")
            return false;
        }

        // Event should be in the present or future, not the past
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        if (this.state.eventStart < currentDate) {
            console.log("New events should occur in the future")
            return false;
        }

        // Start time should be before end time
        if (this.state.eventStart >= this.event.eventEnd) {
            console.log("Invalid event times")
            return false;
        }
        console.log("No issues in form")
        return true;
    }

    handleInputChange(id, isValid) {
        console.log(`Input ${id} is ${isValid? 'valid' : 'invalid'}`);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.validateInputs()) {
            alert("Please fill out all required fields.");
        }
    }

    FlexboxGapStack() {
        return (
            <ThemeProvider theme={theme}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Item type="background">
                            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                                <Item>
                                    <label htmlFor="eventName">Event Name</label>
                                    <Input type="text" label="Event Name" id="eventName" name="eventName" placeholder="Name" onValidityChange={(isValid) => this.handleInputChange('eventName', isValid)}/>
                                </Item>

                                <Item>
                                    <label htmlFor="eventDescription">Event Description</label>
                                    <Input type="text" label="Event Description" id="eventDescription" name="eventDescription" placeholder="Description" onValidityChange={(isValid) => this.handleInputChange('eventDescription', isValid)}/>
                                </Item>

                                <Item>
                                    <label htmlFor="eventAddress">Location</label>
                                    <Input type="text" label="Location" id="eventAddress" name="eventAddress" placeholder="Address" onValidityChange={(isValid) => this.handleInputChange('eventAddress', isValid)}/>
                                </Item>

                                <Item>
                                    <label htmlFor="eventCity">City</label>
                                    <Input type="text" label="City" id="eventCity" name="eventCity" placeholder="City" onValidityChange={(isValid) => this.handleInputChange('eventCity', isValid)}/>
                                </Item>

                                <Item>
                                    <label htmlFor="eventState">State</label>
                                    <Input type="text" label="State" id="eventState" name="eventState" placeholder="State" onValidityChange={(isValid) => this.handleInputChange('eventState', isValid)}/>
                                </Item>
                                
                                <Item>
                                    <label htmlFor="eventZip">Zip Code</label>
                                    <Input type="text" label="Zip Code" id="eventZip" name="eventZip" placeholder="Zip" onValidityChange={(isValid) => this.handleInputChange('eventZip', isValid)}/>
                                </Item>

                                <Item>
                                    <label htmlFor="eventDate">Event Date</label>
                                    <Item type="inputItem"><input type="date" id="eventDate" name="eventDate" /></Item>
                                </Item>

                                <Item>
                                    <label htmlFor="eventStart">Start Time</label>
                                    <Item type="inputItem"><input type="time" step="00:15" id="eventStart" name="eventStart" /></Item>
                                </Item>

                                <Item>
                                    <label htmlFor="eventEnd">End Time</label>
                                    <Item type="inputItem"><input type="time" id="eventEnd" name="eventEnd" /></Item>
                                </Item>

                                <Item>
                                    <label htmlFor="eventSkills">Required Skills</label>
                                    <Item type="inputItem">
                                    <select id="eventSkills" name="eventSkills" multiple >
                                        <option>Select Skills</option>
                                        <option value="skill1">Skill 1</option>
                                        <option value="skill2">Skill 2</option>
                                        <option value="skill3">Skill 3</option>
                                        <option value="skill4">Skill 4</option>
                                        <option value="skill5">Skill 5</option>
                                        <option value="skill6">Skill 6</option>
                                    </select>
                                    </Item>
                                </Item>    *
                                
                                <Item>
                                    <label htmlFor="eventUrgency">Urgency Level</label>
                                    <Item type="inputItem">
                                    <select id="eventUrgency" name="eventUrgency" >
                                        <option>Select Urgency</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
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
        return (
            <div className="createEvent">
                <form id="eventForm" onSubmit={this.handleSubmit}>
                    <h1>Create A New Event</h1>
                    {this.FlexboxGapStack()}
                    <button type="submit">Ok</button>
                </form>
            </div>
        );
    }
}