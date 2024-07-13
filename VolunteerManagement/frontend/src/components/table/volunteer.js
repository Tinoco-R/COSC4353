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

// Slider code adapted from: https://mui.com/material-ui/react-slider/

export default class VolunteerDetailsAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            showSkills: {},
            activeCards: [],
            filteredVolunteers: [],
            matchingSkills: 0, 
        };
    }
    // Initial filter (of 0)
    componentDidMount() {
        this.setState({
          filteredVolunteers: this.filterVolunteersBySkills()
        });
    }

    filterVolunteersBySkills = ( skillsToMatch ) => {
        // Selected skills are the skills of the selected event
        const { selectedSkills } = this.props;
        let volunteers = volunteerCardData;

        // No filter
        if (selectedSkills[0] === "") {
            return volunteers;
        }

        let filteredVolunteers = [];
        // Loop through all volunteers
        for (let i = 0; i < volunteers.length; i++) {
            const volunteer = volunteers[i];
            const skills = volunteer.skills;
            let skillsLeft = skillsToMatch
            // Loop through all skills of a volunteer
            for (let j = 0; j < skills.length; j++) {
                const skill = skills[j].skill;
                // Check if skill is in selectedSkills
                for (let k = 0; k < selectedSkills.length; k++) {
                    if (skill === selectedSkills[k]) {
                        skillsLeft --;
                    }
                }
            }
            // Volunteer matched or exceeded specified number of required skills
            if (skillsLeft <= 0) {
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
    cardClick(index) {
        // Check if selection already selected to then deselect it
        const isActive = this.state.activeCards.includes(index);

        // Remove index from activeCards
        if (isActive) {
            this.setState(prevState => ({
                activeCards: prevState.activeCards.filter(cardIndex => cardIndex!== index)
            }));
        }

        // Add index to activeCards
        else {
            this.setState(prevState => ({
                activeCards: [...prevState.activeCards, index]
            }));
        }
    }

    // Default card shows information on what the cards below have
    defaultCard() {
        return(
            <Card id="volunteerCard" sx={{ bgcolor: theme.palette.primary.main, mb: 2}} >
                <Typography sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, color: 'white' }} gutterBottom>
                    <strong>{"Volunteer"}</strong>
                    <strong>{"Rating"}</strong>
                    <strong>{"Attendance"}</strong>
                </Typography>
            </Card>
        );
    }

    // Actual volunteer cards with information over a volunteer: Name, Rating, Attendance, and all their Skills
    basicCard(data, isActive, className, cardsToShow) {
        const row = (data.row - 1) % cardsToShow;
        const { selectedSkills } = this.props;
        return(
            <Card id="volunteerCard" event={data.event} onClick={() => this.cardClick(row)} className={`volunteer-card ${isActive? className : ''}`} sx={{ bgcolor: theme.palette.primary.main, mb: 2, cursor: 'pointer', ...(!isActive? {} : { backgroundColor: '#86C232' }) }}>
                <CardContent>
                    <Typography sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, color: theme.palette.secondary.main }} gutterBottom>
                        <strong>{data.name}</strong>
                        <strong>{data.rating}</strong>
                        <strong>{data.attendence}</strong>
                    </Typography>
                    {this.state.showSkills && data.skills.map((skill, index) => {
                        return(
                            <Typography sx={{ fontSize: 14, color: selectedSkills.length !== 0 && selectedSkills.includes(skill.skill)? 'white' : theme.palette.secondary.main, fontWeight: selectedSkills.includes(skill.skill)? 'bold' : 'normal' }} key={index} gutterBottom>
                                {skill.skill}
                            </Typography>
                        );
                    })}
                    
                </CardContent>
            </Card>
        );
    }

    valuetext(value) {
        return value === 1? `${value} Matching Skill` : `${value} Matching Skills`;
    }
    
    render() {
        const matchingSkills = this.state.matchingSkills;
        const filteredVolunteers = this.filterVolunteersBySkills( matchingSkills );
        const maxCardsToShow = 10;
        const startIndex = this.state.currentIndex * maxCardsToShow;
        const lastPossibleIndex = Math.floor((filteredVolunteers.length - 1) / maxCardsToShow);
        const hasActiveSelections = this.state.activeCards.length > 0;

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
                            onChange={(event, newValue) => this.setState({ matchingSkills: newValue })}

                        />
                    </Box>
                        <Button onClick={() => this.setState({ currentIndex: Math.max(this.state.currentIndex - 1, 0) })} disabled={hasActiveSelections || this.state.currentIndex === 0} style={{backgroundColor: "#86C232"}}  variant="contained" type="submit" fontFamily="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" sx={{ mx: 1 }}>Previous</Button>
                        <Button onClick={() => this.setState({ currentIndex: this.state.currentIndex + 1, })} disabled={hasActiveSelections || this.state.currentIndex >= lastPossibleIndex} style={{backgroundColor: "#86C232"}}  variant="contained" type="submit" fontFamily="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" sx={{ mx: 1 }}>Next</Button>
                        <Button onClick={(this.toggleSkills)} style={{backgroundColor: "#86C232"}}  variant="contained" type="submit" fontFamily="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" sx={{ mx: 1 }}>Toggle Skills</Button>
                    </Grid>
                    <br></br>

                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            {this.defaultCard()}
                        </Grid>
                        {filteredVolunteers.slice(startIndex, startIndex + maxCardsToShow).map((val, index) => {
                        const isActive = this.state.activeCards.includes(index)
                            return (
                                <Grid item xs={6} key={index}>
                                    {this.basicCard(val, isActive, isActive? 'activeCard' : '', maxCardsToShow)}
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Button style={{backgroundColor: "#86C232"}}  variant="contained" type="submit" fontFamily="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif">Add Volunteers</Button>
                </div>
            </ThemeProvider>
        );
    }
}