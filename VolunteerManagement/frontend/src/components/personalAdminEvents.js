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

export default class PersonalAdminEvents extends Component {
    constructor(props) {
        super(props);
    }

    basicCard(data) {
        return(
            <Card id="card" event={data.event} onClick={() => window.location.href += "/" + data.event} sx={{ minWidth: 100, minHeight: 140, bgcolor: theme.palette.primary.main, mb: 2 }}>
                <CardContent>
                    <Typography variant="h5" component="div" className="location" color={theme.palette.secondary.main} gutterBottom>
                        {data.address}
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: theme.palette.secondary.main }} gutterBottom>
                        {data.registered}/{data.required}
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: theme.palette.secondary.main }} gutterBottom>
                        {data.date} {data.range}
                    </Typography>
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
        return (
            <ThemeProvider theme={theme}>
                <div>
                    <h1>My Events</h1>
                    <Grid container spacing={2}>
                        {cardData.map((val, index) => {
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