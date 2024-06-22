import React, { useState } from 'react';

// React Hook Form (for forms in react and input validation)
import { useForm } from 'react-hook-form'; // https://www.youtube.com/watch?v=oSIHZ9zKzVA

// Multi-select dropdown menu
import Select, { InputActionMeta } from 'react-select'; // source: https://react-select.com/home

import MultiDatePicker from './MultiDatePicker';

export default function MyProfile(){



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

    // "hack" to remove the rendered calendar from the view
    //var calendar = document.getElementById("calendar");
    //calendar.innerHTML = ``;

    // Need:
    // Done:
    // Full name (50 characters, required)
    // Address 1 (100 characters, required)
    // Address 2 (100 characters, optional)
    // City (100 characters, required)
    // State (Drop Down, selection required) DB will store 2-character state code
    // Zip code (9 characters, at least 5-character code required)
    // Skills (multi-select dropdown, required)

    // Missing:
    // Preferences (text area, optional)
    // Availability (Date picker, multiple dates allowed, required)
    // (for availability the minimum requirement is that multiple
    // dates be selected -multiple individual dates-)

    const skillsOptions = [
        { value: 'roofing', label: 'Roofing'},
        { value: 'construction', label: 'Construction'},
        { value: 'mowing', label: 'Mowing'},
        { value: 'vietnameseLanguage', label: 'Vietnamese - Language'},
        { value: 'computerSkills', label: 'Computer Skills'}
    ]

    /* test options:
    <option value='Roofing'>Roofing</option>
    <option value='Mowing'>Mowing</option>
    <option value='Cleaning'>Cleaning</option>
    <option value='Sewing'>Sewing</option>
    <option value='Cooking'>Cooking</option>
    <option value='Construction'>Construction</option>
    <option value='Painting'>Painting</option>
    <option value='SpanishLanguage'>Spanish - Language</option>
    <option value='VietnameseLanguage'>Vietnamese - Language</option>
    <option value='AmericanSignLanguage'>American Sign Language</option>
    <option value='ComputerSkills'>Computer Skills</option>
    */

    // TODO:
    // 1. Add the library React Hook Form ? (the one that the guy with the interesting
    // computer background showed on the video
    // 2. Add the multi-date picker (later: consider giving the user the option
    // to update their availability
    // 3. REQUIRED: validations must be in place for required fileds, field types,
    // and field lengths
    // Make the message errors associated with the forms red color
    // Activate "onBlur" for React Hook Form so that you give immediate feedback
    // when something is wrong with the input (so that there is no need for the
    // form to be submitted to see the errors)
    
    // Note: had to remove the ReactHookForm implementation from the
    // State picker and Skills picker (these do not really need validation though)


    // New tutorial that I am following:
    // https://www.youtube.com/watch?v=RkXv4AXXC_4&t=15s


    // 2 options of availability selection
    // 1) Date time range, 2) time range, and multi-date picker
    // If you want to select date time range, then the multi-date and time range picker
    // is not available for use

    // Use the desktop version (better for desktop)

    // Final decision:
    // multi-date picker:
    //  https://shahabyazdi.github.io/react-multi-date-picker/
    // time range picker:
    //  https://github.com/gogosoon/react-pick-time-range


    // Maybe: wrape the date picker with a form div so that you can capture 
    // the user input? (remember that you need to grab the data when they click
    // submit (can be 1 submit for the data, and another submit button just
    // for the availability. It would be a two-step process, general information
    // about the volunteer and then the date picker



    var date = "june";

    const states = [
        { value: 'TX', label: 'TX'},
        { value: 'OK', label: 'OK'},
        { value: 'NM', label: 'NM'},
        { value: 'LA', label: 'LA'},
        { value: 'AZ', label: 'AZ'}
    ]

    const onSubmit = (data) => {

        if (date === ''){
            return(
                alert('An availability date is required')
            );
        }

        console.log('My profile form submitted!');
        console.log(data); // just put them in the console for now
    }

    //const { onBlur } = register('fullName');

    // credit for {required:true} piece of code:
    // user: Amit on https://stackoverflow.com/questions/66927051/getting-uncaught-typeerror-path-split-is-not-a-function-in-react

    const [userSkill, setUserSkill] = useState(""); // https://stackoverflow.com/questions/71094599/how-to-get-value-from-react-select-form

    
    const [userState, setUserState] = useState(""); // https://stackoverflow.com/questions/71094599/how-to-get-value-from-react-select-form

    function stateChangeSignalForState(data) {
        console.log('data from State React dropdown:')
        console.log(data.value);
    }

    function stateChangeSignalForSkills(data) {
        console.log('data from Skills React multi-dropdown:')
        console.log(data);
    }



    return (
        <>
        <h1>My Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='myProfileFormBox'>
                <label for='fullName'>Full Name</label>
                <input {...register('fullName', { required: 'Full name is required', pattern: { value: /[a-z]|[A-Z]/, message: 'Invalid input, you must include at least one character'}, maxLength: { value: 50, message: 'Max length is 50'}} )} />
                <p className='inputValidationError'>{errors.fullName?.message}</p>
            </div>
            <div className='myProfileFormBox'>
                <label for='Address1'>Address 1</label>
                <input {...register('Address1', { required: 'Address 1 is required', pattern: { value: /[a-z]|[A-Z]/, message: 'Invalid input, you must include at least one character'}, maxLength: { value: 100, message: 'Max length is 100'}} )} />
                <p className='inputValidationError'>{errors.Address1?.message}</p>
            </div>
            <div className='myProfileFormBox'>
                <label for='Address2'>Address 2</label>
                <input placeholder='Optional' {...register('Address2', { pattern: { value: /[a-z]|[A-Z]/, message: 'Invalid input, you must include at least one character'}, maxLength: { value: 100, message: 'Max length is 100'} }) } />
            </div>
            <div className='myProfileFormBox'>
                <label for='City'>City</label> {/* Per the regular expression, City will reject all inputs consisting only of numbers */}
                <input {...register('City', { required: 'City is required', pattern: { value: /[a-z]|[A-Z]/, message: 'Invalid input, you must include at least one character'}, maxLength: { value: 100, message: 'Max length is 100'}} )} />
                <p className='inputValidationError'>{errors.City?.message}</p>
            </div>
            <div className='myProfileFormBox'>
                <label for='State'>State</label>
                <Select 
                    className='stateMultiSelect'
                    options={states}
                    onChange={(choice) => {setUserState(choice); stateChangeSignalForState(choice) }}
                    required
                     />
            </div>
            <div className='myProfileFormBox'>
                <label for='zipCode'>ZIP Code</label> {/* credit for regex for digits: user1299656 on https://stackoverflow.com/questions/9011524/regex-to-check-whether-a-string-contains-only-numbers*/}
                <input {...register('zipCode', { required: 'ZIP Code is required', pattern: { value: /^[0-9]*$/, message: 'Input must be numbers only'}, minLength: { value: 5, message: 'Min length is 5'}, maxLength: { value: 9, message: 'Max length is 9'}} )} />
                <p className='inputValidationError'>{errors.zipCode?.message}</p>
            </div>
            <div className='myProfileFormBox'>
                <label for='Skills'>Skills</label>
                <Select 
                    isMulti
                    className='skillsMultiSelect'
                    options={skillsOptions}
                    onChange={(choice) => {setUserSkill(choice); stateChangeSignalForSkills(choice) }}
                    required
                     />
            </div>

            <div className='myProfileFormBox'>
                <label for='Preferences'>Preferences</label>
                <input {...register('Preferences', { pattern: { value: /[a-z]|[A-Z]/, message: 'Invalid input, you must include at least one character'}, maxLength: { value: 500, message: 'Max length is 500'} } )} />
                <p className='inputValidationError'>{errors.Preferences?.message}</p>
            </div>
            


        <div>
            <p>Availability</p>
            <MultiDatePicker 
                required
                />
        </div>

        <div className='myProfileFormSubmitButton'>
                <input type='submit' value='Save' />
            </div>
        </form>

        </>
    );
}