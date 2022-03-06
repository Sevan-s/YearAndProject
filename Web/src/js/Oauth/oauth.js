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

function responseDiscord() {
  const fragment = new URLSearchParams(window.location.hash.slice(1));

  if (!fragment.has('access_token') || !fragment.has('token_type'))
    return;

  const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

  console.log(accessToken)
  fetch('https://discord.com/api/users/@me', {
    headers: {
      authorization: `${tokenType} ${accessToken}`,
    },
  }).then(result => result.json())
    .then(response => {
      console.log(response["id"])
      axios.post("http://localhost:8080/user/setAccountLink/", {"token": response["id"], "name": "Discord"})
    })
    .catch(console.error);
}

export default function Oauth() {
    responseDiscord()
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
        <div className="widget oauth-button">
          <a id="login" href="https://discord.com/api/oauth2/authorize?client_id=948601629056315423&amp;permissions=8&amp;redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Fsettings&amp;response_type=code&amp;scope=identify%20email%20bot">Login with Discord</a>
        </div>
      </div>
    )
}