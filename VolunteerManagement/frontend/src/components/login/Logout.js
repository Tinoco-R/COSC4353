import React from "react";

import { Link } from "react-router-dom";

import GenericButton from "../GenericButton";

export default function Logout(){
    return(
        <>
        <p>You have successfully logged out!</p>

        <Link to="/login">
        <GenericButton text={"Login"}/>
        </Link>
        </>

    );
}