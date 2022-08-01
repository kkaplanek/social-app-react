import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import './SignupPage.css';

class SignupPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            repeatPassword: '',
            signUpMessage: '',
            signedUp: '',
            usernameError: '',
            emailError: '',
            passwordError: '',
            repeatPassError: '' 
        };
    }

    handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
    
        this.setState({
            [name]: target.value
        })
      };

    validate = () => {

        let isValid = true;

        /* Username validation */
        if(this.state.username.trim().length < 4) {
            isValid = false;
            this.setState({usernameError: 'The username should be at least 4 characters long!'})
        } else if(!/^[^\s]*$/.test(this.state.username.trim())) {
            isValid = false;
            this.setState({usernameError: `The username shouldn't have empty characters!`})
        } else {
            this.setState({usernameError: ``})
        }

        /* E-mail validation */
        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(this.state.email.trim())) {
            isValid = false;
            this.setState({emailError: 'Input a valid email address.'})
        } else if (!/^[^\s]*$/.test(this.state.email.trim())) {
            isValid = false;
            this.setState({emailError: `The email address shouldn't have empty characters!`})
        } else {
            this.setState({emailError: ``})
        }

        /* Password validation */
        if(this.state.password.trim().length < 6) {
            isValid = false;
            this.setState({passwordError: 'The password should be at least 6 characters long!'}) 
        } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(this.state.password.trim())) {
            isValid = false;
            this.setState({passwordError: 'Password must contain one of these characters: ! # @ $ %'})
        } else if (!/^[^\s]*$/.test(this.state.password.trim())) {
            isValid = false;
            this.setState({passwordError: `The password shouldn't have empty characters!`})
        } else if (!/[0-9]/.test(this.state.password.trim())) {
            isValid = false;
            this.setState({passwordError: `The password should contain at least one number!`})
        } else {
            this.setState({passwordError: ''})
        }

        /* Repeat password validation */
        if(this.state.password !== this.state.repeatPassword) {
            isValid = false;
            this.setState({repeatPassError: 'Input the same password.'})
        }

        return isValid

    }

    signUpUser = (event) => {
        event.preventDefault();

        if(!this.validate()) return

        axios.post('https://akademia108.pl/api/social-app/user/signup',
        {
            "username": this.state.username,
            "email": this.state.email,
            "password": this.state.password
        })
        .then((response) => {
            this.setState({
                signedUp: response.data.signedup})
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render() {
        
        return(
            <div className="SignupFormContainer">
                <form className="SignupForm" onSubmit={this.signUpUser}>
                    <input 
                     type="text" 
                     className="UsernameInput" 
                     name="username" 
                     placeholder="Username"
                     required
                     onChange={this.handleInputChange} />
                     {this.state.usernameError && <p>{this.state.usernameError}</p>}
                     <br />
                    <input 
                     type="text" 
                     className="UserEmail" 
                     name="email" 
                     placeholder="Email"
                     required
                     onChange={this.handleInputChange} />
                     {this.state.emailError && <p>{this.state.emailError}</p>}
                     <br />
                    <input 
                     type="password" 
                     className="PasswordInput" 
                     name="password"
                     placeholder="Password"
                     required
                     onChange={this.handleInputChange} />
                     {this.state.passwordError && <p>{this.state.passwordError}</p>}
                     <br />
                    <input 
                     type="password" 
                     className="RepeatPasswordInput" 
                     name="repeatPassword" 
                     placeholder="Repeat password"
                     required
                     onChange={this.handleInputChange} />
                     {this.state.repeatPassError && <p>{this.state.repeatPassError}</p>}
                     <br />
                    {!this.state.signedUp && <button type="submit" className="SignupButton">Sign Up</button>}
                    {this.state.signedUp && 
                    <div className="LoginButtonContainer">
                        <Link to="/login"><button className="LoginButton">Go to LogIn page</button></Link>
                    </div>}
                </form>
            </div>
        )
    }

}

export default SignupPage;