const express = require('express')
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express()
const port = 8080
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data/user.json', 'utf8'))

var isConnected = 0;
var kitsuToken = null
var dictUser = null;
var JsonPos = -1;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

function saveJson(){
  fs.writeFileSync("data/user.json", JSON.stringify(data, null, 2), (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
    }
  });
}

function findUserDict(uid) {
  dictUser = {"uid": "", "kitsuToken": "", "widget": [0, 0, 0, 0, 0, 0]};
  x = 0
  data.forEach(element => {
    if (element.uid == uid) {
      JsonPos = x;
      dictUser = element;
    }
    x += 1
  })
  if (JsonPos == -1) {
    JsonPos = x;
    dictUser["uid"] = uid;
    data.push(dictUser);
  }
  if (dictUser["kitsuToken"] != "")
    kitsuToken = dictUser["kitsuToken"];
}

app.post('/user/connect/', (req, res) => {
  isConnected = 1;
  console.log("connect");
  if (req.body.user !== null) {
    findUserDict(req.body.user.uid);
  } else {
    findUserDict("");
    console.log("Receive no user from firebase");
  }
  console.log(dictUser);
});

app.get('/user/connected/', (req, res) => {
  res.json({"isConnected": isConnected});
  console.log("check->" + String(isConnected));
});

app.get('/user/widget/', (req, res) => {
  console.log("Widget ->");
  console.log(dictUser['widget']);
  res.json({"widget": dictUser['widget']});
});


app.post('/user/disconnect/', (req, res) => {
  isConnected = 0;
  kitsuToken = null;
  if (req.body != null && dictUser != null) {
    dictUser['widget'] = req.body.widget;
    saveJson();
  }
  console.log("disconnect");
});


/////////////// ABOUT

function getIp(req) {
  var clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  if (clientIp == "::1")
    clientIp = "127.0.0.1";
  return (clientIp);
}

function getService() {
  var services = [
    {
      "name": "Manga",
      "widgets": [
        {
          "name": "Tendency",
          "description": "Display a ranking of anime or manga",
          "params": [{
            "name": "manga",
            "type": "bool"
          },
          {
            "name": "anime",
            "type": "bool"
          }]
        },
        {
          "name": "Manga",
          "description": "Display caracteristics of a manga",
          "params": [{
            "name": "manga",
            "type": "string"
          }]
        }
      ]
    },
    {
      "name": "Traduction",
      "widgets": [{
          "name": "kanji_to_english",
          "description": "Traduct kanji to english",
          "params": [{
            "name": "kanji",
            "type": "string"
          }]
        },
        {
          "name": "english_to_kanji",
          "description": "Traduct english word to japanese",
          "params": [{
            "name": "word",
            "type": "string"
          }]
        }
      ]},
    {
      "name": "Youtube",
      "widgets": [{
          "name": "youtube_video",
          "description": "search video on youtube",
          "params": [{
            "name": "video",
            "type": "string"
          }]
        },
        {
          "name": "channel_stats",
          "description": "show the stats of a youtube channel",
          "params": [{
            "name": "url",
            "type": "string"
          }]
        }
      ]
    }
  ]
  return (services);
}

app.get('/about.json', (req, res) => {
  const date = Date.now();
  res.json({"client" : {"ip": getIp(req)}, "server": {"current_time": date, "services": getService()}});
});

/////////////////////

app.post('/kitsu/setToken/', (req, res) => {
  console.log("stock: " + req.body.token)
  if (typeof req.body.token != 'undefined') {
    kitsuToken = req.body.token;
    console.log(kitsuToken)
    dictUser["kitsuToken"] = kitsuToken
  }
});

app.get('/kitsu/getToken/', (req, res) => {
  res.json({"kitsuToken": kitsuToken});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})