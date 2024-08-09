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
        console.log(data["newPassword"]); // just put them in the console for now
        var user = window.location.pathname.split("/").pop() // credit: user Dblock247 on https://stackoverflow.com/questions/4758103/last-segment-of-url-with-javascript
        console.log("user: " + user);
        var change_password_url = "/api/changePassword";//" + user + "/" + data["newPassword"]
        console.log("target url: " + change_password_url);
        var submitt_form = fetch(change_password_url,{
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
                //user: data.user,
                user: user,
                password: data["newPassword"]
            }),
            credentials: "same-origin"
        }).then((res) => {

            if (res.ok){
                if (alert("Password reset successfully") === undefined){
                    window.location.replace('/'); // Sends to the login page
                }
                else {
                    alert("Could not reset password");
                }
            }

  


        })
    }


    return (
        <>
        <h1>New password</h1>
        <p>Please enter your new password:</p>

        

        <form className="newPasswordInputForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="newPasswordField">
                <label for='newPassword'></label>
                <input
                type='text'
                placeholder=''
                 {...register('newPassword', { required: 'New password is required'} )} />
                <p className='inputValidationError'>{errors.newPassword?.message}</p>
        </div>
            {/*<Link to='/'>*/}
            <input type="submit" name="newPassword" value="Submit new password" ></input>
            {/*</Link>*/}

        </form>

        <br></br>

        <Link to="/login">
        <GenericButton text={"Go back to Login"}/>
        </Link>
        
        </>
    )
}