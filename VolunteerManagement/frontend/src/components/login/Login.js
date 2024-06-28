import React, { useRef, useState, useEffect } from "react";

import GenericButton from "../GenericButton";

import { Link, Redirect } from 'react-router-dom';

import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import AdminHomePage from "../adminHomepage";

import Swal from "sweetalert2";
import { Button } from "@mui/material";
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

    const onSubmit = (data) => {

        console.log('Login form submitted!');
        console.log(data); // just put them in the console for now
    
        // Validate the username and password, if they are correct,
        // redirect the user to the login page

        // Assuming they are correct.
        // Redirecting the user to the landing page.
        //const navigate = useNavigate();
        var validCredentials = true;

        //const object = useRef();

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
        <>
        <h1 className="titleLoginPage">Helping Hands</h1>
        <h2 className="loginTextInLoginPage">Login</h2>

        <form className="loginForm" onSubmit={handleSubmit(onSubmit)} >

            <IncorrectUsernameOrPassword />

            

            <div className="loginField">
                <label for='email'>Email</label>
                <input
                type='text'
                placeholder='example@email.com' 
                 {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Incorrect email address' } , maxLength: { value:50, message: 'Max length is 50'}} )} />
                <p className='inputValidationError'>{errors.email?.message}</p>
            </div>

            <div className="loginField">
                <label for='Password'>Password</label>
                <input {...register('Password', { required: 'Password is required', minLength: { value: 8, message: 'Min length is 8'}} )} />
                <p className='inputValidationError'>{errors.Password?.message}</p>

            </div>

            {/*<Link to='volunteer/landing'>*/}
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
        </>
    
    );
}

// Show notification
ShowNotification('Welcome!', 'Thank you for visiting our site for the first time');
