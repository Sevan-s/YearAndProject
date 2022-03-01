import React from 'react';
import LoginGithub from 'react-login-github';
import MicrosoftLogin from "react-microsoft-login";
import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {
    console.log(response["accessToken"])
  }
  
  const authHandler = (err, data) => {
    console.log(err, data);
  }

  const responseTwitch = (response) => {
    console.log("oui")
    var myInit = { method: 'GET',
                header: JSON.stringify({ client_id: `5wkrisoo3f5ef3fuddbmr4v54ubakh`, redirect_uri: `http://localhost:3000/`, response_type: `token`, scope: `viewing_activity_read`}),
                mode: 'no-cors',
                cache: 'default'
                };
    fetch(`https://id.twitch.tv/oauth2/authorize`,myInit)
      .then((data) => data.json())
      .then((result) => {
        console.log(result.access_token)
      }).catch(console.error)
  }
  
  const responseGithub = (response) => {
    console.log(response["code"])
    var code = response["code"]
  
    var myInit = { method: 'POST',
                 body: JSON.stringify({ client_id: `7e2d47871159883287a0`, client_secret: `315208fdbb4b795aed1eda42efe97c012a0b3545`, code: `${code}` }),
                 mode: 'no-cors',
                 cache: 'default' };
  
    fetch(`https://github.com/login/oauth/access_token`,myInit)
      .then((data) => data.json())
      .then((result) => {
        console.log(result.access_token)
      }).catch(console.error)
    // window.location.reload(false);
  }

export default function Oauth() {
    return (
      <div>
      <LoginGithub clientId="7e2d47871159883287a0"
        onSuccess={responseGithub}
      />
      <MicrosoftLogin clientId="e8b5f8ec-f285-4714-b9a5-e3ab65c5d34d"
        authCallback={authHandler}
      />
      <FacebookLogin
        appId="3163056723974155"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}
      />
      <button onClick={responseTwitch}></button>
      </div>
    )
}