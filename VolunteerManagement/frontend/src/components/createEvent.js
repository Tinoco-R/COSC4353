import React, { Component, isValidElement } from "react";
import Stack from '@mui/material/Stack';
import theme from "./themes";
import { ThemeProvider } from "@emotion/react";
import Grid from '@mui/material/Grid';
import Input, { hasOnlyNumbers } from "./input"
import Button from '@mui/material/Button';
import MultipleSelect from './multipleSelect';
import { skillsData } from "./skillsData";
import { stateData } from "./stateData";
import { urgencyData } from "./urgencyData";
import { Item, StyledLabel } from "./item";
import { ShowNotification, ShowDetails } from "./notification/NotificationComponent";

// Import hard coded data for events [to know what will be the next id to use and then push to] (will pull from database in next implementation)
import { eventData } from "./eventData";

const lastEventId = eventData[eventData.length - 1].id;
const defaultAdministrator = "ADMIN";

export default class CreateEvent extends Component {
    constructor(props) {
        super(props);
        const initialState = {
            // id
            eventId: '',
            eventName: '',
            // administrator,
            eventAdministrator: '', // need to pull ID of logged in user
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
            // Error trackers below
            eventNameError: 'This field cannot be empty.',
            eventDescriptionError: 'This field cannot be empty.',
            eventAddressError: 'This field cannot be empty.',
            eventCityError: 'This field cannot be empty.',
            eventZipError: 'This field cannot be empty.',
            eventDateError: '',
            eventStartError: '',
            eventDurationError: '',
        };
    
        // Use prefilledData if available, otherwise use initialState (prefilled when modifying an event)
        this.state = props.prefilledData || initialState;
        this.prefilled = props.prefilledData !== null;

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleEventSkillsChange = this.handleEventSkillsChange.bind(this);
        this.handleEventDurationChange = this.handleEventDurationChange.bind(this);
        this.handleEventStateChange = this.handleEventStateChange.bind(this);
        this.handleEventUrgencyChange = this.handleEventUrgencyChange.bind(this);
    }

    // For the multiple select changes: skills  
    handleEventSkillsChange = (newValue) => {
        this.setState({ eventSkills: newValue });
    };

    // For the multiple select changes: duration
    handleEventDurationChange = (newValue) => {
        this.setState({ eventDuration: [newValue] });
    };
    
    // For the multiple select changes: state
    handleEventStateChange = (newValue) => {
        this.setState({ eventState: [newValue] });
    };
    
    // For the multiple select changes: urgency
    handleEventUrgencyChange = (newValue) => {
        this.setState({ eventUrgency: [newValue] });
    };

    componentDidUpdate(prevProps, prevState) {
        console.log(this.state);
    }

    handleInputChange = (id, value, error = "") => {
        // Required fields
        if ((id === "eventName" || id === "eventDescription" || id === "eventAddress" || id === "eventCity" || id === "eventState" || id === "eventZip" || id === "eventSkills" || id === "eventUrgency")) {
            if (value.length === 0) {
                error = "This field cannot be empty.";
            }
            else {
                error = "";
            }
        }
        
        // Zip-code: Must be a numeric-value of 5 digit length.
        if (id === "eventZip") {
            if (!hasOnlyNumbers(value)) {
                error = "Zip Code must be a 5 length string of numbers."
            }
            else if (value.length !== 5) {
                error = "Must be 5 digits long."
            }
            else {
                error = "";
            }
        }

        // Date: Must be a future or present date.
        else if (id === "eventDate") {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split('T')[0];
            
            if (value <= formattedDate) {
                error = "Must be a future date."
            }
            else {
                error = "";
            }
        }

        // Start-Time: Must follow time format.
        else if (id === "eventStart") {
            let regex = new RegExp(/^((0[1-9]|1[0-2]):(\d{2}) ?([AP][M]))$/);

            if (!regex.test(value) && value !== "") {
                error= "Time format: HH:MM AM/PM (12-Hour Clock)";
            }
            else {
                error = "";
            }
        }

        // Cities are limited to a set of legal characters.
        else if (id === "eventCity") {
            const regex = /^[A-Za-z.\-\/]+$/;

            if (!regex.test(value) && value !== "") {
                error = "Invalid characters in address. Only 'A-Z', 'a-z', '., /, -'.";
            }
            else if (value === "") {
                error = "This field cannot be empty.";
            }
            else {
                error = "";
            }
        }

        // Addresses are limited to a set of legal characters.
        else if (id === "eventAddress") {
            const regex = /^[A-Za-z0-9.\-'#@%&\/\s]+$/;

            if (!regex.test(value) && value !== "") {
                error = "Invalid characters in address. Only 'A-Z', 'a-z', '0-9', \" \' \', ., #, -, @, %, &, / \".";
            }
            else if (!regex.test(value)) {
                error = "This field cannot be empty.";
            }
            else if (/^[^A-Za-z0-9]/.test(value)) {
                error = "First character cannot be a symbol.";
            }
            else {
                error = "";
            }
        }

        // Description is a text area allowing only alphanumeric characters
        else if (id === "eventDescription") {
            const regex = /^[A-Za-z0-9'\/]+$/;

            if (!regex.test(value) && value !== "") {
                error = "Invalid characters in description. Only 'A-Z', 'a-z', '0-9'.";
            }
            else if (value.length === 0) {
                error = "This field cannot be empty.";
            }
            else {
                error = "";
            }
        }
        
        // Event must be 100 characters or fewer
        else if (id === "eventName") {
            if (value.length > 100) {
              error = "Name cannot exceed 100 characters.";
            }
            else if (value.length === 0) {
              error = "This field cannot be empty.";
            }
            else {
              error = "";
            }
        }

        this.setState({
          [id]: value,
        });
        
        this.setState({
          [`${id}Error`]: error,
        });
    };

    // Removes "event" and "error" from eventFieldError
    extractFieldName(field) {
        let name = "";
        for (let index = 5; index < field.length; index++) {
            const letter = field[index];
            if (letter === "E") {
                break;
            }
            else {
                name += letter;
            }
        }

        return name;
    }

    // True if field is required (due to specifications)
    isRequired(field) {
        return (field === "Name" || field === "Description" || field === "Address" || field === "City" || field === "State" || field === "Zip" || field === "Skills" || field === "Urgency" || field === "Name *" || field === "Description *" || field === "Address *" || field === "City *" || field === "State *" || field === "Zip *" || field === "Skills *" || field === "Urgency *");
    }

    // Returns which fields have errors
    checkForErrors() {
        let badFields = [];

        for (let index = 13; index < Object.keys(this.state).length; index++) {
            const key = Object.keys(this.state)[index];
            
            if (this.state[key] && this.state[key].length > 0) {
                let name = this.extractFieldName(key);
                if (this.isRequired(name)) {
                    name += " *"
                }
                badFields.push(name);
            }
        }

        return badFields;
    }

    // Checks if the select field has a value, else will show as a field to be edited by the admin
    checkSelectField(badFields, select, name) {
        if (select === "") {
            badFields.push(name);
        }
        return badFields;
    }

    // Formats date to mm-dd-yyyy format
    formatDate(dateInput) {
        let date;
        if (dateInput === "") {return;}

        else if (dateInput.length === 10) {
            date = "";
            for (let index = 5; index < dateInput.length; index++) {
                const digit = dateInput[index];
                date += digit;                
            }
            date += "-"
            for (let index = 0; index < 4; index++) {
                const digit = dateInput[index];
                date += digit;          
            }
            return date;
        } 

        else {
            date = dateInput;
        }
    

        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }    

    handleSubmit(event) {
        event.preventDefault();
        let badFields = this.checkForErrors();

        badFields = this.checkSelectField(badFields, this.state.eventState, "State *");
        badFields = this.checkSelectField(badFields, this.state.eventUrgency, "Urgency *");

        if (this.state.eventSkills.length === 0) {
            badFields.push("Skills *");
        }
        
        if (badFields.length > 0) {
            let noRequiredFields = true;
            let count = badFields.length;
            let errorWord      = count === 1 ? "Error" : "Errors";
            let fieldWord      = count === 1 ? "Field" : "Fields";
            let requiredPhrase = count === 1 ? "(Required Field)" : "(* = Required)";

            for (let index = 0; index < badFields.length; index++) {
                const field = badFields[index];
                
                if (this.isRequired(field)) {
                    noRequiredFields = false;
                    break;
                }
            }
            if (noRequiredFields) {
                ShowNotification(`${errorWord} in ${fieldWord}`, badFields);
            }
            else {
                ShowNotification(`${errorWord} in ${fieldWord} ${requiredPhrase}`, badFields);
            }
        }

        else {
            // Default date is next Sunday
            let nextSunday = new Date();
            nextSunday.setDate(nextSunday.getDate() + ((7 - nextSunday.getDay()) % 7));

            // Format the date as MM/DD/YYYY
            const options = { month: '2-digit', day: '2-digit', year: 'numeric'};
            let defaultDate = nextSunday.toLocaleDateString('en-US', options);

            // Default start time is noon with a default duration of 3 hours
            let defaultStart = "12:00 PM";
            let defaultDuration = "3h 0m";
            const formData = {};

            // Collect basic input fields
            formData.eventId = this.state.eventId || lastEventId;
            formData.eventName = this.state.eventName;
            formData.eventAdministrator = this.state.eventAdministrator || defaultAdministrator;
            formData.eventDescription = this.state.eventDescription;
            formData.eventAddress = this.state.eventAddress;
            formData.eventCity = this.state.eventCity;
            formData.eventState = this.state.eventState[0];
            formData.eventZip = this.state.eventZip;
            formData.eventDate = this.formatDate(this.state.eventDate) || defaultDate;
            formData.eventStart = this.state.eventStart || defaultStart;
            formData.eventDuration = this.state.eventDuration[0] || defaultDuration;

            formData.eventSkills = this.state.eventSkills;
            formData.eventUrgency = this.state.eventUrgency[0];

            const jsonData = JSON.stringify(formData);

            // Now we have form data and can send it to the database after the user finalizes their changes
            console.log(jsonData);
            ShowDetails('Event Created!', formData, (isConfirmed) => {
                // Send data to database
                if (isConfirmed) {
                    console.log('Event creation confirmed, sending to the database...');

                    window.location.reload();                    
                }

                // Close notification and allow user to edit chanegs until they are satisfied
                else {
                    console.log('Event creation cancelled, allowing edits...');
                }
            });
        }
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

        return (
            <ThemeProvider theme={theme}>
                <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Grid item xs={12} sm={6} md={5}>
                        <Item type="background">
                            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                                <Item style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                                    <StyledLabel htmlFor="eventId">Event ID: {this.state.eventId || lastEventId}</StyledLabel>
                                    <br />
                                    <StyledLabel htmlFor="eventAdministrator">Administrator: {this.state.eventAdministrator || defaultAdministrator}</StyledLabel>
                                </Item>

                                <Item>
                                    <StyledLabel htmlFor="eventName">Event Name</StyledLabel>
                                    <Input onChange={this.handleInputChange} type="text" label="Event Name" id="eventName" name="eventName" placeholder="Name" value={this.state.eventName || ''} />
                                </Item>

                                <Item>
                                    <StyledLabel htmlFor="eventDescription">Event Description</StyledLabel>
                                    <Input onChange={this.handleInputChange} type="text" label="Event Description" id="eventDescription" name="eventDescription" placeholder="Description" value={this.state.eventDescription || ''} />
                                </Item>

                                <Item>
                                    <StyledLabel htmlFor="eventAddress">Location Address</StyledLabel>
                                    <Input onChange={this.handleInputChange} type="text" label="Address" id="eventAddress" name="eventAddress" placeholder="Address" value={this.state.eventAddress || ''} />
                                </Item>

                                <Item>
                                    <StyledLabel htmlFor="eventCity">City</StyledLabel>
                                    <Input onChange={this.handleInputChange} type="text" label="City" id="eventCity" name="eventCity" placeholder="City" value={this.state.eventCity || ''} />
                                </Item>
                                
                                <Item>
                                    <StyledLabel htmlFor="eventState">State</StyledLabel>
                                    <Item type="inputItem" fontFamily="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif">
                                        <MultipleSelect id="eventState" name="eventState" dataValues={stateData} isMulti={false} helpfulLabel={"State"} value={this.state.eventState ? [this.state.eventState] : []} onChange={this.handleEventStateChange} />
                                    </Item>
                                </Item>
                                
                                <Item>
                                    <StyledLabel htmlFor="eventZip">Zip Code</StyledLabel>
                                    <Input onChange={this.handleInputChange} type="text" label="Zip Code" id="eventZip" name="eventZip" placeholder="Zip" value={this.state.eventZip || ''} />
                                </Item>

                                <Item>
                                    <StyledLabel htmlFor="eventDate">Event Date</StyledLabel>
                                    <Input onChange={this.handleInputChange} type="date" id="eventDate" name="eventDate" placeholder="Date" label="Date" value={this.state.eventDate || ''} />
                                </Item>

                                <Item>
                                    <StyledLabel htmlFor="eventStart">Start Time</StyledLabel>
                                    <Input onChange={this.handleInputChange} label="Start Time" type="text" id="eventStart" name="eventStart" value={this.state.eventStart || ''} />
                                </Item>

                                <Item>
                                    <StyledLabel htmlFor="eventDuration">Duration</StyledLabel>
                                    <Item type="inputItem">
                                        <MultipleSelect id="eventDuration" name="eventDuration" dataValues={durationOptions} isMulti={false} helpfulLabel={"Duration"} value={this.state.eventDuration ? [this.state.eventDuration] : []} onChange={this.handleEventDurationChange} />
                                    </Item>
                                </Item>

                                <Item>
                                    <StyledLabel htmlFor="eventSkills">Required Skills</StyledLabel>
                                    <Item type="inputItem" fontFamily="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif">
                                        <MultipleSelect id="eventSkills" name="eventSkills" dataValues={skillsData} isMulti={true} helpfulLabel={"Skills"} value={this.state.eventSkills || []} onChange={this.handleEventSkillsChange} />
                                    </Item>
                                </Item>
                                
                                <Item>
                                    <StyledLabel htmlFor="eventUrgency">Urgency</StyledLabel>
                                    <Item type="inputItem" fontFamily="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif">
                                        <MultipleSelect id="eventUrgency" name="eventUrgency" dataValues={urgencyData} isMulti={false} helpfulLabel={"Urgency"} value={this.state.eventUrgency ? [this.state.eventUrgency] : []} onChange={this.handleEventUrgencyChange} />
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