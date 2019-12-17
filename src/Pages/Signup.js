  
import React from "react";
import CreateAccountForm from '../Components/CreateAccountForm';

export default function Signup({ signupFunction }){
    return (
        <div>
            <div>Sign Up</div>
            <CreateAccountForm signupFunction={signupFunction} />
        </div>
    );
};