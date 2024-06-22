import React from 'react'

import { render } from "react-dom";

/* Imports (source: https://www.youtube.com/watch?v=YEmjBEDyVSY&list=PLzMcBGfZo4-kCLWnGmK0jUBmGLaJxvi4j&index=4) */
import { 
    BrowserRouter as Router,
    Switch,
    Routes,
    Route,
    Link,
    Redirect
 } from 'react-router-dom';

import LandingPageWithEvents from './LandingPage';

import MyProfile from "./MyProfile"
/*
export default function MainPage(){

    return(
        <>
            
            <Router>
                <Switch>
                    <Route path={'/'}>
                        <p>This is the home page</p>
                    </Route>
                    <Route path={'/landing'}>
                        <LandingPageWithEvents />
                    </Route>
                    <Route path={'/my-profile'}>
                        <MyProfile />
                    </Route>
                </Switch>
            </Router>
        
        </>
    )
};*/