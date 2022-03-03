import React from 'react';
import { Navigate, Link } from "react-router-dom";
import axios from 'axios'
import {useState} from 'react'
import '../css/Auth.css';
import GoogleLogin from 'react-google-login';

function register(email, password) {
    console.log("register -> To modify");
    axios.post("http://localhost:8080/user/create/", {"username": email, "password": password, "OAUTH": false});
}

const responseGoogle = (response) => {
    axios.post("http://localhost:8080/user/oauth/", {"username": response["Iu"]["sf"], "password": response["profileObj"]["googleId"], "OAUTH": true})
    axios.post("http://localhost:8080/user/setAccountLink/", {"token": response["accessToken"], "name": "Google"})
    window.location.reload(false);
}

function RegisterPage(props) {
    const [connect, setConnect] = useState(null);
    props.connect.then(data => setConnect(data));
    console.log(props.connect)
    if (connect === 1) {
        return (<Navigate replace to="/home" />);
    }
    return (
        <div>
            <div id="maindiv" className="auth-container">
                <b className='title' id='firstTitle'>Digital</b>
                <b className='title'>Widget</b>
                <b className='title' id='lastTitle'>Service</b>
                <form action="" method="get">
                    <label><b>Email</b></label><br></br>
                    <input className='formField' id="uname" type="text" placeholder="my@email.here" name="uname" required /><br></br>

                    <label><b>Password</b></label><br></br>
                    <input className='formField' id="psw" type="password" placeholder="my_$ecr3t!/p4ssWOrd" name="psw" required />
                    <div className="button-container">
                    <button className="register-button" onClick={() => register(document.getElementById("uname").value, document.getElementById("psw").value)} type="submit">Register</button>
                    <div className='separator'>
                        <br></br>
                        <hr></hr><b>or</b><hr></hr>
                        <br></br>
                    </div>
                    <GoogleLogin
                    clientId="748486023082-7d0a346g33366k9ftbp37n0u2jh70fcr.apps.googleusercontent.com"
                    render={renderProps => (
                        <button class="google-button" onClick={renderProps.onClick}>CONTINUE WITH GOOGLE</button>
                    )}
                    onSuccess={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    />
                    </div>
                </form>
            </div>
            <div className='switch'>
                <b className='par'>Have an account?</b>
                <Link className='link' to="/">Log in now</Link>
            </div>
        </div>
    );
}
  
export default RegisterPage;