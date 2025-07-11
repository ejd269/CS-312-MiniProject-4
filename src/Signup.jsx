import React from "react";

var isLoggedIn = true;

// signup component
const Signup = ({updatePage}) => {
    return (

        // signup HTML
        <div id="main-container">
            <h1>Hello</h1>
            <h2>Please enter your username and password to create a login:</h2>
            <div>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Sign Up</button>
            </div>
        </div>
    );
}

export default Signup