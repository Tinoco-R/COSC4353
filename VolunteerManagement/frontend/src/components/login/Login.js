import React, { useRef, useState } from "react";

import GenericButton from "../GenericButton";

import { Link, Redirect } from 'react-router-dom';

import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import AdminHomePage from "../adminHomepage";

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
        var isAdmin = false;

        //const object = useRef();

        //if (validCredentials == true) {
            //object.current.props.history.push('/landing');
        //}
        if (!isAdmin){
            navigate("/landing") // credit for user redirection code:
        }
        else{
            navigate('/Home')
        }


    }

    /*
    const redirectUser = () => {
        console.log('on click event');
        const navigate = useNavigate();
        navigate('/landing');
    }
    */

    

    function redirectUser (){
        //navigate("/landing")
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

            {/*<Link to='/landing'>*/}
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
        </>
    
    );
}