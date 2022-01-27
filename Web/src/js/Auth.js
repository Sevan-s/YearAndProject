import React from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged} from "firebase/auth";
import { Navigate } from "react-router-dom";
import axios from 'axios'
import {useState} from 'react'
import '../css/Auth.css';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMcyOLBhlGN8RDTgrcglA6znsolGkFnG8",
  authDomain: "otakuboard-eb4e1.firebaseapp.com",
  projectId: "otakuboard-eb4e1",
  storageBucket: "otakuboard-eb4e1.appspot.com",
  messagingSenderId: "120992508166",
  appId: "1:120992508166:web:769c0833dec960425f9687",
  measurementId: "G-Q9G8D4S3QH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics);

const auth = getAuth();
const provider = new GoogleAuthProvider();

function ConnectUser(user){
  console.log("try to connect");
  axios.post("http://localhost:8080/user/connect/", {"user": user});
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    ConnectUser(user);
    console.log(uid);
    // ...
  } else {
    console.log("Contient toujours pas de nom d'utilisateur");
    // User is signed out
    // ...
  }
});


function register(email, password) {
  console.log("register");
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
      // Signed in
      console.log("test");
      const user = userCredential.user;
      ConnectUser(user);
      // ...
    })
    .catch((error) => {
      console.log("test2");
      const errorMessage = error.message;
      console.log(errorMessage)
      // ..
  });
}

function signIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        ConnectUser(user);
        // ...
    })
    .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage)
    });
}

function signOutFirebase() {
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log("sign out");
  }).catch((error) => {
    console.log(error);
    // An error happened.
  });
}

function signInWithGoogle() {
  signInWithRedirect(auth, provider);
  getRedirectResult(auth)
    .then((result) => {
      console.log("connect")
      // This gives you a Google Access Token. You can use it to access Google APIs.
      //const credential = GoogleAuthProvider.credentialFromResult(result);
      //const token = credential.accessToken;
      // The signed-in user info
      console.log(result);
      if (result == null) {
        ConnectUser(null);
      } else {
        const user = result.user;
        ConnectUser(user);
      }
  
    }).catch((error) => {
      // Handle Errors here.
      const errorMessage = error.message;
      console.log(errorMessage)
      // The email of the user's account used.
      //const email = error.email;
      // The AuthCredential type that was used.
      //const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
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

export {Auth, signOutFirebase};