import React from 'react';
import MicrosoftLogin from "react-microsoft-login";
import FacebookLogin from 'react-facebook-login'; 
import GoogleLogin from 'react-google-login';
import axios from 'axios'

const responseFacebook = (response) => {
  console.log(response["accessToken"])
  axios.post("http://localhost:8080/user/setAccountLink/", {"token": response["accessToken"], "name": "Facebook"})
}
  
const reponseMicrosoft = (response) => {
  console.log(response);
  axios.post("http://localhost:8080/user/setAccountLink/", {"token": response["accessToken"], "name": "Microsoft"})
}

const responseGoogle = (response) => {
  console.log(response)
  axios.post("http://localhost:8080/user/setAccountLink/", {"token": response["accessToken"], "name": "Google"})
}

function responseDiscord() {
  const fragment = (new URL(document.location)).searchParams;
  console.log(fragment.toString())
  
  if (!fragment.has('code')) {
    console.log("exit")
    return; 
  }

  const code = fragment.get('code');
  console.log(code)

  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }

  const params = {
    client_id: '948601629056315423',
    client_secret: 'KIjjlpfteqmwtns-yBiSiFRqDWqlxRXC',
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: 'http://localhost:8081/settings'
  }
  axios.post('https://discord.com/api/oauth2/token', params, {headers: headers}).then(function (response) {
    console.log(response)
    // fetch('https://discord.com/api/users/@me', {
    //   headers: {
    //     authorization: `${tokenType} ${accessToken}`,
    //   },
    // }).then(result => result.json())
    //   .then(response => {
    //     console.log(response["id"])
    //     axios.post("http://localhost:8080/user/setAccountLink/", {"token": response["id"], "name": "Discord"})
    //   })
    //   .catch(console.error);
  });
}

export default function Oauth() {
    responseDiscord()
    return (
      <div className="serviceWrapper" id="widgetParent">
        <div className="widget oauth-button">
          <MicrosoftLogin clientId="e8b5f8ec-f285-4714-b9a5-e3ab65c5d34d"
            authCallback={reponseMicrosoft}
            render={renderProps => (
              <button className="google-button" onClick={renderProps.onClick}>CONTINUE WITH MICROSOFT</button>
            )}
          />
        </div>
        <div className="widget oauth-button">
          <FacebookLogin
            appId="3163056723974155"
            fields="name,email,picture"
            callback={responseFacebook}
            render={renderProps => (
              <button className="google-button" onClick={renderProps.onClick}>CONTINUE WITH FACEBOOK</button>
            )}
          />
        </div>
        <div className="widget oauth-button">
          <GoogleLogin
            clientId="748486023082-7d0a346g33366k9ftbp37n0u2jh70fcr.apps.googleusercontent.com"
            render={renderProps => (
              <button className="google-button" onClick={renderProps.onClick}>CONTINUE WITH GOOGLE</button>
            )}
            onSuccess={responseGoogle}
            cookiePolicy={'single_host_origin'}
            scope="https://mail.google.com/ https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/user.phonenumbers.read"
          />
        </div>
        <div className="widget oauth-button">
          <a id="login" href="https://discord.com/api/oauth2/authorize?client_id=948601629056315423&amp;permissions=8&amp;redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Fsettings&amp;response_type=code&amp;scope=identify%20email%20bot">Login with Discord</a>
        </div>
      </div>
    )
}