import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from "react-router-dom";
import { blue } from "@mui/material/colors";

export default function SavedChangesConfirmation(){
    return(
        <>
        <h3 style={{fontWeight: "bolder"}}>Your changes have been saved</h3>

        <div className="confirmationCheckMark">
            <CheckCircleIcon
            htmlColor='#86C232'
            fontSize="inherit"
                
                />  
        </div>

        <Link to='/landing'>
            <button className="greenButtonStyle">Go to home page</button>
        </Link>

        </>
    )
}