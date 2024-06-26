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
            isValid: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        /*event.preventDefault(); */
    }

    FlexboxGapStack() {
        // Sets the maximum hours an event can be, and divdes options into equal intervals
        const maxHours = 6;
        const intervalsPerHour = 4;
        const totalIntervals = maxHours * intervalsPerHour;

        return (
            <ThemeProvider theme={theme}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Item type="background">
                            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                                <Item>
                                    <label htmlFor="eventName">Event Name</label>
                                    <Input type="text" label="Event Name" id="eventName" name="eventName" placeholder="Name" />
                                </Item>

                                <Item>
                                    <label htmlFor="eventDescription">Event Description</label>
                                    <Input type="text" label="Event Description" id="eventDescription" name="eventDescription" placeholder="Description" />
                                </Item>

                                <Item>
                                    <label htmlFor="eventAddress">Location</label>
                                    <Input type="text" label="Location" id="eventAddress" name="eventAddress" placeholder="Address" />
                                </Item>

                                <Item>
                                    <label htmlFor="eventCity">City</label>
                                    <Input type="text" label="City" id="eventCity" name="eventCity" placeholder="City" />
                                </Item>

                                <Item>
                                    <label htmlFor="eventState">State</label>
                                    <Item type="inputItem">
                                    <select id="eventState" name="eventState">
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="CA">California</option>
                                        <option value="CO">Colorado</option>
                                        <option value="CT">Connecticut</option>
                                        <option value="DE">Delaware</option>
                                        <option value="DC">District Of Columbia</option>
                                        <option value="FL">Florida</option>
                                        <option value="GA">Georgia</option>
                                        <option value="HI">Hawaii</option>
                                        <option value="ID">Idaho</option>
                                        <option value="IL">Illinois</option>
                                        <option value="IN">Indiana</option>
                                        <option value="IA">Iowa</option>
                                        <option value="KS">Kansas</option>
                                        <option value="KY">Kentucky</option>
                                        <option value="LA">Louisiana</option>
                                        <option value="ME">Maine</option>
                                        <option value="MD">Maryland</option>
                                        <option value="MA">Massachusetts</option>
                                        <option value="MI">Michigan</option>
                                        <option value="MN">Minnesota</option>
                                        <option value="MS">Mississippi</option>
                                        <option value="MO">Missouri</option>
                                        <option value="MT">Montana</option>
                                        <option value="NE">Nebraska</option>
                                        <option value="NV">Nevada</option>
                                        <option value="NH">New Hampshire</option>
                                        <option value="NJ">New Jersey</option>
                                        <option value="NM">New Mexico</option>
                                        <option value="NY">New York</option>
                                        <option value="NC">North Carolina</option>
                                        <option value="ND">North Dakota</option>
                                        <option value="OH">Ohio</option>
                                        <option value="OK">Oklahoma</option>
                                        <option value="OR">Oregon</option>
                                        <option value="PA">Pennsylvania</option>
                                        <option value="RI">Rhode Island</option>
                                        <option value="SC">South Carolina</option>
                                        <option value="SD">South Dakota</option>
                                        <option value="TN">Tennessee</option>
                                        <option value="TX">Texas</option>
                                        <option value="UT">Utah</option>
                                        <option value="VT">Vermont</option>
                                        <option value="VA">Virginia</option>
                                        <option value="WA">Washington</option>
                                        <option value="WV">West Virginia</option>
                                        <option value="WI">Wisconsin</option>
                                        <option value="WY">Wyoming</option>
                                    </select>
                                    </Item>
                                </Item>
                                
                                <Item>
                                    <label htmlFor="eventZip">Zip Code</label>
                                    <Input type="text" label="Zip Code" id="eventZip" name="eventZip" placeholder="Zip" />
                                </Item>

                                <Item>
                                    <label htmlFor="eventDate">Event Date</label>
                                    <Input type="date" id="eventDate" name="eventDate" placeholder="Date" label="Date" />
                                </Item>

                                <Item>
                                    <label htmlFor="eventStart">Start Time</label>
                                    <Input type="time" step="00:15" id="eventStart" name="eventStart" />
                                </Item>

                                <Item>
                                    <label htmlFor="eventDuration">Duration</label>
                                    <Item type="inputItem">
                                    <select id="eventDuration" name="eventDuration">
                                        {[...Array(totalIntervals)].map((_, index) => {
                                            let minutes = (index % intervalsPerHour + 1) * 15;
                                            let hours = Math.floor(index / intervalsPerHour);
                                            
                                            if (minutes % 60 === 0) {
                                                minutes = 0;
                                                hours += 1;
                                            }
                                            const formattedTime = `${hours}h${minutes}m`;
                                            return (
                                                <option key={index} value={formattedTime}>
                                                    {`${hours}h ${minutes}m`}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    </Item>
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
                                </Item>
                                
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