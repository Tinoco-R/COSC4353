import React, { useRef, useState, useEffect } from "react";

import GenericButton from "../GenericButton";

import { Link, Redirect } from 'react-router-dom';

import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import AdminHomePage from "../adminHomepage";

import Swal from "sweetalert2";
import { Button } from "@mui/material/Button";
import Stack from '@mui/material/Stack'

import { ShowNotification } from "../notification/NotificationComponent";

function IncorrectUsernameOrPassword({ validated }){

    const [useValidate, setValidate] = useState("");

    if (validated == false){
        return(
            <p>
                Unable to log in. Username does not exist
                or incorrect password.
            </p>
        )
    }
    else {
        return(
            <></>
        )
    }
}




export default function Login(){
    // On load, refreshes if sidebar is detected
    useEffect(() => {
        findSidebar();
    }, []); 

    // Enables admin toggle (to easily switch from volunteer or admin login without needing to change a hardcoded value here)
/*     var isAdmin = true;
    const toggleAdmin = () => {
        isAdmin =!isAdmin;
    }; */
    const [isAdmin, setIsAdmin] = useState(true);
    const toggleAdmin = () => {
        setIsAdmin(!isAdmin);
    };

    
    // React Hook Form (code for how to integrate the form from: https://www.youtube.com/watch?v=oSIHZ9zKzVA)
    const { register, handleSubmit, watch, formState: {errors} } = useForm({ 
        mode: 'onTouched', // credit for onBlur: AritrDB on https://stackoverflow.com/questions/62825841/react-hook-form-validation-before-submission
        reValidateMode: 'onSubmit',
        defaultValues: {
            fullName: '',
        }
        
    }); // https://www.youtube.com/watch?v=oSIHZ9zKzVA and https://www.youtube.com/watch?v=RkXv4AXXC_4&t=15s

    //console.log(errors);
    console.log(watch());

    const navigate = useNavigate();

    const onSubmit = async (data) => { // async added to call await in fetch

        console.log('Login form submitted!');
        console.log(data); // just put them in the console for now
    
        // Validate the username and password, if they are correct,
        // redirect the user to the login page

        // Validate the username and password:
        // Curently valid credentials
        // username: axel@email.com
        // password: 123456789

        // Search in the database for the credentials
        data.email;
        data.Password;


        // Make API call to authenticate the username (email) and password
        // On July 3, Continue here
        // Credentials/session not needed because we are
        // trying to log in
        let url = 'http://127.0.0.1:8000/api/Login';
        console.log('Making fetch call');
        const response = await fetch(url,
            {
                //mode: "cors",
                headers: {
                    "Content-Type": "application/json", // credit: https://rapidapi.com/guides/request-headers-fetch
                    "Host": "http://127.0.0.1:8000",
                    //"Content-Length": "",
                    "Origin": "http://127.0.0.1:8000",
                    "User-Agent": "",
                    "Accept": "*/*",
                    "Accept-Encoding": "gzip,deflate,br",
                    "Connection": "keep-alive",
                    //"X-CSRF-Token": "",
                    "mode": "cors",
                },
                method: "POST",
                body: JSON.stringify({
                    password: data.Password,
                    last_login: null,
                    is_superuser: false,
                    username: data.email,
                    first_name: "",
                    last_name: "",
                    email: "",
                    is_staff: false,
                    is_active: false,
                    date_joined: null,
                    groups: [],
                    user_permissions: []
                }),
                credentials: "same-origin"
            }
        )

        if (!response.ok) {
            console.log('ERROR: response error');
            console.log(response);
        }
        else {
            console.log('OK response');
            console.log('Data received:')

            let newAbsoluteURL = ''

            let url = await response.text();
            console.log('url:');
            console.log(url);
            newAbsoluteURL = (JSON.parse(url)).url;
            console.log(newAbsoluteURL);
            if (newAbsoluteURL === "/login"){
                // The server is redirecting to the login page
                // because the user has not verified their account
                // through the email link
                ShowNotification(
                    'Pending Account Verification',
                    'Click on the link sent to the email address \
                    associated with this account to complete \
                    the verification process. You will not \
                    be able to log in until you have completed \
                    this requirement.'
                )
                
            }
            else {
                // User has completed verification process,
                // redirect 
                navigate(newAbsoluteURL);
            }


            /*
            response.text().then( text => { // credit: https://stackoverflow.com/questions/62109232/getting-httpresponse-in-django-from-javascript-fetch
                console.log(text);
                console.log(typeof(text));
                newAbsoluteURL = JSON.parse(text).url;
                console.log(newAbsoluteURL);
                
                // Redirect the user to the right url (correct url
                // determined in the server (here, we are only parsing
                // the response to read that url)
                navigate(newAbsoluteURL);
                
            });
            */
            
            // Check if the user already verified their account

        }



        

        // Assuming they are correct.
        // Redirecting the user to the landing page.
        //const navigate = useNavigate();
        var validCredentials = true;

        //const object = useRef();

        /////// Block below commented-out becausen it is
        /////// now handled in the back-end
        /*
        if (validCredentials == false) {
            Swal.fire({
                title: "<h5>Failed Login</h5>",
                text: 'Incorrect credentials',
                icon: 'error'
            })
        }
        else if (!isAdmin){
            navigate("/volunteer/landing");
            window.location.reload();
        }
        else {
            navigate("/admin");
            window.location.reload();
        }
        */
    }

    /*
    const redirectUser = () => {
        console.log('on click event');
        const navigate = useNavigate();
        navigate('volunteer/landing');
    }
    */

    // Refresh the login page if the sidebar is detected
    function findSidebar () {
        const sidebarDiv = document.getElementById("sidebar");
        if (sidebarDiv && sidebarDiv.children.length !== 0) {
            window.location.reload();
        }
    }
    

    function redirectUser (){
        //navigate("volunteer/landing")
        console.log('button clicked')
    }


    return (
        <div id="login" >
        <h1 className="titleLoginPage">Helping Hands</h1>
        <h2 className="loginTextInLoginPage">Login</h2>

        <form className="loginForm" onSubmit={handleSubmit(onSubmit)} >

            <IncorrectUsernameOrPassword />

            

            <div className="loginField">
                <label for='email'>Email <br></br> </label>
                <input
                type='text'
                placeholder='example@email.com' 
                 {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Incorrect email address' } , maxLength: { value:50, message: 'Max length is 50'}} )} />
                <p className='inputValidationError'>{errors.email?.message}</p>
            </div>

            <div className="loginField">
                <label for='Password'>Password <br></br> </label>
                <input {...register('Password', { required: 'Password is required', minLength: { value: 8, message: 'Min length is 8'}} )} />
                <p className='inputValidationError'>{errors.Password?.message}</p>

            </div>

            {/*<Link to='volunteer/landing'>*/}
            {/*<Button variant="contained" onClick={(e) => redirectUser}>Login</Button>*/}
            <input type='submit' name='LogInButton' value='Login' onClick={(e) => redirectUser}></input> {/* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form */}
            {/*</Link>*/}


        </form>

        <p>
            Do not have an account yet?
            <div>
            <Link to="/sign-up">
                <GenericButton text={"Sign up"}
                />
            </Link>
            </div>
        </p>

        <p>
            Forgot your password?
            <div>
            <Link to="/reset-password">
                <GenericButton text={"Reset my password"}
                />
            </Link>
            </div>

        </p>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100vh' }}>
            <p>
                Toggle Admin [For Development Purposes]
                <p>Login Type: {isAdmin? 'Admin' : 'Volunteer'}</p>
                <div>
                    <button onClick={toggleAdmin}>Toggle Admin Login</button>
                </div>
            </p>
        </div>
        </div>
    
    );
}

// Show notification
//ShowNotification('Welcome!', 'Thank you for visiting our site for the first time');
