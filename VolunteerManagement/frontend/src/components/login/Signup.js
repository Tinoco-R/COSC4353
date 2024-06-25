import React from "react";

import GenericButton from "../GenericButton";
import { Link } from "react-router-dom";


import { useForm } from "react-hook-form";

export default function Signup(){

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
        <h1>Sign Up</h1>

        <form className="loginForm" >


            <div className="signupFIELD">
                    <label for='email'>Email</label>
                    <input
                    type='text'
                    placeholder='example@email.com' 
                    {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Incorrect email address' } , maxLength: { value:50, message: 'Max length is 50'}} )} />
                    <p className='inputValidationError'>{errors.email?.message}</p>
            </div>

            <div className="signupField">
                <label for='Password'>Password</label>
                <input {...register('Password', { required: 'Password is required', minLength: { value: 8, message: 'Min length is 8'}} )} />
                <p className='inputValidationError'>{errors.Password?.message}</p>

            </div>


            <Link to='/verification' >
            <input type={"submit"} name={"SignupButton"} value={"Signup"}></input> {/* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form */}
            </Link>

        </form>
        </>
    );
}