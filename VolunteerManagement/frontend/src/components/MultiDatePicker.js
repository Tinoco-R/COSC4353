import React, { useState } from 'react';
import DatePicker from 'react-multi-date-picker';

import DatePanel from 'react-multi-date-picker/plugins/date_panel';

export default function MultiDatePicker() {

    // You might want to look at the DateObject mentioned
    // here https://shahabyazdi.github.io/react-multi-date-picker/installation/
    // if you would like to do manipulations with the dates

    // Example using react hook form:
    // https://shahabyazdi.github.io/react-multi-date-picker/react-hook-form/

    const [value, setValue] = useState(new Date()); // stuck here, trying to get the data from user

    //const [userDates, setUserDates] = useState(new Date());//useState("");

    function handleDateChange(data) {
        console.log('date change, data:')
        console.log(data);
        console.log(data[0]);
    }

    return (
        <DatePicker
            multiple 
            value={value}
            minDate={new Date()}
            format="MMMM DD YYYY"
            onChange={(data) => handleDateChange(data)}
            plugins={[
                <DatePanel />
            ]}
        />
    )
}