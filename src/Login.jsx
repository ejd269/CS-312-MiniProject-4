import React from "react";

var isLoggedIn = true;

// login component
const Login = ({updatePage}) => {
    return (
        // login page HTML
        <div id="main-container">
            <h1>Hello</h1>
            <h2>Please enter your login information if you haven't already:</h2>
            <div>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button onClick={() => updatePage("Dashboard")} type="submit">Login</button>
            </div>
        </div>
    );
}

export default Login