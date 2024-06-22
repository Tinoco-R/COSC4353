import React from "react";
import GenericButton from "../GenericButton";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";

export default function ResetPassword(){

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
        <h1>Reset my password</h1>
        <p>Please provide the email associated with 
            your for account. A link will be sent
            to this email to reset the password </p>

        

        <form className="emailInputForm">
        <div className="emailField">
                <label for='email'></label>
                <input
                type='text'
                placeholder='example@email.com' 
                 {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Incorrect email address' } , maxLength: { value:50, message: 'Max length is 50'}} )} />
                <p className='inputValidationError'>{errors.email?.message}</p>
        </div>
            <Link to='/email-address-received'>
            <input type="submit" name="emailForPasswordReset" value="Submit" ></input>
            </Link>

        </form>

        <p> To reset your password, please click on the link
            sent to your email. You can close this tab, or go
            back to the login menu.
        </p>

        <Link to="/login">
        <GenericButton text={"Login"}/>
        </Link>
        
        </>
    )
}