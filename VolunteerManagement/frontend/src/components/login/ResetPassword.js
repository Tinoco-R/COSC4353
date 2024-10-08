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

        console.log('Associated email form submitted!');
        console.log(data.email); // just put them in the console for now
        var target_url = "http://127.0.0.1:8000/api/resetPassword/" + data.email;
        console.log("target_url: " + target_url);
        var email_url = fetch(target_url, {
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
            method: "GET",
            credentials: "same-origin"
        }).then((res) =>{
            if (res.ok){
                console.log("Request succeded");
                window.location.replace("http://127.0.0.1:8000/email-address-received/")
            }
            else {
                console.log("Request failed");
            }
        })
        
    }
    /*function onSubmit() {
        console.log("associated email submiteed");
    }*/


    return (
        <>
        <h1>Reset my password</h1>
        <p>Please provide the email associated with 
            your account. Click on the link that will
            be sent to this email to reset the password. </p>

        <p> You can close this tab or go
            back to the login menu.
        </p>

        <form className="emailInputForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="emailField">
                <label for='email'></label>
                <input
                type='text'
                placeholder='example@email.com' 
                 {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Incorrect email address' } , maxLength: { value:50, message: 'Max length is 50'}} )} />
                <p className='inputValidationError'>{errors.email?.message}</p>
        </div>
            {/*<Link to='/email-address-received'>*/}
            <input type="submit" name="emailForPasswordReset" value="Submit" ></input>
            {/*</Link>*/}

        </form>

        <br></br>

        <Link to="/login">
        <GenericButton text={"Go back to Login"}/>
        </Link>
        
        </>
    )
}