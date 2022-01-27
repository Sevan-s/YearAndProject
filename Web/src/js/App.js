import {Auth} from './Auth.js'
import '../css/App.css';
import '../css/workspace.css';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Navbar from "./NavBar"
import React, { useState, useEffect, Suspense} from 'react';
import axios from 'axios';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/disconnect" element={<Disconnect/>} />
        <Route path="/about.json" element={<About/>} />
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

//////////////////// DISCONNECT

var widget = [0, 0, 0, 0, 0, 0]

function Disconnect() {
  axios.post("http://localhost:8080/user/disconnect/", {"widget": widget});
  return(
    <div className="Service">
      <Navigate replace to="/"/>;
    </div>
  );
}

//////////////////// HOME

// async function getWidget() {
//   var wr = 0
//   await axios.get("http://localhost:8080/user/widget/")
//   .then(res => {
//     const data = res.data;
//     wr = data.widget;
//   })
//   console.log("test")
//   console.log(wr)
//   return (wr);
// }

function Home() {

  return (
    <div>
      <Navbar/>
      <br/>
        <div className="serviceWrapper" id="widgetParent">
          <div className="widget">
            <div className="widgetHeader">
              <h3>Add Widgets</h3>
            </div>
            <div className="widgetContent">
              <br/>
            </div>
          </div>
        </div>
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

function About() {
  const [about, setAbout] = useState(null);
  getAbout().then(data => setAbout(data));
  return (
    <div>
      <pre>
        {JSON.stringify(about, null, 2)}
      </pre>
    </div>
  );
}

export default App;
