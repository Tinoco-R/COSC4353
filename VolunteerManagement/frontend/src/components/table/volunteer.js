import React, { Component } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import theme from "../themes"
import { ThemeProvider } from "@emotion/react";
import { volunteerCardData } from "../volunteerAdminMatchingCardData";
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import { ShowNotification, ShowDetails } from "../notification/NotificationComponent";
import { fetchEventVolunteers, fetchProfiles } from "../eventData";
import { columnsStateInitializer } from "@mui/x-data-grid/internals";

// Slider code adapted from: https://mui.com/material-ui/react-slider/
export default class VolunteerDetailsAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            matchingSkills: 0,
            showSkills: {},
            activeCards: [],
            filteredVolunteers: [],
            allVolunteers: [],
            eventMembers: [],
            activeVolunteers: [],
            profiles: [],
        };
    }

    reinitialize() {
        this.state.activeCards = [];
        this.state.activeVolunteers = [];
    }
    
    // Allows an admin to match volunteers to an event
    matchVolunteers = () => {
        // Selected Event
        const { selectedEvent } = this.props;
        const { selectedEventName } = this.props;
        const { selectedEventDate } = this.props;

        // Selected Volunteers
        let activeVolunteers = this.state.activeVolunteers;

        const formData = {};
        formData.Event_ID = selectedEvent;
        formData.Volunteer = [];
        for (let index = 0; index < activeVolunteers.length; index++) {
            const volunteerName = activeVolunteers[index].full_name;
            formData.Volunteer.push(volunteerName);
        }

        if(!selectedEventName) {
            ShowNotification(`Match Volunteers to Events`, `Please select an Event on the left, and any number of Volunteers on the right.`)
            return;
        }
        else if (activeVolunteers.length === 0) {
            ShowNotification(`Event: ${selectedEventName}`, `Please select any number of volunteers to add to this event.`)
            return;            
        }
        
        ShowDetails(`Add Volunteers to ${selectedEventName || "[No Event Selected]"}`, formData, (isConfirmed) => {
            if (isConfirmed) {
                console.log('Adding volunteers to event...');
                // Can we add the volunteers to eventMembers here
                
                // Check if creating a new row or updating an existing row
                let eventUrl = "http://localhost:8000/api/eventVolunteerMatch/";

                for (let index = 0; index < activeVolunteers.length; index++) {
                    const volunteerName = activeVolunteers[index].full_name;
                    const volunteerData = {
                        Event_ID: selectedEvent,
                        Volunteer: volunteerName
                    };

                    const jsonData = JSON.stringify(volunteerData);

                    fetch(eventUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: jsonData
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.message) {
                            console.log('Server message:', data.message);
                        }
                        if (data.non_field_errors) {
                            console.log('Validation errors:', data.non_field_errors);
                        }

                        // Add the volunteer to the list of event members (turn them red)
                        this.setState(prevState => ({
                            eventMembers: [...prevState.eventMembers, volunteerName]
                        }));
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                }
            }
        },)
    }

    // Initial filter (of 0)
    // Need to update to actually pull volunteers from the database
    componentDidMount() {
        const filteredList = this.filterVolunteersBySkills();

        fetchProfiles().then(profiles => {
            this.setState({
                filteredVolunteers: filteredList,
                profiles: profiles,
                allVolunteers: profiles
            });
        });

/*         this.setState({
            filteredVolunteers: filteredList,
            allVolunteers: volunteerCardData
        }); */
    }

    componentDidUpdate(prevProps) {
        // If the selected Event changes, fetch volunteers of the newly selected Event
        if (prevProps.selectedEvent !== this.props.selectedEvent) {
            // Remove active cards and any selected volunteers
            this.setState({ activeCards: [], activeVolunteers: [] });

            // Go back to page 0
            this.setState({ currentIndex: 0 })

            fetchEventVolunteers(this.props.selectedEvent).then(volunteersOfEvent => {
                console.log(`Fetching new data for Event ID:${this.props.selectedEvent}`)

                // Keep track of the members for the currently selected event
                const volunteerNamesArray = volunteersOfEvent.map(volunteer => volunteer.Volunteer);
                this.setState({
                    eventMembers: volunteerNamesArray,
                });
                
                // Waits for async event to finish before proceeding
                setTimeout(() => {
                    this.filterVolunteersBySkills(0, volunteerNamesArray);
                    //this.filterVolunteersByAvailability();
                    this.removePreExistingActiveVolunteers();
                }, 0);
            });
        }
    }

    // Filter allVolunteers based on the indexes stored in activeCards
    getSelectedVolunteers() {
        const selectedIndexes = this.state.activeCards;
        const selectedVolunteers = this.state.allVolunteers.filter((volunteer, index) => selectedIndexes.includes(index));

        return selectedVolunteers;
    }
        
    // Filter out active cards that are part of the event
    removePreExistingActiveVolunteers() {
        const { eventMembers } = this.state;
    
        this.setState(prevState => ({
            activeCards: prevState.activeCards.filter(index => {
                const volunteer = prevState.filteredVolunteers[index];
                return !eventMembers.includes(volunteer.name);
            })
        }));
    }

    // Of all volunteers, filters them out for a selected event
    // Need to do: when an event is selected, filter out volunteers already part of that event
    filterVolunteersBySkills = ( skillsToMatch = 0, eventMembers = [] ) => {
        // Selected skills are the skills of the selected event
        const { selectedSkills } = this.props;
        const { selectedEventDate } = this.props;
        let volunteers = this.state.profiles;

        // No filter
        if (selectedSkills[0] === "") {
            return volunteers;
        }

        let filteredVolunteers = [];
        // Loop through all volunteers
        for (let i = 0; i < volunteers.length; i++) {
            const volunteer = volunteers[i];
            const skills = volunteer.skills;
            const skillsArray = skills ? skills.split(',') : [];

            const availability = volunteer.availability;
            const availabilityArray = availability ? availability.split(',') : [];

            const name = volunteer.full_name;

            if (eventMembers.includes(name)) {
                // Don't push volunteer as they are already part of the event; or maybe color them a different color?
            }

            let skillsLeft = skillsToMatch
            // Loop through all skills of a volunteer
            for (let j = 0; j < skillsArray.length; j++) {
                const skill = skillsArray[j];
                // Check if skill is in selectedSkills
                for (let k = 0; k < selectedSkills.length; k++) {
                    if (skill === selectedSkills[k]) {
                        skillsLeft --;
                    }
                }
            }

            // Volunteer matched or exceeded specified number of required skills
            if (skillsLeft <= 0 && availabilityArray.includes(selectedEventDate)) {
                console.log("Volunteer", name, "with availabilty", availabilityArray,"against:", selectedEventDate);
                filteredVolunteers.push(volunteer);
            }
        }      
        return filteredVolunteers;
    };      

    // Allows the volunteer's skills to show
    toggleSkills = () => {
        // Toggle the showSkills state when the card is clicked
        this.setState(prevState => ({ showSkills:!prevState.showSkills }));
    };

    // Sets the actively clicked card
    cardClick(index, name, data, filteredVol) {
        // Check if selection already selected to then deselect it
        const isActive = this.state.activeCards.includes(index);
        const isPartOfEvent = this.state.eventMembers.includes(name);

        // Remove index from activeCards
        if (isActive || isPartOfEvent) {
            this.setState(prevState => ({
                activeCards: prevState.activeCards.filter(cardIndex => cardIndex!== index)
            }), () => {
                this.updateActiveVolunteers(this.state.activeCards, filteredVol);
            });
    
        }

        // Add index to activeCards if the Volunteer is not a part of that event
        else if (!isPartOfEvent) {
            this.setState(prevState => ({
                activeCards: [...prevState.activeCards, index]
            }), () => {
                this.updateActiveVolunteers(this.state.activeCards, filteredVol);
            });
    
        }
    }

    updateActiveVolunteers(activeCards, filteredVol) {
        let chosenVolunteers = [];
        
        for (let i = 0; i < activeCards.length; i++) {
            const volunteerIndex = activeCards[i];
            chosenVolunteers.push(filteredVol[volunteerIndex]);
        }
        this.setState(prevState => ({
            activeVolunteers: chosenVolunteers
        }));
    }
    

    // Default card shows information on what the cards below have
    defaultCard() {
        return(
            <Card id="volunteerCard" sx={{ bgcolor: theme.palette.primary.main, mb: 2}} >
                <Typography sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, color: 'white' }} gutterBottom>
                    <strong>{}</strong>
                    <strong>{"Volunteers"}</strong>
                    <strong>{}</strong>
                </Typography>
            </Card>
        );
    }

    // Actual volunteer cards with information over a volunteer: Name, Rating, Attendance, and all their Skills
    basicCard(data, isActive, className, cardsToShow, count, filter) {
        const { selectedSkills } = this.props;
        const { selectedEventDate } = this.props;
        let row = (data.row - 1);

        // For volunteers who are part of an event already, background color is red
        const isPartOfEvent = this.state.eventMembers.includes(data.full_name);

        // Splitting the skills string into an array if it's not null or empty
        const skillsArray = data.skills ? data.skills.split(',') : [];

        // Splitting the availability string into an array if it's not null or empty
        const availabilityArray = data.availability ? data.availability.split(',') : [];

        return(
            <Card id="volunteerCard" event={data.event} innerIndex={count} onClick={() => this.cardClick(count, data.full_name, data, filter)} className={`volunteer-card ${isActive? className : ''}`} sx={{ bgcolor: theme.palette.primary.main, mb: 2, cursor: 'pointer', ...isPartOfEvent ? { backgroundColor: 'red' } : (isActive ? { backgroundColor: '#86C232' } : {}) }}>
                <CardContent>
                    <Typography sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, color: theme.palette.secondary.main }} gutterBottom>
                        <strong>{data.full_name}</strong>
                        {/*<strong>{data.attendence}</strong>*/}
                    </Typography>

                    {this.state.showSkills && skillsArray.map((skill, index) => {
                        return(
                            <Typography sx={{ fontSize: 14, color: selectedSkills.length !== 0 && selectedSkills.includes(skill)? 'white' : theme.palette.secondary.main, fontWeight: selectedSkills.includes(skill)? 'bold' : 'normal' }} key={index} gutterBottom>
                                {skill}
                            </Typography>
                        );
                    })}

                    <br></br>

                    <Typography sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, color: 'white' }} gutterBottom>
                        Preferences: {data.preferences}
                    </Typography>
                    
                </CardContent>
            </Card>
        );
    }

    valuetext(value) {
        return value === 1? `${value} Matching Skill` : `${value} Matching Skills`;
    }
    
    render() {
        const matchingSkills = this.state.matchingSkills;
        const eventMembers = this.state.eventMembers;
        const filteredVolunteers = this.filterVolunteersBySkills( matchingSkills, eventMembers );
        const maxCardsToShow = 10;
        const startIndex = this.state.currentIndex * maxCardsToShow;
        const lastPossibleIndex = Math.floor((filteredVolunteers.length - 1) / maxCardsToShow);
        
        return (
            <ThemeProvider theme={theme}>
                <div>
                    <br></br>
                    <Grid container spacing={1} justifyContent="space-between">
                    <Box sx={{ width: 100 }}>
                        <Slider
                            aria-label="Matched Skills Required"
                            defaultValue={0}
                            getAriaValueText={this.valuetext}
                            valueLabelFormat={this.valuetext}
                            valueLabelDisplay="on"
                            shiftStep={30}
                            step={1}
                            size="small"
                            marks={[{ value: 0 }, { value: 1 }, { value: 2 }, { value: 3 }]}
                            min={0}
                            max={3}
                            // When adjusting the slider: set the new number of matching skills, reset any selected cards/volunteers, and go back to page 0
                            onChange={(event, newValue) => this.setState({ matchingSkills: newValue, activeCards: [], activeVolunteers: [], currentIndex: 0 })}
                        />
                    </Box>
                        <Button onClick={() => this.setState({ currentIndex: Math.max(this.state.currentIndex - 1, 0) })} disabled={this.state.currentIndex === 0} style={{backgroundColor: "#86C232"}}  variant="contained" type="submit" fontFamily="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" sx={{ mx: 1 }}>Previous</Button>
                        <Button onClick={() => this.setState({ currentIndex: this.state.currentIndex + 1, })}  disabled={this.state.currentIndex >= lastPossibleIndex} style={{backgroundColor: "#86C232"}}  variant="contained" type="submit" fontFamily="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" sx={{ mx: 1 }}>Next</Button>
                        <Button onClick={(this.toggleSkills)} style={{backgroundColor: "#86C232"}}  variant="contained" type="submit" fontFamily="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" sx={{ mx: 1 }}>Toggle Skills</Button>
                    </Grid>
                    <br></br>

                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            {this.defaultCard()}
                        </Grid>
                        {filteredVolunteers.slice(startIndex, startIndex + maxCardsToShow).map((val, index) => {
                        index += startIndex;

                        const isActive = this.state.activeCards.includes(index)
                            return (
                                <Grid item xs={6} key={index}>
                                    {this.basicCard(val, isActive, isActive? 'activeCard' : '', maxCardsToShow, index, filteredVolunteers)}
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Button style={{backgroundColor: "#86C232"}} onClick={() => {this.matchVolunteers()}} variant="contained" type="submit" fontFamily="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif">Add Volunteers</Button>
                </div>
            </ThemeProvider>
        );
    }
}