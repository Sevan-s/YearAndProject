import React from 'react';
import MicrosoftLogin from "react-microsoft-login";
import FacebookLogin from 'react-facebook-login';
import axios from 'axios'

var GoogleToken;

const responseFacebook = (response) => {
  console.log(response["accessToken"])
  axios.post("http://localhost:8080/user/setAccountLink/", {"token": response["accessToken"], "name": "Facebook"})
}
  
const reponseMicrosoft = (response) => {
  console.log(response);
  axios.post("http://localhost:8080/user/setAccountLink/", {"token": response["accessToken"], "name": "Microsoft"})
}

function updateMail() {
  var myInit = { method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GoogleToken}` },
      mode: 'cors',
      cache: 'default' };

    var myRequest = new Request(`https://www.googleapis.com/gmail/v1/users/me/watch`, myInit);
    fetch(myRequest,myInit)
    .then((data) => data.json())
    .then((result) => {
      console.log(result)
    }).catch(console.error)
}

function getSendMail() {
  var myInit = { method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GoogleToken}` },
      mode: 'cors',
      cache: 'default' };

    var myRequest = new Request(`https://gmail.googleapis.com/gmail/v1/users/me/messages`, myInit);
    fetch(myRequest,myInit)
    .then((data) => data.json())
    .then((result) => {
      console.log(result)
    }).catch(console.error)
}

function getCalendar() {
  var myInit = { method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GoogleToken}` },
      mode: 'cors',
      cache: 'default' };

    var myRequest = new Request(`https://www.googleapis.com/calendar/v3/calendars/primary`, myInit);
    fetch(myRequest,myInit)
    .then((data) => data.json())
    .then((result) => {
      console.log(result)
    }).catch(console.error)
}

export default function Oauth() {
    return (
      <div>
      <MicrosoftLogin clientId="e8b5f8ec-f285-4714-b9a5-e3ab65c5d34d"
        authCallback={reponseMicrosoft}
      />
      <FacebookLogin
        appId="3163056723974155"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
      />
      </div>
    )
}