import React from 'react';
import { Navigate } from "react-router-dom";
import axios from 'axios'
import {useState} from 'react'
import '../css/Auth.css';


function register(email, password) {
  console.log("register -> To modify");
  axios.post("http://localhost:8080/user/create/", {"username": email, "password": password});
}

function signIn(email, password) {
  console.log("signIn -> To modify");
  axios.post("http://localhost:8080/user/connect/", {"username": email, "password": password});
}

function signInWithGoogle() {
  console.log("signInGoogle -> To ADD");
}

function Auth(props) {
  const [connect, setConnect] = useState(null);
  props.connect.then(data => setConnect(data));
  console.log(props.connect)
  if (connect === 1) {
    return (<Navigate replace to="/home" />);
  }
  return (
    <div id="maindiv">
      <p id="title">Otaku board</p>
      <form action="" className="auth-container" method="get">
        <label><b>Username</b></label>
        <input id="uname" type="text" placeholder="Enter Username" name="uname" required />

        <label><b>Password</b></label>
        <input id="psw" type="password" placeholder="Enter Password" name="psw" required />
        <div className="button-container">
          <button className="login-button" onClick={() => register(document.getElementById("uname").value, document.getElementById("psw").value)} type="submit">Register</button>
          <div className="blank">
          </div>
          <button className="register-button" onClick={() => signIn(document.getElementById("uname").value, document.getElementById("psw").value)} type="submit">Sign In</button>
        </div>
        <button className="google-button" onClick={() => signInWithGoogle()} type="submit">Sign in with Google</button>
      </form>
    </div>
  );
}

export {Auth};