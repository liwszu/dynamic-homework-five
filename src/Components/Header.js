import React from "react";

export default function Header({ loggedIn, logoutFunction }) {
    return(
        <header className="header">
            <nav>
                {loggedIn && <a href="/">Home</a>}
                {!loggedIn && <a href="/login">Log in</a>}
                {!loggedIn && <a href="/signup">Signup</a>}
                {loggedIn && <a href="/" onClick={() => logoutFunction()}>Log Out </a>}
            </nav>
        </header>
    );
}