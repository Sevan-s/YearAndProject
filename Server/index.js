const express = require('express')
const bodyParser = require('body-parser');
const CheckAction = require('./apiRequest'); 
const DBCommunicate = require('./communicateDB')
var cors = require('cors');
const app = express()
const port = 8080

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

/////////////////////// DATABASE

var isConnected = 0;
var accountID = "";

DBCommunicate.connect()

//////////////////////

/////////////// USER CONNECTION

// username + password + true/false
app.post('/user/connect/', (req, res) => {
  console.log("connect");
  if (req.body.username !== null) {
    DBCommunicate.getUser(req.body.username, function(data) {
      if (data.length == 0)
        console.log("User not found.")
      else if (data[0]['password'] == req.body.password &&
      data[0]["OAUTH"] == req.body.OAUTH) {
        isConnected = 1; // temporary
        accountID = data[0]['id'];
        console.log("Connect user.");
        CheckAction.requestApi(accountID);
        console.log("AFTER")
      } else
        console.log("Can't connect user");
    })
  }
});

// username + password
app.post('/user/create/', (req, res) => {
  if (req.body.username != null && req.body.password !== '')
  DBCommunicate.getUser(req.body.username, function(data) {
    if (data.length != 0)
      console.log("Username already used.")
    else {
      console.log("User create.")
      isConnected = 1 // temporary
      DBCommunicate.addUser(req.body.username, req.body.password, false, function(_, data) {
        accountID = data["generated_keys"][0];
        CheckAction.requestApi(accountID);
      })
    }
  })
});

// username + password
app.post('/user/oauth/', (req, res) => {
  if (req.body.username != null && req.body.password !== '')
  DBCommunicate.getUser(req.body.username, function(data) {
    if (data.length != 0) {
      if (data[0]['password'] == req.body.password &&
      data[0]["OAUTH"] == req.body.OAUTH) {
        isConnected = 1; // temporary
        accountID = data[0]['id'];
        console.log("Connect user.");
        CheckAction.requestApi(accountID);
        console.log("AFTER")
      } else
        console.log("Can't connect user")
    } else {
      console.log("User create.")
      isConnected = 1 // temporary
      DBCommunicate.addUser(req.body.username, req.body.password, true, function(_, data) {
        accountID = data["generated_keys"][0];
        CheckAction.requestApi(accountID);
      })
    }
  })
});

// Doit le modif
app.get('/user/connected/', (req, res) => {
  res.json({"isConnected": isConnected});
  console.log("check->" + String(isConnected));
});


// Doit le modif
app.post('/user/disconnect/', (req, res) => {
  isConnected = 0;
  CheckAction.stopApiProcess(accountID)
  accountID = "";
  console.log("disconnect");
});

//////////////////////

/////////////// ACTION

app.get('/user/getAction/', (req, res) => {
  DBCommunicate.getUserByID(accountID, function(data) {
    if (data != null) {
      //console.log("Action ->");
      //console.log(data['action']);
      res.json({"action": data['action']});
    } else
      res.json({"action": []})
  })
});

// NEED TO MODIFY
app.post('/user/switchAction/', (req, res) => {
  if (typeof req.body.name != 'undefined' ) {
    DBCommunicate.getUserByID(accountID, function(data) {
      data['action'].forEach(element => {
        if (element.name == req.body.name) {
          if (element.activate)
            element.activate = false;
          else
            element.activate = true;
          console.log("Action switch.");
        }
      });
      DBCommunicate.replaceUserByID(accountID, data);
    })
  }
});

// action + reaction
// NEED TO MODIFY
app.post('/user/switchReaction/', (req, res) => {
  if (typeof req.body.reaction != 'undefined' && typeof req.body.action != 'undefined') {
    DBCommunicate.getUserByID(accountID, function(data) {
      data['action'].forEach(element => {
        if (element.name == req.body.action) {
          if (element['reaction'].includes(req.body.reaction))
            element['reaction'].splice(element['reaction'].indexOf(req.body.reaction), 1)
          else
            element['reaction'].push(req.body.reaction)
          console.log("Reaction switch")
        }
      });
      DBCommunicate.replaceUserByID(accountID, data);
    })
  }
});

////////////////////

/////////////// ACCOUNT LINK

app.get('/user/getAccountLink/', (req, res) => {
  console.log("AccountLink ->");
  DBCommunicate.getUserByID(accountID, function(data) {
    console.log(data['account_link']);
    res.json({"account-link": data['account_link']});
  })
});

// token + name
// NEED TO MODIFY

function changeAccountLinkDB(name, token) {
  DBCommunicate.getUserByID(accountID, function(data) {
    data['account_link'].forEach(element => {
      if (element.name == name) {
        element.token = token;
        console.log("Token set.");
      }
    });
    DBCommunicate.replaceUserByID(accountID, data);
  })
}

app.post('/user/setAccountLink/', (req, res) => {
  console.log("stock: " + req.body.token)
  if (typeof req.body.token != 'undefined' && typeof req.body.name != 'undefined' ) {
    if (accountID == '')
      setTimeout(() => {changeAccountLinkDB(req.body.name, req.body.token)}, 1000)
    else
      changeAccountLinkDB(req.body.name, req.body.token)
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