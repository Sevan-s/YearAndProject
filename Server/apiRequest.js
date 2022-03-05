const DBCommunicate = require('./communicateDB')
var axios = require("axios").default;
var YammerAPIClient = require('yammer-rest-api-client');

//////////////////////////////// QUEUE

const APIRequestList = {"test-A": test_A, "new Mail": updateMail, "Horoscope": horoscope, "Meteo": meteo, "Yammer msg reçu": yammerMessageReceived}

const reactionList = {"test-R": test_R, "Mail": mail}

var queue = {}

function stopApiProcess(uid) {
    delete queue[uid];
}

//////////////////////////////////////

//////////////////////// CALL REACTION

function mail(action, params) {
    console("a implementer")
}

function test_R(action, params) {
    console.log(params)
}

function callReaction(name, uid, params) {
    DBCommunicate.getUserByID(uid, function(data) {
        data['action'].forEach(element => {
            if (element.name == name) {
                element["reaction"].forEach(reaction => {
                    reactionList[reaction](name, params);
                })
            }
        });
    })
}

//////////////////////////////////////

///////////////////////////// CALL API

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateMail(uid, data, pos) {
    DBCommunicate.getUserByID(uid, function(data) {
        GoogleToken = ""
        data["account_link"].forEach(element => {
            if (element.name == "Google")
                GoogleToken = element.token
        });
        var options = { method: 'GET',
            headers: { 'Authorization': `Bearer ${GoogleToken}` },
            mode: 'cors',
            cache: 'default',
            url: 'https://www.googleapis.com/gmail/v1/users/me/history'
        };

        axios.request(options).then(function (response) {
            data = response.json()
            if (data["action"][pos]["last_res"].id == data.historyId) {
                callReaction("new Mail", uid, data);
                data["action"][pos]["last_res"] = {"id": data}
                DBCommunicate.replaceUserByID(uid, data);
            }
        }).catch(function (error) {
            console.error("ERROR: MAIL");
            console.error(error)
        });
    })
}

function yammerMessageReceived(uid, data, pos) {
    DBCommunicate.getUserByID(uid, function(data) {
        MicrosoftToken = ""
        data["account_link"].forEach(element => {
            if (element.name == "Microsoft")
            MicrosoftToken = element.token
        });
        var options = { method: 'GET',
            headers: { 'Authorization': `Bearer ${MicrosoftToken}` },
            mode: 'cors',
            cache: 'default',
            url: 'https://www.googleapis.com/gmail/v1/users/me/history'
        };
        client = new YammerAPIClient({ token: {MicrosoftToken} });
        client.messages.received({limit: 10, reverse: true }, function(error, data) {
            if(error)
                console.log("There was an error retrieving the data");
            else {
                console.log("** Data was retrieved **");
                callReaction("Yammer msg reçu", uid, data);
            }
        })
    });
}

function meteo(uid, data, pos) {
    const date = new Date();
    if (data["action"][pos]["last_res"] == {} || data["action"][pos]["last_res"]['date'] != date.getDate()) {
    
        var axios = require("axios").default;

        var options = {
            method: 'GET',
            url: 'https://community-open-weather-map.p.rapidapi.com/forecast',
            params: {q: 'toulouse,fr', lang: 'fr'},
            headers: {
                'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                'x-rapidapi-key': '7bcf4947femshfb0ea70e3cceafdp170df7jsncd0f411563e1'
            }
        };

        axios.request(options).then(function (response) {
            callReaction("Meteo", uid, response.data);
            data["action"][pos]["last_res"] = {"date": date.getDate()}
            DBCommunicate.replaceUserByID(uid, data);
        }).catch(function (error) {
            console.error("ERROR: WEATHER");
        });
    }
}

function horoscope(uid, data, pos) {
    const date = new Date();
    if (data["action"][pos]["last_res"] == {} || data["action"][pos]["last_res"]['date'] != date.getDate()) {
        var options = {
            method: 'POST',
            url: 'https://sameer-kumar-aztro-v1.p.rapidapi.com/',
            params: {sign: 'capricorn', day: 'today'},
            headers: {
                'x-rapidapi-host': 'sameer-kumar-aztro-v1.p.rapidapi.com',
                'x-rapidapi-key': '7bcf4947femshfb0ea70e3cceafdp170df7jsncd0f411563e1'
            }
        };

        axios.request(options).then(function (response) {
            callReaction("Horoscope", uid, response.data);
            data["action"][pos]["last_res"] = {"date": date.getDate()}
            DBCommunicate.replaceUserByID(uid, data);
        }).catch(function (_) {
            console.error("ERROR: HOROSCOPE");
        });
    }
}

function test_A(uid, _, _) {
    console.log("TEST API");
    callReaction("test-A", uid, "Response!");
}

//////////////////////////////////////

/////////////////////////// LAUNCH API

async function requestApi(uid) {
    console.log("start API");
    var pos = 0;
    if (!queue[uid])
    queue[uid] = [];
    while (queue[uid]) {
        DBCommunicate.getUserByID(uid, function(data) {
            const lim = data["action"].length
            if (pos == lim)
                pos = 0
            while (pos != lim) {
                if (data["action"][pos]["activate"] == true) {
                    apiName = data["action"][pos]["name"]
                    APIRequestList[apiName](uid, data, pos);
                }
                pos += 1
            }
        })
        await sleep(5000);
    }
    console.log("stop API")
}

//////////////////////////////////////

module.exports = {requestApi, stopApiProcess};