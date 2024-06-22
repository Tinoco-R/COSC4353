import React from 'react';

export default function NotificationComponent(){

    const notification_id = 1;
    
    const title = 'Notification Component Title';
    const text = 'Place notification text here';

    function OKbuttonClickHandler(){
        console.log('OK button clicked by user');

    }
    
    return (
        <div className='notificationComponent'>
            <h3>{title}</h3>
            <p>{text}</p>
            <button onClick={OKbuttonClickHandler}>OK</button>
        </div>
    );
}