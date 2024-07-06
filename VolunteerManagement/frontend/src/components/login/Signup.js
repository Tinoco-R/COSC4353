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

    const onSubmit = async (data) => { // Making it async so I can call await in fetch

        console.log('Login form submitted!');
        console.log(data); // just put them in the console for now
        
        data.email
        data.password

        let url = 'http://127.0.0.1:8000/api/Register';
        console.log('Making fetch call to register user');
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

        if (!response.ok){
            console.log('Error creating user');
            console.log(response);
        }
        else {
            console.log('User registered successfully');
        }
    
    }
    
    return (
        <>
        <h1>Sign Up</h1>

        <form className="loginForm" onSubmit={handleSubmit(onSubmit)} >


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


            {/*<Link to='/verification' >*/}
            <input type={"submit"} name={"SignupButton"} value={"Signup"}></input> {/* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form */}
            {/*</Link></>*/}

        </form>
        </>
    );
}