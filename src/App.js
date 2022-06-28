import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";

import './App.css';

import HomePage from './HomePage.js';

function App() {
  return (
    <div>
      <header className="App-header">
        <h1>Social App</h1>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
        </Routes>
      </header>
    </div>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <nav>
        <ul>
          <li>
            <Link to="/" className="App-link">Home</Link>
          </li>
          <li>
            <Link to="/login" className="App-link">Login</Link>
          </li>
          <li>
            <Link to="/signup" className="App-link">SignUp</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}

function Home() {
  return (
    <div>
      <HomePage />
    </div>
  );
}

function Login() {
  return (
    <div>
      <h2>Log In</h2>
    </div>
  );
}

function SignUp() {
  return (
    <div>
      <h2>Sign Up</h2>
    </div>
  );
}

export default App;
