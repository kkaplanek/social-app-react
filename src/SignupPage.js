import axios from "axios";
import React, { Component } from "react";
import './SignupPage.css';

class SignupPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            repeatPassword: '',
            signUpMessage: ''
        }
    }

    signUpUser = (event) => {
        event.preventDefault();

        axios.post('https://akademia108.pl/api/social-app/user/signup',
        JSON.stringify({
            "username": this.state.username,
            "email": this.state.email,
            "password": this.state.password
        }))
        .then((response) => {
            console.log(response);

        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {
        return(
            <div className="SignupFormContainer">
                <form className="SignupForm" onSubmit={this.signUpUser}>
                    <input type="text" className="UsernameInput" required minLength={4} placeholder="Username"/><br />
                    <input type="email" className="UserEmail" required placeholder="Email"/><br />
                    <input type="password" className="PasswordInput" required minLength={6} pattern ="(?=.*\d)(?=.*[a-z])(?=.*?[0-9])(?=.*?[~`!@#$%\^*()\-_=+[\]{};:\x27.,\x22\\|/?><]).{4,}" placeholder="Password"/><br />
                    <input type="password" className="RepeatPasswordInput" required placeholder="Repeat password"/><br />
                    <button type="submit" className="SignupButton">Sign Up</button>
                </form>
            </div>
        )
    }

}

export default SignupPage;