const DBCommunicate = require('./communicateDB')
var axios = require("axios").default;
var nodemailer = require('nodemailer');
const { Client, Intents } = require('discord.js');

//////////////////////////////// QUEUE

const APIRequestList = { "Debug": test_A, "new Mail": updateMail, "Horoscope": horoscope, "Meteo": meteo, "Calendar": getCalendar, "Crypto": crypto, "Covid": GetCovidFrenchStat, "KhabyLameStory": GetKhabyLameStory, "WolrdNewsFr": WolrdNewsFr, "TheBestJoke": TheBestJoke, "GameNews": GameNews, "TopNetflix": TopNetflix}

const reactionList = { "Debug": test_R, "Mail": mail, "Message": message }

var queue = {}

//const client = new Client({ intents: [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES] })

function stopApiProcess(uid) {
    delete queue[uid];
}

//////////////////////////////////////

//////////////////////// CALL REACTION

function test_R(action, uid, params) {
    console.log(params)
}

function callReaction(name, uid, params) {
    DBCommunicate.getUserByID(uid, function (data) {
        data['action'].forEach(element => {
            if (element.name == name) {
                element["reaction"].forEach(reaction => {
                    reactionList[reaction](name, uid, params);
                })
            }
        });
    })
}

function message(action, uid, params) {
    DBCommunicate.getUserByID(uid, function (data) {
        var GoogleToken = ""
        data["account_link"].forEach(element => {
            if (element.name == "Google")
                GoogleToken = element.token
        });
        const options = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${GoogleToken}` },
            mode: 'cors',
            cache: 'default',
            url: 'https://people.googleapis.com/v1/people/me?personFields=phoneNumbers'
        };

        axios.request(options).then(function (response) {
            var axios = require("axios").default;

            var options = {
                method: 'POST',
                url: 'https://smsapi-com3.p.rapidapi.com/sms.do',
                params: {
                    access_token: 'QllmSB9NHcOZRvwlkV98cjEdLMxEQxbv4FXdEpy7',

                },
                headers: {
                    'x-rapidapi-host': 'smsapi-com3.p.rapidapi.com',
                    'x-rapidapi-key': '7bcf4947femshfb0ea70e3cceafdp170df7jsncd0f411563e1'
                },
                body: {
                    "to": response.data.phoneNumbers[0].canonicalForm,
                    "message": params,
                    "from": "",
                    "normalize": "",
                    "group": "",
                    "encoding": "",
                    "flash": "",
                    "test": "",
                    "details": "",
                    "date": "",
                    "date_validate": "",
                    "time_restriction": "follow",
                    "allow_duplicates": "",
                    "idx": "",
                    "check_idx": "",
                    "max_parts": "",
                    "fast": "",
                    "notify_url": "",
                    "format": "json"
                }
            };
            axios.request(options).then(function (response) {
                console.log(response.data);
            }).catch(function (error) {
                console.error(error);
                console.log("ERROR: MESSAGE")
            });
        }).catch(function (error) {
            console.error("ERROR: MESSAGE-NUMBER");
            console.error(error)
        });
    })
}

function mail(action, uid, params) {
    DBCommunicate.getUserByID(uid, function (data) {
        var GoogleToken = ""
        data["account_link"].forEach(element => {
            if (element.name == "Google")
                GoogleToken = element.token
        });
        const options = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${GoogleToken}` },
            mode: 'cors',
            cache: 'default',
            url: 'https://www.googleapis.com/oauth2/v1/userinfo'
        };

        axios.request(options).then(function (response) {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'dws.area1@gmail.com',
                    pass: 'DWS.area1'
                }
            });

            var mailOptions = {
                from: 'dws.area1@gmail.com',
                to: response.data.email,
                subject: "DWS: " + action,
                text: params
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }).catch(function (error) {
            console.error("ERROR: MAIL");
            console.error(error)
        });
    })
}

// function discordMessage(action, uid, params) {
//     client.on('ready', () => {
//         conslotchange.log('Client discord start')
//     })
//     client.login('sOTQ4NjAxNjI5MDU2MzE1NDIz.Yh-MHA.BwAPi17cPnQo5xbfYKFbCAQ1lCE')
//     client.send('message', message => {
//         message.author.send()
//     })
// }


//////////////////////////////////////

///////////////////////////// CALL API

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}




function updateMail(uid, data, pos) {
    DBCommunicate.getUserByID(uid, function (data) {
        GoogleToken = ""
        data["account_link"].forEach(element => {
            if (element.name == "Google")
                GoogleToken = element.token
        });
        var options = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${GoogleToken}` },
            mode: 'cors',
            cache: 'default',
            url: 'https://gmail.googleapis.com/gmail/v1/users/me/profile'
        };

        axios.request(options).then(function (response) {
            if (data["action"][pos]["last_res"].total == -1) {
                data["action"][pos]["last_res"].total = response.data.messagesTotal
                DBCommunicate.replaceUserByID(uid, data);
            } else if (data["action"][pos]["last_res"].total != response.data.messagesTotal) {
                callReaction("new Mail", uid, "New mail");
                data["action"][pos]["last_res"] = { "total": response.data.messagesTotal }
                DBCommunicate.replaceUserByID(uid, data);
            } else {
                console.log(response.data.messagesTotal)
            }
        }).catch(function (error) {
            console.error("ERROR: MAIL");
            console.error(error)
        });
    })
}


function getCalendar(uid, data, pos) {
    DBCommunicate.getUserByID(uid, function (data) {
        GoogleToken = ""
        data["account_link"].forEach(element => {
            if (element.name == "Google")
                GoogleToken = element.token
        });
        var options = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${GoogleToken}` },
            mode: 'cors',
            cache: 'default',
            url: 'https://www.googleapis.com/calendar/v3/calendars/primary/events'
        };

        axios.request(options).then(function (response) {
            const d = new Date()
            var lr = data["action"][pos]["last_res"]
            console.log(lr)
            response.data.items.forEach(items => {
                if (!lr.crdate.includes(items.created)) {
                    var dv = new Date(items.start.dateTime)
                    const diffTime = Math.ceil(Math.abs(dv - d) / (1000 * 60));
                    if (diffTime <= 30) {
                        callReaction("Calendar", uid, items.summary)
                    }
                    lr.crdate.push(items.created)
                    DBCommunicate.replaceUserByID(uid, data);
                }
            })
            data["action"][pos]["last_res"] = lr
        }).catch(function (error) {
            console.error("ERROR: CALENDAR");
            console.error(error)
        });
    })
}

function meteo(uid, data, pos) {
    const date = new Date();
    if (data["action"][pos]["last_res"]['date'] != date.getDate()) {

        var axios = require("axios").default;

        var options = {
            method: 'GET',
            url: 'https://community-open-weather-map.p.rapidapi.com/forecast',
            params: { q: 'toulouse,fr', lang: 'fr' },
            headers: {
                'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                'x-rapidapi-key': '7bcf4947femshfb0ea70e3cceafdp170df7jsncd0f411563e1'
            }
        };

        axios.request(options).then(function (response) {
            callReaction("Meteo", uid, JSON.stringify(response.data, null, 2));
            data["action"][pos]["last_res"] = { "date": date.getDate() }
            DBCommunicate.replaceUserByID(uid, data);
        }).catch(function (error) {
            console.error("ERROR: WEATHER");
        });
    }
}

function crypto(uid, data, pos) {
    const date = new Date();
    if (data["action"][pos]["last_res"]['date'] != date.getHours()) {
        var options = {
            method: 'GET',
            url: 'https://api.coingecko.com/api/v3/coins/bitcoin',
            headers: {
                'accept': 'application/json'
            }
        };

        axios.request(options).then(function (response) {
            callReaction("Crypto", uid, response.data.market_data.current_price.eur + "€");
            data["action"][pos]["last_res"] = { "date": date.getHours() }
            DBCommunicate.replaceUserByID(uid, data);
        }).catch(function (_) {
            console.error("ERROR: HOROSCOPE");
        });
    }
}

function GetCovidFrenchStat(uid, data, pos) {
    const date = new Date();
    if (data["action"][pos]["last_res"]['date'] != date.getDate()) {
        const options = {
            method: 'GET',
            url: 'https://covid-19-tracking.p.rapidapi.com/v1/France',
            headers: {
                'x-rapidapi-host': 'covid-19-tracking.p.rapidapi.com',
                'x-rapidapi-key': 'e83d6e0947mshfeed2b2d169563bp185860jsn3ea78bab8c7b'
            }
        };

        axios.request(options).then(function (response) {
            callReaction("Covid", uid, JSON.stringify(response.data, null, 2));
            data["action"][pos]["last_res"] = { "date": date.getDate() }
            DBCommunicate.replaceUserByID(uid, data);
        }).catch(function () {
            console.error("ERROR: CovidInfo");
        });
    }
}

function GetKhabyLameStory(uid, data, pos) {
    const date = new Date();
    var axios = require("axios").default;
    var options = {
        method: 'GET',
        url: 'https://instagram-stories1.p.rapidapi.com/v2/user_stories',
        params: { userid: '779085683' },
        headers: {
            'x-rapidapi-host': 'instagram-stories1.p.rapidapi.com',
            'x-rapidapi-key': 'e83d6e0947mshfeed2b2d169563bp185860jsn3ea78bab8c7b'
        }
    };

    axios.request(options).then(function (response) {
        callReaction("KhabyLameStory", uid, JSON.stringify(response.data, null, 2));
        data["action"][pos]["last_res"] = { "date": date.getDate() }
        DBCommunicate.replaceUserByID(uid, data);
    }).catch(function () {
        console.error("ERROR: KhabyLameStory");
    });
}


function horoscope(uid, data, pos) {
    const date = new Date();
    if (data["action"][pos]["last_res"]['date'] != date.getDate()) {
        var options = {
            method: 'POST',
            url: 'https://sameer-kumar-aztro-v1.p.rapidapi.com/',
            params: { sign: 'capricorn', day: 'today' },
            headers: {
                'x-rapidapi-host': 'sameer-kumar-aztro-v1.p.rapidapi.com',
                'x-rapidapi-key': '7bcf4947femshfb0ea70e3cceafdp170df7jsncd0f411563e1'
            }
        };

        axios.request(options).then(function (response) {
            callReaction("Horoscope", uid, JSON.stringify(response.data, null, 2));
            data["action"][pos]["last_res"] = { "date": date.getDate() }
            DBCommunicate.replaceUserByID(uid, data);
        }).catch(function (_) {
            console.error("ERROR: HOROSCOPE");
        });
    }
}

function WolrdNewsFr(uid, data, pos) {
    const date = new Date();
    if (data["action"][pos]["last_res"]['date'] != date.getDate()) {
        const options = {
            method: 'GET',
            url: 'https://google-news1.p.rapidapi.com/top-headlines',
            params: { country: 'France', lang: 'fr', limit: '50' },
            headers: {
                'x-rapidapi-host': 'google-news1.p.rapidapi.com',
                'x-rapidapi-key': 'e83d6e0947mshfeed2b2d169563bp185860jsn3ea78bab8c7b'
            }
        };

        axios.request(options).then(function (response) {
            callReaction("WolrdNewsFr", uid, JSON.stringify(response.data, null, 2));
            data["action"][pos]["last_res"] = { "date": date.getDate() }
            DBCommunicate.replaceUserByID(uid, data);
        }).catch(function () {
            console.error("ERROR: WNfr");
        });
    }
}

function TheBestJoke(uid, data, pos) {
    const date = new Date();
    if (data["action"][pos]["last_res"]['date'] != date.getDate()) {
        const options = {
            method: 'GET',
            url: 'https://jokeapi-v2.p.rapidapi.com/joke/Any',
            params: {
                format: 'json',
                contains: 'C%23',
                idRange: '0-150',
                blacklistFlags: 'nsfw,racist'
            },
            headers: {
                'x-rapidapi-host': 'jokeapi-v2.p.rapidapi.com',
                'x-rapidapi-key': 'e83d6e0947mshfeed2b2d169563bp185860jsn3ea78bab8c7b'
            }
        };

        axios.request(options).then(function (response) {
            callReaction("TheBestJoke", uid, JSON.stringify(response.data, null, 2));
            data["action"][pos]["last_res"] = { "date": date.getDate() }
            DBCommunicate.replaceUserByID(uid, data);
        }).catch(function () {
            console.error("ERROR: TBJ");
        });
    }
}

function GameNews(uid, data, pos) {
    const date = new Date();
    if (data["action"][pos]["last_res"]['date'] != date.getDate()) {
        const options = {
            method: 'GET',
            url: 'https://videogames-news2.p.rapidapi.com/videogames_news/recent',
            headers: {
                'x-rapidapi-host': 'videogames-news2.p.rapidapi.com',
                'x-rapidapi-key': 'e83d6e0947mshfeed2b2d169563bp185860jsn3ea78bab8c7b'
            }
        };

        axios.request(options).then(function (response) {
            callReaction("GameNews", uid, JSON.stringify(response.data, null, 2));
            data["action"][pos]["last_res"] = { "date": date.getDate() }
            DBCommunicate.replaceUserByID(uid, data);
        }).catch(function () {
            console.error("Error GameNews");
        });
    }
}

function TopNetflix(uid, data, pos) {
    const date = new Date();

    if (data["action"][pos]["last_res"]['date'] != date.getDate()) {
        const options = {
            method: 'GET',
            url: 'https://netflix-weekly-top-10.p.rapidapi.com/api/othermovie',
            headers: {
                'x-rapidapi-host': 'netflix-weekly-top-10.p.rapidapi.com',
                'x-rapidapi-key': 'e83d6e0947mshfeed2b2d169563bp185860jsn3ea78bab8c7b'
            }
        };

        axios.request(options).then(function (response) {
            callReaction("TopNetflix", uid, JSON.stringify(response.data, null, 2));
            data["action"][pos]["last_res"] = { "date": date.getDate() }
            DBCommunicate.replaceUserByID(uid, data);
        }).catch(function () {
            console.error("Error Netflix");
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
        DBCommunicate.getUserByID(uid, function (data) {
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

module.exports = { requestApi, stopApiProcess };