import React from 'react';
import { Navigate } from "react-router-dom";
import axios from 'axios'
import {useState} from 'react'
import '../css/Auth.css';
import GoogleLogin from 'react-google-login';
import ReactDOM from 'react-dom';


function register(email, password) {
  console.log("register -> To modify");
  axios.post("http://localhost:8080/user/create/", {"username": email, "password": password, "OAUTH": false});
}

function signIn(email, password) {
  console.log("signIn -> To modify");
  axios.post("http://localhost:8080/user/connect/", {"username": email, "password": password, "OAUTH": false});
}

const responseGoogle = (response) => {
  axios.post("http://localhost:8080/user/oauth/", {"username": response["Iu"]["sf"], "password": response["profileObj"]["googleId"], "OAUTH": true})
  axios.post("http://localhost:8080/user/setAccountLink/", {"token": response["accessToken"], "name": "Google"})
  window.location.reload(false);
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
        <GoogleLogin
        clientId="748486023082-7d0a346g33366k9ftbp37n0u2jh70fcr.apps.googleusercontent.com"
        render={renderProps => (
          <button class="google-button" onClick={renderProps.onClick}>Login with Google</button>
        )}
        onSuccess={responseGoogle}
        cookiePolicy={'single_host_origin'}
        />
      </form>
    </div>
  );
}

export {Auth};