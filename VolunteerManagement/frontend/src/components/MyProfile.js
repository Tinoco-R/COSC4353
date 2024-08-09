import React, { useState, useEffect } from 'react';

// React Hook Form (for forms in react and input validation)
import { useForm } from 'react-hook-form'; // https://www.youtube.com/watch?v=oSIHZ9zKzVA

// Multi-select dropdown menu
import Select, { InputActionMeta } from 'react-select'; // source: https://react-select.com/home

//import MultiDatePicker from './MultiDatePicker';
import { Navigate, redirect, useNavigate } from 'react-router-dom';

import DatePicker from 'react-multi-date-picker';


//import value from './MultiDatePicker'


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

    const states_old = [
        { value: 'TX', label: 'TX'},
        { value: 'OK', label: 'OK'},
        { value: 'NM', label: 'NM'},
        { value: 'LA', label: 'LA'},
        { value: 'AZ', label: 'AZ'}
    ]

    //var states = [];


    //const Fetch = () => {
        const [states, setStates] = useState([]);
        useEffect(() => {
            var get_states_url = '/api/GetStates'
            fetch(get_states_url, {
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
            })
            .then((res) => {
                //console.log("States from backend:");
                //console.log(res);
                //var res_json;
                //var tmp_ignore = res.text().then((tmp) => {
                //    res_json = JSON.parse(tmp);
                //});
                return res.json(); //res_json;/*response in json format*/
            })
            .then((data) => {
                var arr = [];
                for (const state in data) {
                    arr.push({ value: state, label: data[state]});
                }
                console.log(data);
                console.log(arr);
                setStates(arr); // final data for the component
            });
        }, []);


        const [skills, setSkills] = useState([]);
        useEffect(() => {
            var get_skills_url = '/api/GetSkills'
            fetch(get_skills_url, {
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
            })
            .then((res) => {
                //console.log("States from backend:");
                //console.log(res);
                //var res_json;
                //var tmp_ignore = res.text().then((tmp) => {
                //    res_json = JSON.parse(tmp);
                //});
                return res.json(); //res_json;/*response in json format*/
            })
            .then((data) => {
                var arr = [];
                for (const skill in data) {
                    arr.push({ value: skill, label: data[skill]});
                }
                console.log(data);
                console.log(arr);
                setSkills(arr); // final data for the component
            });
        }, []);

        
        const [profile, setProfile] = useState([]);
        useEffect(() => {
            var get_profile_url = '/api/GetProfile'
            fetch(get_profile_url, {
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
            })
            .then((res) => {
                //console.log("States from backend:");
                //console.log(res);
                //var res_json;
                //var tmp_ignore = res.text().then((tmp) => {
                //    res_json = JSON.parse(tmp);
                //});
                return res.json(); //res_json;/*response in json format*/
            })
            .then((profile) => {
                var arr = [];
                console.log('not looped profile:');
                console.log(profile);
                for (const data in profile) {
                    arr.push({ value: data, label: profile[data]});
                }
                console.log("Profile from backend:")
                console.log(profile);
                console.log(arr);
                setProfile(profile); // give a JSON object as input to the state function (not array of json, but JSON object)
            });
        }, []);

        console.log("profile:");
        console.log(profile)

        

        //const [hasProfile, setHasProfile] = useState([]);
        var hasProfile;
        if (profile.user === "None"){
            //console.log("No profile found");
            //setHasProfile(true);
            hasProfile = false;
        }
        else{
        //    setHasProfile(false);
        //    console.log("Profile found");
            hasProfile = true;
        }

        console.log('hasProfile:')
        console.log(hasProfile);

        

    //}

    //get_states();
    const [userSkill, setUserSkill] = useState(""); // https://stackoverflow.com/questions/71094599/how-to-get-value-from-react-select-form

    
    const [userState, setUserState] = useState(""); // https://stackoverflow.com/questions/71094599/how-to-get-value-from-react-select-form

    const [value_dates, setValue] = useState([]);//([]);//useState(new Date()); // stuck here, trying to get the data from user
    console.log("value:");
    console.log(value_dates);

    const navigate = useNavigate();

    var datesSelected;

    const onSubmit = (data) => {

        if (date === ''){
            return(
                alert('An availability date is required')
            );
        }

        console.log('My profile form submitted!');
        console.log(data); // just put them in the console for now

        // Note: Client-side input validation performed in the React component
        
        // Send the data (JSON object (JSON array)) to the backend:
        let api_profile_url;

        // hard-code hadProfile == true to test the Update endpoint functionality
        //hasProfile = true;
        
        if (hasProfile == true){
            // the call to the backend will be an update
            api_profile_url = '/api/UpdateProfile';
        }
        else {
            // the call to the backend will be to create a profile
            api_profile_url = '/api/CreateProfile';
        }

        console.log('Dates selected:')
        //console.log(value);
        console.log(datesSelected);
        console.log("DatePicker value:");
        console.log(DatePicker.value);
        console.log("values variable before API call:");
        var finalDateValues = "";
        value_dates.forEach((element) => {
            var tmp_val = element.toString();
            //var tmp_val_json = element.toJSON();
            console.log("to json:");
            //console.log(tmp_val_json);
            //var tmp_date = element.Date.prototype.getDate();
            //var tmp_day = element.prototype.getDay();
            //var tmp_year = element.prototype.getFullYear();
            //finalDateValues += tmp_date + "/" + tmp_day + "/" + tmp_year + ","
            finalDateValues += tmp_val + ',';
            console.log(tmp_val)
        });
        console.log('finalDateValues string before removing last comma:', finalDateValues);
        finalDateValues = finalDateValues.substring(0, finalDateValues.length - 1);
        console.log('finalDateValues string after removing last comma:', finalDateValues);

        

        var submitt_form = fetch(api_profile_url,{
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
                full_name: data.fullName,
                address1: data.Address1,
                address2: data.Address2,
                city: data.City,
                state: userState,//data.state,
                zip_code: data.zipCode,
                skills: userSkill,//data.skills,
                preferences: data.Preferences,
                availability: finalDateValues//value_dates//data.availability
            }),
            credentials: "same-origin"
        }).then((res) => {

            if (!res.ok){
                console.log("Error in profile api call");
                return;
            }

            console.log('response from backend:');
            console.log(res);
            
            let status_msg;
            let response_message = (res.text()).then((msg) => {
                console.log('msg');
                console.log(msg);
                status_msg = JSON.parse(msg)
                console.log('status_msg');
                console.log(status_msg)

                console.log('Status received:')
                console.log(status_msg.status) // status_msg is undefined here
    
                if (status_msg.status === "OK"){
                    console.log("Call to the backend completed successfully");
                    // If response from the backend is postiive, give this message to the user
                    // Commenting out the navigation for now
                    navigate('/saved-changes-confirmation');
                }
                else if (status_msg.msg === "ERROR"){
                    console.log("There was an error with the call to the backend");
                }



            })


        })

        
        // If response from the backend is postiive, give this message to the user
        // Commenting out the navigation for now
        //navigate('/saved-changes-confirmation');
    }

    //const { onBlur } = register('fullName');

    // credit for {required:true} piece of code:
    // user: Amit on https://stackoverflow.com/questions/66927051/getting-uncaught-typeerror-path-split-is-not-a-function-in-react


    function stateChangeSignalForState(data) {
        console.log('data from State React dropdown:')
        console.log(data.value);
    }

    function stateChangeSignalForSkills(data) {
        console.log('data from Skills React multi-dropdown:')
        console.log(data);
    }

    console.log('states for component:');
    console.log(states);


    console.log("modified value_dates:", value_dates.toString());
    /*value_dates.forEach((element) => {
        console.log("Value in value_dates array:");
        console.log(element.toString());
    })*/
    function handleDateChange(data) {
        console.log('date change, data:')
        console.log(data);
        data.forEach((element) => console.log(element));

        console.log(data[0]);
        //setValue(data); // Add the data to the state for the multidate picker
        console.log("value:");
        console.log(value_dates);
        console.log('updated value:');
        //setValue(data);
        console.log(value_dates);
        datesSelected = data;
        console.log('dateSelected:');
        console.log(datesSelected);
        console.log('data value:');
        console.log(data[0].value)
        
    }

    return (
        <div id="profile" >
        <h1 className='myProfileTitle'>My Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='myProfileFormBox'>
                <label for='fullName' className='profile_label_text'>Full Name</label>
                {
                    hasProfile ? (
                        <p style={{fontWeight: 'normal'}}>Current value: {profile.full_name}</p>
                    ):
                        <p style={{fontWeight: 'normal'}}>No value saved yet</p>
                }
                <input {...register('fullName', { required: 'Full name is required', pattern: { value: /[a-z]|[A-Z]/, message: 'Invalid input, you must include at least one character'}, maxLength: { value: 50, message: 'Max length is 50'}} )} />
                <p className='inputValidationError'>{errors.fullName?.message}</p>
            </div>
            <div className='myProfileFormBox'>
                <label for='Address1' className='profile_label_text'>Address 1</label>
                {
                    hasProfile ? (
                        <p style={{fontWeight: 'normal'}}>Current value: {profile.address1}</p>
                    ):
                        <p style={{fontWeight: 'normal'}}>No value saved yet</p>
                }
                <input {...register('Address1', { required: 'Address 1 is required', pattern: { value: /[a-z]|[A-Z]/, message: 'Invalid input, you must include at least one character'}, maxLength: { value: 100, message: 'Max length is 100'}} )} />
                <p className='inputValidationError'>{errors.Address1?.message}</p>
            </div>
            <div className='myProfileFormBox'>
                <label for='Address2' className='profile_label_text'>Address 2</label>
                {
                    hasProfile ? (
                        <p style={{fontWeight: 'normal'}}>Current value: {profile.address2}</p>
                    ):
                        <p style={{fontWeight: 'normal'}}>No value saved yet</p>
                }
                <input placeholder='Optional' {...register('Address2', { pattern: { value: /[a-z]|[A-Z]/, message: 'Invalid input, you must include at least one character'}, maxLength: { value: 100, message: 'Max length is 100'} }) } />
                <p className='inputValidationError'>{errors.Address2?.message}</p>
            </div>
            <div className='myProfileFormBox'>
                <label for='City' className='profile_label_text'>City</label> {/* Per the regular expression, City will reject all inputs consisting only of numbers */}
                {
                    hasProfile ? (
                        <p style={{fontWeight: 'normal'}}>Current value: {profile.city}</p>
                    ):
                        <p style={{fontWeight: 'normal'}}>No value saved yet</p>
                }
                <input {...register('City', { required: 'City is required', pattern: { value: /[a-z]|[A-Z]/, message: 'Invalid input, you must include at least one character'}, maxLength: { value: 100, message: 'Max length is 100'}} )} />
                <p className='inputValidationError'>{errors.City?.message}</p>
            </div>
            <div className='myProfileFormBox' id="profile_state_dropdown">
                <label for='State' className='profile_label_text'>State</label>
                {
                    hasProfile ? (
                        <p style={{fontWeight: 'normal'}}>Current value: {profile.state}</p>
                    ):
                        <p style={{fontWeight: 'normal'}}>No value saved yet</p>
                }
                <Select 
                    className='stateMultiSelect'
                    options={states}
                    onChange={(choice) => {setUserState(choice); stateChangeSignalForState(choice) }}
                    required
                    sty
                     />
            </div>
            <br></br>
            <div className='myProfileFormBox'>
                <label for='zipCode' className='profile_label_text'>ZIP Code</label> {/* credit for regex for digits: user1299656 on https://stackoverflow.com/questions/9011524/regex-to-check-whether-a-string-contains-only-numbers*/}
                {
                    hasProfile ? (
                        <p style={{fontWeight: 'normal'}}>Current value: {profile.zip_code}</p>
                    ):
                        <p style={{fontWeight: 'normal'}}>No value saved yet</p>
                }
                <input {...register('zipCode', { required: 'ZIP Code is required', pattern: { value: /^[0-9]*$/, message: 'Input must be numbers only'}, minLength: { value: 5, message: 'Min length is 5'}, maxLength: { value: 9, message: 'Max length is 9'}} )} />
                <p className='inputValidationError'>{errors.zipCode?.message}</p>
            </div>
            <div className='myProfileFormBox' id="profile_skills_dropdown">
                <label for='Skills' className='profile_label_text'>Skills</label>
                {
                    hasProfile ? (
                        <p style={{fontWeight: 'normal'}}>Current value: {profile.skills}</p>
                    ):
                        <p style={{fontWeight: 'normal'}}>No value saved yet</p>
                }
                <Select 
                    isMulti
                    className='skillsMultiSelect'
                    options={skills}
                    onChange={(choice) => {setUserSkill(choice); stateChangeSignalForSkills(choice) }}
                    required
                     />
            </div>
            <br></br>

            <div className='myProfileFormBox'>
                <label for='Preferences' className='profile_label_text'>Preferences</label>
                {
                    hasProfile ? (
                        <p style={{fontWeight: 'normal'}}>Current value: {profile.preferences}</p>
                    ):
                        <p style={{fontWeight: 'normal'}}>No value saved yet</p>
                }
                <input {...register('Preferences', { pattern: { value: /[a-z]|[A-Z]/, message: 'Invalid input, you must include at least one character'}, maxLength: { value: 500, message: 'Max length is 500'} } )} />
                <p className='inputValidationError'>{errors.Preferences?.message}</p>
            </div>
            

        {/*
        <div className='multiDatePickerInMyProfileForm'>
            <p id='availabilityLabelMyProfileForm'>Availability</p>
            {
                    hasProfile ? (
                        <p>Current value: {profile.availability}</p>
                    ):
                        <p>No value saved yet</p>
            }
            <MultiDatePicker 
                required
                />
        </div>*/}

        <div className='myProfileFormBox'>
            <label for='availability' className='profile_label_text'>Availability</label>
            {
                    hasProfile ? (
                        <p style={{fontWeight: 'normal'}}>Current value: {profile.availability}</p>
                    ):
                        <p style={{fontWeight: 'normal'}}>No value saved yet</p>
            }
        <DatePicker
            multiple 
            value={value_dates}//{[null]}//{value}
            minDate={new Date()}
            format="MMMM DD YYYY"
            onChange={setValue}//{(data) => handleDateChange(data)} // setValue()
            required
        />
        </div>
        
        <br></br>

        <div className='myProfileFormSubmitButton'>
                <input className='greenButtonStyle' type='submit' value='Save' />
            </div>
        </form>

        </div>
    );

    

}