import React from "react";
import GenericButton from "../GenericButton";

import { Link } from 'react-router-dom';


import { useForm } from "react-hook-form";

// credit for the regex for email verification used in the frontend:
// source: anunaki at https://stackoverflow.com/questions/63000638/form-pattern-validation-with-react-hook-form


export default function InitialVerification(){

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

    const onSubmit = (data) => {

        console.log('Login form submitted!');
        console.log(data); // just put them in the console for now
    }

    return (
        <>
        <h1>Account verification</h1>



        <p>You will receive an email with a link to verify your 
            account. Please click on the link to complete 
            the verification process. Once you have verified
            your account, you can login using your username
            and password.
        </p>


        
        </>
        
    )
}