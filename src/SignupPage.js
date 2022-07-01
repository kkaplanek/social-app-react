import React, { Component } from "react";
import './SignupPage.css';

class SignupPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="SignupFormContainer">
                <form className="SignupForm">
                    <input type="text" className="UsernameInput" placeholder="Username"/><br />
                    <input type="email" className="UserEmail" placeholder="Email"/><br />
                    <input type="password" className="PasswordInput" placeholder="Password"/><br />
                    <input type="password" className="RepeatPasswordInput" placeholder="Repeat password"/><br />
                    <button type="submit" className="SignupButton">Sign Up</button>
                </form>
            </div>
        )
    }

}

export default SignupPage;