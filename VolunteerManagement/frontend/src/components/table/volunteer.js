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
import { cardData } from "../volunteerAdminMatchingCardData";
import Grid from '@mui/material/Grid';

export default class VolunteerDetailsAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            showSkills: {},
            activeCards: [],
        };
    }

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
            <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1, color: theme.palette.secondary.main }} gutterBottom>
                <strong>{"Volunteer"}</strong>
                <strong>{"Rating"}</strong>
                <strong>{"Attendance"}</strong>
            </Typography>
        );
    }

    // Actual volunteer cards with information over a volunteer: Name, Rating, Attendance, and all their Skills
    basicCard(data, isActive, className, cardsToShow) {
        const row = data.row % cardsToShow;
        return(
            <Card id="volunteerCard" event={data.event} onClick={() => this.cardClick(row)} className={`volunteer-card ${isActive? className : ''}`} sx={{ bgcolor: theme.palette.primary.main, mb: 2, cursor: 'pointer', ...(!isActive? {} : { backgroundColor: '#add8e6' }) }}>
                <CardContent>
                    <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1, color: theme.palette.secondary.main }} gutterBottom>
                        <strong>{data.name}</strong>
                        <span>{data.rating}</span>
                        <span>{data.attendence}</span>
                    </Typography>
                    {this.state.showSkills && data.skills.map((skill, index) => {
                        return(
                            <Typography sx={{ fontSize: 14, color: theme.palette.secondary.main }} key={index} gutterBottom>
                                {skill.skill}
                            </Typography>
                        );
                    })}
                    
                </CardContent>
            </Card>
        );
    }

    render() {
        const maxCardsToShow = 5;
        const startIndex = this.state.currentIndex * maxCardsToShow;
        const lastPossibleIndex = Math.floor((cardData.length - 1) / maxCardsToShow);

        return (
            <ThemeProvider theme={theme}>
                <div>
                    <h1>Volunteers</h1>
                    {/* Ensure we dont go below or above the current number of available volunteer cards */}
                    <button onClick={() => this.setState({ currentIndex: Math.max(this.state.currentIndex - 1, 0) })} disabled={this.state.currentIndex === 0}>Previous</button>
                    <button onClick={() => this.setState({ currentIndex: this.state.currentIndex + 1, })} disabled={this.state.currentIndex >= lastPossibleIndex}>Next</button>
                    <button onClick={(this.toggleSkills)}>Show Skills</button>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            {this.defaultCard()}
                        </Grid>
                        {console.log(startIndex)}
                        {cardData.slice(startIndex, startIndex + maxCardsToShow).map((val, index) => {
                        const isActive = this.state.activeCards.includes(index)
                            return (
                                <Grid item xs={12} key={index}>
                                    {this.basicCard(val, isActive, isActive? 'activeCard' : '', maxCardsToShow)}
                                </Grid>
                            );
                        })}
                    </Grid>
                </div>
            </ThemeProvider>
        );
    }
}