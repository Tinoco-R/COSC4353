import React from 'react';
import Swal from 'sweetalert2';


// Notification system is a function that shows a pop up to the user
// and takes as a paramenter the title for the notification popup
// and the message to display in the popup

// Just import this file and make a function call, passing the two
// parameters, to display the notificaiton

export function ShowNotification(title, message){


    // credit, examples at: https://sweetalert2.github.io/
    Swal.fire({
        title: '<h5>' + title +  '</h5>',
        text: message,
        /*icon: 'warning',*/
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Close",
        confirmButtonText: "Acknowledge",
        allowOutsideClick: false
    })//.then((result) => {

        //if (!result.isConfirmed) {
        //    ShowNotification(title, message)
        /*Swal.fire({
            title: 'Confirmed',
            text: 'Your attendance to this event has been cancelled.',
            icon: 'success'
        });*/

        // Remove the user from the attendees to the event and Update the screen
        // Considering that this function could be removed... you can't be penalized
        // for not having it because it was not required
        //    console.log('Notification acknowledged by the user');

        //}
    //});

}

export function ShowDetails(title, form, onConfirm, deleting = false){
    let cancelText;
    let confirmText;
    // Either deleting an event or adding / updating
    if (deleting) {
        cancelText = "Cancel";
        confirmText = "Delete Event";
    }
    else {
        cancelText = "Edit Form";
        confirmText = "Send To Database";
    }
    const formHtml = Object.entries(form).map(([key, value]) => {
        return `<p><strong>${key}:</strong> ${value}</p>`;
    }).join('');

    Swal.fire({
        title: '<h5>' + title +  '</h5>',
        html: formHtml,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: cancelText,
        confirmButtonText: confirmText,
        allowOutsideClick: false
    }).then((result) => { // Check if user confirms or denies form finalization
        if (result.isConfirmed) {
            console.log('User confirmed');
            onConfirm(true);
        } else {
            console.log('User cancelled');
            onConfirm(false);
        }
    });

}