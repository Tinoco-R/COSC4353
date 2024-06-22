import * as React from "react"; // https://reactrouter.com/en/main/start/tutorial (the *)
import * as ReactDOM from "react-dom/client"; // https://blog.appseed.us/how-to-integrate-django-with-react/ (https://reactrouter.com/en/main/start/tutorial (the "*"))
import MyEventsHeader from './WelcomeMessage';
import ResponsiveBar from './ResponsiveBar';
import MyProfile from "./MyProfile"

import LandingPageWithEvents from "./LandingPage";

/* The way the react-router works is that
every page that yuou wish to display will be
a component below */

/* Imports (source: https://www.youtube.com/watch?v=YEmjBEDyVSY&list=PLzMcBGfZo4-kCLWnGmK0jUBmGLaJxvi4j&index=4) */
import { 
    BrowserRouter as Router,
    Switch,
    Routes,
    Route,
    Link,
    Redirect,
    BrowserRouter
 } from 'react-router-dom';


import Login from "./login/Login";
import Signup from "./login/Signup";
import InitialVerification from "./login/InitialVerification";
import ResetPassword from "./login/ResetPassword";
import Logout from "./login/Logout";
import EmailAddressReceivedConfirmation from "./login/EmailAddressReceivedConfirmation";
import NotificationComponent from "./notification/NotificationComponent";

// solution for how to get the routing right:
// https://www.youtube.com/watch?v=NxAFOQbDxOM

export default function App() {
    return (
        <>
            

            <BrowserRouter>
                
                
                <Routes>

                    <Route exact path = "/"
                    element={ <p>This is the main page -this would be the login/registration page</p>}
                     />

                     <Route exact path ="/login" 
                    element={ 
                        <>
                        < Login />
                        </>
                    } 
                     />

                    <Route exact path ="/sign-up" 
                    element={ 
                        <>
                        < Signup />
                        </>
                    } 
                     />


                    <Route exact path ="/verification" 
                    element={ 
                        <>
                        < InitialVerification />
                        </>
                    } 
                     />

                    <Route exact path ="/reset-password" 
                    element={ 
                        <>
                        < ResetPassword />
                        </>
                    } 
                     />

                    <Route exact path ="/email-address-received" 
                    element={ 
                        <>
                        < EmailAddressReceivedConfirmation />
                        </>
                    } 
                     />

                    <Route exact path ="/logout" 
                    element={ 
                        <>
                        < Logout />
                        </>
                    } 
                     />

                    <Route exact path = "/landing"
                    element={ 
                        <>
                        <ResponsiveBar />
                        <LandingPageWithEvents />
                        </>}
                     />
                    
                    <Route exact path = "/my-profile"
                    element={ 
                        <>
                        <ResponsiveBar />
                        <MyProfile />
                        </>}
                     />

                    <Route exact path = "/notification"
                    element={ 
                        <>
                        <NotificationComponent />
                        </>}
                     />

                </Routes>
            </BrowserRouter>
        </>
    );
}
const root = ReactDOM.createRoot(document.getElementById("app")); // https://blog.appseed.us/how-to-integrate-django-with-react/
root.render(<App />) // https://blog.appseed.us/how-to-integrate-django-with-react/