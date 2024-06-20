import React from 'react';
import { useParams } from 'react-router-dom';
import { cardData } from './cardData';

// Shows all details of a given event. Currently works with hardcoded data
const EventDetail = () => {
    const { eventId } = useParams();

    // This is how to get the hardcoded data, modify to get actual data from the database
    const eventDetails = cardData[eventId - 1];

    // Connect to the database to fetch all details for this Event
    return (
        <div>
            <h2>Details for Event {eventId}</h2>
            {eventDetails && (
                <div>
                    <p>Address: {eventDetails.address}</p>
                    <p>Registered Volunteers: {eventDetails.registered}</p>
                    <p>Required Volunteers: {eventDetails.required}</p>
                    <p>Date: {eventDetails.date}</p>
                    <p>Range: {eventDetails.range}</p>
                </div>
            )}
        </div>
    );
};

export default EventDetail;