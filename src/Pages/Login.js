import React from "react";
import LoginForm from "../Components/LoginForm";

export default function Login({ loginFunction }) {
    return (
    <div>
        <div>Login Form</div>
        <LoginForm loginFunction={loginFunction}/>
    </div>
    );
}