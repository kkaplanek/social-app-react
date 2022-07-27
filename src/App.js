import React, {useState} from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import axios from "axios";

import './App.css';

import HomePage from './HomePage.js';
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  axios.defaults.headers.common['Authorization'] = "Bearer " + (user ? user.jwt_token : "");


  return (
    <div className="App-header">
      <Routes>
          <Route path="/" element={<Layout user={user} setUser={setUser}/>}>
            <Route index element={<HomePage user={user}/>} />
            <Route path="login" element={<LoginPage setUser={setUser} user={user}/>} />
            <Route path="signup" element={<SignupPage />} />
          </Route>
      </Routes>
    </div>
  );
}

function Layout(props) {

  const logOutUser = (event) => {
    event.preventDefault();
  
    axios.post('https://akademia108.pl/api/social-app/user/logout')
      .then((response) => {
        if (response.data.message) {
          localStorage.removeItem('user');
          props.setUser(null)
        }
      })
      .catch((error) => {
        console.error(error);
        localStorage.removeItem('user');
        props.setUser(null)
      });
  }


  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/" className="App-link">Home</Link>
          </li>
          {!props.user && <li>
            <Link to="/login" className="App-link">Login</Link>
          </li>}
          {!props.user && <li>
            <Link to="/signup" className="App-link">SignUp</Link>
          </li>}
          {props.user && <li>
            <Link to="/" className="App-link" onClick={logOutUser}>Log Out</Link>
          </li>}
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}

export default App;
