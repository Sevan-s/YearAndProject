import {Auth, signOutFirebase} from './Auth.js'
import '../css/App.css';
import '../css/workspace.css';
import close from '../img/close.png'
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Navbar from "./NavBar"
import YoutubeWidget from './Service/Youtube/YoutubeWidget.js';
import ChannelStats from './Service/Youtube/ChannelStats.js';
import React, { useState, useEffect, Suspense} from 'react';
import TradEng from './Service/Traduction/TradEng.js';
import TradKanji from './Service/Traduction/TradKanji.js';
import axios from 'axios';
import ApiKitsu from './Service/Kitsu/ApiKitsu.js';
import MangaWidget from './Service/Kitsu/MangaWidget.js';
import TendencyWidget from './Service/Kitsu/TendencyWidget.js';

const YoutubeWidgetDyn = React.lazy(() => import("./Service/Youtube/YoutubeWidget.js"));
const ChannelStatsDyn = React.lazy(() => import("./Service/Youtube/ChannelStats.js"));
const TradEngDyn = React.lazy(() => import("./Service/Traduction/TradEng.js"));
const TradKanjiDyn = React.lazy(() => import("./Service/Traduction/TradKanji.js"));
const TendencyDyn = React.lazy(() => import("./Service/Kitsu/TendencyWidget.js"));
const MangaDyn = React.lazy(() => import("./Service/Kitsu/MangaWidget.js"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/Service1" element={<ServiceYoutube/>} />
        <Route path="/Service2" element={<ServiceManga/>} />
        <Route path="/Service3" element={<ServiceTraduction/>} />
        <Route path="/disconnect" element={<Disconnect/>} />
        <Route path="/Kitsu/login" element={<ConnectionKitsu/>} />
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
  signOutFirebase();
  return(
    <div className="Service">
      <Navigate replace to="/"/>;
    </div>
  );
}

//////////////////// HOME

async function getWidget() {
  var wr = 0
  await axios.get("http://localhost:8080/user/widget/")
  .then(res => {
    const data = res.data;
    wr = data.widget;
  })
  console.log("test")
  console.log(wr)
  return (wr);
}

function Home() {

  const [loadYoutubeWidgetDyn, setLoadYoutubeWidgetDyn] = React.useState(widget[0]);
  const [loadChannelStatsDyn, setLoadChannelStatsDyn] = React.useState(widget[1]);
  const [loadTradEngDyn, setLoadTradEngDyn] = React.useState(widget[2]);
  const [loadTradKanjiDyn, setLoadTradKanjiDyn] = React.useState(widget[3]);
  const [loadTendencyDyn, setLoadTendencyDyn] = React.useState(widget[4]);
  const [loadMangaDyn, setLoadMangaDyn] = React.useState(widget[5]);
  useEffect(() => {
    getWidget().then(data => {
      console.log("Data-> " + data);
      widget = data;
      setLoadYoutubeWidgetDyn(data[0]);
      setLoadChannelStatsDyn(data[1]);
      setLoadTradEngDyn(data[2]);
      setLoadTradKanjiDyn(data[3]);
      setLoadTendencyDyn(data[4]);
      setLoadMangaDyn(data[5]);
    })
  }, []);

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
              <button className="button" onClick={() => {setLoadYoutubeWidgetDyn(1); widget[0] = 1}}>Youtube Video</button>
              <button className="button" onClick={() => {setLoadChannelStatsDyn(1); widget[1] = 1}}>Channel Stats</button>
              <button className="button" onClick={() => {setLoadTradEngDyn(1); widget[2] = 1}}>Traduction English</button>
              <button className="button" onClick={() => {setLoadTradKanjiDyn(1); widget[3] = 1}}>traduction Kanji</button>
              <button className="button" onClick={() => {setLoadTendencyDyn(1); widget[4] = 1}}>Tendency</button>
              <button className="button" onClick={() => {setLoadMangaDyn(1); widget[5] = 1}}>Manga</button>
            </div>
          </div>

          {loadYoutubeWidgetDyn ? (
          <Suspense fallback={<div>Loading Component....</div>}>
            <div className="widget">
              <div className="widgetHeader">
                <h3>Youtube Video</h3>
                <img src={close} alt="" onClick={() => {setLoadYoutubeWidgetDyn(0); widget[0] = 0}}/>
              </div>
            <YoutubeWidgetDyn />
            </div>
            </Suspense>) : null}

          {loadChannelStatsDyn ? (
          <Suspense fallback={<div>Loading Component....</div>}>
            <div className="widget">
              <div className="widgetHeader">
                <h3>Channel Stats</h3>
                <img src={close} alt="" onClick={() => {setLoadChannelStatsDyn(0); widget[1] = 0}}/>
              </div>
            <ChannelStatsDyn />
          </div>
          </Suspense>
          ) : null}

          {loadTradEngDyn ? (
          <Suspense fallback={<div>Loading Component....</div>}>
            <div className="widget">
              <div className="widgetHeader">
                <h3>Traduction English</h3>
                <img src={close} alt="" onClick={() => {setLoadTradEngDyn(0); widget[2] = 0}}/>
              </div>
            <TradEngDyn />
          </div>
          </Suspense>
          ) : null}

          {loadTradKanjiDyn ? (
          <Suspense fallback={<div>Loading Component....</div>}>
            <div className="widget">
              <div className="widgetHeader">
                <h3>Traduction Kanji</h3>
                <img src={close} alt="" onClick={() => {setLoadTradKanjiDyn(0); widget[3] = 0}}/>
              </div>
            <TradKanjiDyn />
          </div>
          </Suspense>
          ) : null}

          {loadTendencyDyn ? (
          <Suspense fallback={<div>Loading Component....</div>}>
            <div className="widget">
              <div className="widgetHeader">
                <h3>Tendency</h3>
                <img src={close} alt="" onClick={() => {setLoadTendencyDyn(0); widget[4] = 0}}/>
              </div>
            <TendencyDyn token={getToken()}/>
          </div>
          </Suspense>
            ) : null}

          {loadMangaDyn ? (
          <Suspense fallback={<div>Loading Component....</div>}>
            <div className="widget">
              <div className="widgetHeader">
                <h3>Manga</h3>
                <img src={close} alt="" onClick={() => {setLoadMangaDyn(0); widget[5] = 0}}/>
              </div>
            <MangaDyn token={getToken()}/>
          </div>
          </Suspense>
          ) : null}
        </div>
      <br/>
    </div>
  );
}

//////////////////// YOUTUBE

function ServiceYoutube() {
  return (
    <div className="Service">
      <Navbar/>
      <br/>
      <div className="serviceWrapper">
        <div className="widget">
          <div className="widgetHeader">
            <h3>Youtube Video</h3>
          </div>
          <YoutubeWidget/>
        </div>
        <div className="widget">
          <div className="widgetHeader">
            <h3>Channel Stats</h3>
          </div>
          <ChannelStats/>
        </div>
      </div>
    </div>
  );
}

/////////////////// TRADUCTION

function ServiceTraduction() {
  return (
    <div className="Service">
      <Navbar/>
      <br/>
      <div className="serviceWrapper">
        <div className="widget">
          <div className="widgetHeader">
            <h3>English to Kanji</h3>
          </div>
          <TradEng/>
        </div>
        <div className="widget">
          <div className="widgetHeader">
            <h3>Kanji to English</h3>
          </div>
          <TradKanji/>
        </div>
      </div>
    </div>
  );
}

//////////////////// MANGA

async function getToken() {
  var token = 0
  await axios.get("http://localhost:8080/kitsu/getToken/")
    .then(res => {
      const data = res.data;
      token = data.kitsuToken;
    })
  return (token);
}

function ServiceManga() {
  return (
    <div className="Service">
      <Navbar/>
      <br/>
      <div className="serviceWrapper">
        <div className="widget">
          <div className="widgetHeader">
            <h3>Tendency</h3>
          </div>
          <TendencyWidget token={getToken()}/>
        </div>
        <div className="widget">
          <div className="widgetHeader">
            <h3>Manga</h3>
          </div>
          <MangaWidget token={getToken()}/>
        </div>
      </div>
    </div>
  );
}

function ConnectionKitsu() {
  return (
    <div className="Service">
      <Navbar/>
      <center>
        <h1>Manga Service</h1>
        <h2>Please login with your kitsu account !</h2>
      </center>
      <ApiKitsu/>
    </div>
  )
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
