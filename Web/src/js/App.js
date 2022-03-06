import {Auth} from './Auth.js'
import RegisterPage from './Register.js'
import '../css/App.css';
import '../css/workspace.css';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Navbar from "./NavBar"
import React, { useState } from 'react';
import axios from 'axios';
import Oauth from "./Oauth/oauth.js"
import HomeWidget from './Home.js';
import ConfigWidget from './Config.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/Config" element={<Config/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/disconnect" element={<Disconnect/>} />
        <Route path="/about.json" element={<About about={getAbout()}/>} />
      </Routes>
    </BrowserRouter>
  );
}

//////////////////// LOGIN

async function getConnectVal() {
  var connect = 0
  await axios.get("http://localhost:8080/user/connected/")
    .then(res => {
      const data = res.data;
      connect = data.isConnected;
  })
  return (connect);
}

function Login() {
  return (
    <div className="Service">
      <Auth connect={getConnectVal()}/>
    </div>
  );
}

function Register() {
  return (
    <div className="Service">
      <RegisterPage connect={getConnectVal()}/>
    </div>
  );
}

function Settings() {
  return (
    <div>
      <Navbar/>
      <br/>
      <Oauth></Oauth>
    </div>
  )
}

//////////////////// DISCONNECT

function Disconnect() {
  axios.post("http://localhost:8080/user/disconnect/");
  return(
    <div className="Service">
      <Navigate replace to="/"/>;
    </div>
  );
}

//////////////////// HOME

async function getAction() {
  var wr = 0
  await axios.get("http://localhost:8080/user/getAction/")
  .then(res => {
    const data = res.data;
    wr = data.action;
  })
  console.log(wr)
  return (wr);
}

function Config() {
  return (
    <div>
      <Navbar/>
      <br/>
        <ConfigWidget api={getAction()}/>
      <br/>
    </div>
  );
}

function Home() {
  return (
    <div>
      <Navbar/>
      <br/>
        <HomeWidget api={getAction()}/>
      <br/>
    </div>
  );
}


//////////////////// ABOUT

async function getAbout() {
  var about = {}
  await axios.get("http://localhost:8080/about.json")
    .then(res => {
      const data = res.data;
      about = data;
  })
  return (about);
}

function About(props) {
  const [about, setAbout] = useState(null);
  props.about.then(data => setAbout(data));
  return (
    <div>
      <pre>
        {JSON.stringify(about, null, 2)}
      </pre>
    </div>
  );
}

export default App;
