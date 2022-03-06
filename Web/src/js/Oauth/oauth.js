import React from 'react';
import MicrosoftLogin from "react-microsoft-login";
import FacebookLogin from 'react-facebook-login';
import axios from 'axios'

const responseFacebook = (response) => {
  console.log(response["accessToken"])
  axios.post("http://localhost:8080/user/setAccountLink/", {"token": response["accessToken"], "name": "Facebook"})
}
  
const reponseMicrosoft = (response) => {
  console.log(response);
  axios.post("http://localhost:8080/user/setAccountLink/", {"token": response["accessToken"], "name": "Microsoft"})
}

export default function Oauth() {
    return (
      <div>
        <div className="widget oauth-button">
          <MicrosoftLogin clientId="e8b5f8ec-f285-4714-b9a5-e3ab65c5d34d"
            authCallback={reponseMicrosoft}
          />
        </div>
        <div className="widget oauth-button">
          <FacebookLogin
            appId="3163056723974155"
            fields="name,email,picture"
            callback={responseFacebook}
          />
        </div>
      </div>
    )
}