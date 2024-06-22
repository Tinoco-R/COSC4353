// this component is a button that takes the user
// to the login page

import React from "react";

import { Link } from "react-router-dom";

import GenericButton from "../GenericButton";

export default function LoginRedirectButton(){
    return(
        <>
        <Link to="/login">
        <GenericButton text={"Login"} />
        </Link>
        </>
    );
}