import React from "react";

import GenericButton from "../GenericButton";

import { Link } from 'react-router-dom';

export default function EmailAddressReceivedConfirmation(){
    return(
        <>
        <h3>Your email address has been received.</h3>
        <Link to="/login">
        <GenericButton text={"Take me to login page"}
        />
        </Link>
        </>
        
    )
}