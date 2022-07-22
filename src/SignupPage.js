import axios from "axios";
import React, { Component } from "react";
import './SignupPage.css';
import { Link } from "react-router-dom";

class SignupPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            repeatPassword: '',
            signUpMessage: '',
            signedUp: ''
        }
    }

   handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
    
        this.setState({
            [name]: target.value
        })
      };

    signUpUser = (event) => {
        event.preventDefault();

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
                     required 
                     pattern="[^' ']+" 
                     minLength={4} 
                     placeholder="Username"
                     onChange={this.handleInputChange} /><br />
                    <input 
                     type="email" 
                     className="UserEmail" 
                     name="email" 
                     required 
                     pattern="[^' ']+" 
                     placeholder="Email"
                     onChange={this.handleInputChange} /><br />
                    <input 
                     type="password" 
                     className="PasswordInput" 
                     name="password" 
                     required 
                     minLength={6} 
                     pattern="(?=.*\d)(?=.*[a-z])(?=.*?[0-9])(?=.*?[~`!@#$%\^*()\-_=+[\]{};:\x27.,\x22\\|/?><]).{4,}" 
                     placeholder="Password"
                     onChange={this.handleInputChange} /><br />
                    <input 
                     type="password" 
                     className="RepeatPasswordInput" 
                     name="repeatPassword" 
                     required 
                     minLength={6} 
                     pattern="(?=.*\d)(?=.*[a-z])(?=.*?[0-9])(?=.*?[~`!@#$%\^*()\-_=+[\]{};:\x27.,\x22\\|/?><]).{4,}" 
                     placeholder="Repeat password"
                     onChange={this.handleInputChange} /><br />
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