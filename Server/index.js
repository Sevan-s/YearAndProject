const express = require('express')
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express()
const port = 8080
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data/user.json', 'utf8'))

var isConnected = 0;
var dictUser = null;
var JsonPos = -1;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

function saveJson(){
  console.log(data);
  data[JsonPos] = dictUser;
  fs.writeFileSync("data/user.json", JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.log("File not written successfully\n");
      console.log(err);
    } else {
      console.log("File written successfully\n");
    }
  });
}


/////////////// USER CONNECTION

function newUserAction() {
  return [
    {
      "name": "Drink Water",
      "activate": false
    }
  ]
}

function newAccountLink() {
  return [
    {
      "name": "Google",
      "token": ""
    }
  ]
}

function findUserDict(username) {
  dictUser = {"username": "", "password": "", "account-link": newAccountLink(), "action": newUserAction(), "OAUTH": false};
  x = 0
  data.forEach(element => {
    if (element.username == username) {
      JsonPos = x;
      dictUser = element;
    }
    x += 1
  })
}

// username + password + true/false
app.post('/user/connect/', (req, res) => {
  console.log("connect");
  if (req.body.user !== null) {
    findUserDict(req.body.username);
    if (JsonPos == -1) {
      console.log("User not found.");
    } else if (req.body.password == dictUser["password"] &&
    dictUser["OAUTH"] == req.body.OAUTH) {
      isConnected = 1;
      console.log("Connect user.");
      console.log(dictUser);
    } else {
      console.log("Can't connect user");
    }
  }
});

// username + password
app.post('/user/create/', (req, res) => {
  console.log(req.body)
  if (req.body.username !== null) {
    findUserDict(req.body.username);
    if (dictUser["username"] == "") {
      isConnected = 1;
      dictUser["username"] = req.body.username;
      dictUser["password"] = req.body.password;
      dictUser["OAUTH"] = req.body.OAUTH;
      console.log("create");
      console.log(dictUser);
      data.push(dictUser);
      JsonPos = data.length - 1
    } else {
      console.log("Account already taken.");
    }
  }
});

// username + password
app.post('/user/oauth/', (req, res) => {
  console.log(req.body)
  if (req.body.username !== null) {
    findUserDict(req.body.username);
    if (dictUser["username"] == "") {
      isConnected = 1;
      dictUser["username"] = req.body.username;
      dictUser["password"] = req.body.password;
      dictUser["OAUTH"] = req.body.OAUTH;
      console.log("create");
      console.log(dictUser);
      data.push(dictUser);
      JsonPos = data.length - 1
    } else if (req.body.password == dictUser["password"]) {
      isConnected = 1;
      console.log("connect");
    }
  }
});

app.get('/user/connected/', (req, res) => {
  res.json({"isConnected": isConnected});
  console.log("check->" + String(isConnected));
});

app.post('/user/disconnect/', (req, res) => {
  isConnected = 0;
  if (req.body != null && dictUser != null) {
    console.log("SAVE");
    saveJson();
  }
  console.log("disconnect");
});

////////////////////

/////////////// ACTION

app.get('/user/getAction/', (req, res) => {
  console.log("Action ->");
  console.log(dictUser['action']);
  res.json({"action": dictUser['action']});
});

app.post('/user/switchAction/', (req, res) => {
  passed = false
  if (typeof req.body.token != 'undefined' && typeof req.body.name != 'undefined' ) {
    dictUser["action"].forEach(element => {
      if (element.name == req.body.name) {
        passed = true;
        if (element.activate == false)
          element.activate = true;
        else
          element.activate = false;
      }
      x += 1
    })
    if (passed == true)
      console.log("Action switch.");
    else
      console.log("Action not found.")
  }
});

////////////////////

/////////////// ACCOUNT LINK

app.get('/user/getAccountLink/', (req, res) => {
  console.log("AccountLink ->");
  console.log(dictUser['account-link']);
  res.json({"account-link": dictUser['account-link']});
});

// token + name
app.post('/user/setAccountLink/', (req, res) => {
  console.log("stock: " + req.body.token)
  passed = false
  if (typeof req.body.token != 'undefined' && typeof req.body.name != 'undefined' ) {
    dictUser["account-link"].forEach(element => {
      if (element.name == req.body.name) {
        passed = true;
        element.token = req.body.token;
      }
      x += 1
    })
    if (passed == true)
      console.log("Token set.");
    else
      console.log("Account Type not found.")
  }
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})