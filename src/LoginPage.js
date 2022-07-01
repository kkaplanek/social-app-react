import React, { Component } from "react";
import './LoginPage.css';
import axios from "axios";
import { Navigate } from "react-router-dom";

class LoginPage extends Component {

    constructor (props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

    }

    loginUser = (event) => {
        event.preventDefault();

        axios.post(
            'https://akademia108.pl/api/social-app/user/login', 
            {
                "username": this.state.username,
                "password": this.state.password,
                "ttl": 3600 
            }, 
            {
                'headers': {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + <jwtToken />
                }
            })
        .then((response) => {
            console.log(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            this.props.setUser((response.data))
        })
        .catch((error) => {
            console.error(error);
        });

    }


    render() {
        return(
            <div className="LoginFormContainer">
                {this.props.user && <Navigate to="/" />}
                <form className="LoginForm" onSubmit={this.loginUser}>
                    <input type="text" className="UsernameInput" placeholder="Username" onChange={(e) => {this.setState({username: e.target.value})}}/><br />
                    <input type="password" className="PasswordInput" placeholder="Password" onChange={(e) => {this.setState({password: e.target.value})}}/><br />
                    <button type="submit" className="LoginButton">Login</button>
                </form>
            </div>
        )
    }

}

export default LoginPage;