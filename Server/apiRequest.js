const DBCommunicate = require('./communicateDB')

//////////////////////////////// QUEUE

const APIRequestList = {"test-A": test_A, "new Mail": updateMail}

const reactionList = {"test-R": test_R}

var queue = {}

function stopApiProcess(uid) {
    delete queue[uid];
}

//////////////////////////////////////

//////////////////////// CALL REACTION 

function test_R() {
    console.log("TEST REACTION")
}

function callReaction(name, uid) {
    DBCommunicate.getUserByID(uid, function(data) {
        data['action'].forEach(element => {
            if (element.name == name) {
                element["reaction"].forEach(reaction => {
                    reactionList[reaction]();
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

async function updateMail(uid) {
    DBCommunicate.getUserByID(uid, function(data) {
        GoogleToken = ""
        data["account_link"].forEach(element => {
            if (element.name == "Google")
                GoogleToken = element.token
        });
        console.log("GoogleToken")
        /*var myInit = { method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GoogleToken}` },
        mode: 'cors',
        cache: 'default' };

        var myRequest = new Request(`https://www.googleapis.com/gmail/v1/users/me/watch`, myInit);
        fetch(myRequest,myInit)
        .then((data) => data.json())
        .then((result) => {
        console.log(result)
        }).catch(console.error)*/
    })
    await sleep(1000)
}

async function test_A(uid) {
    console.log("TEST API");
    await sleep(1000);
    callReaction("test-A", uid);
}

//////////////////////////////////////

/////////////////////////// LAUNCH API

/*
function getNextAPIAvailable(uid, pos) {
    if (pos == -1)
        pos = 0
    var res = -1
    var apiName = ""
    console.log("Start search")
    DBCommunicate.getUserByID(uid, function(data) {
        const lim = data["action"].length
        while (pos != lim) {
            console.log(data["action"][pos])
            if (data["action"][pos]["activate"] == true) {
                res = pos
                apiName = data["action"][pos]["name"]
                return
            }
            pos += 1
        }
    })
    return {"pos": res, "apiName": apiName}
}*/

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
                    APIRequestList[apiName](uid);
                }
                pos += 1
            }
        })
        await sleep(1000);
    }
    console.log("stop API")
}

//////////////////////////////////////

module.exports = {requestApi, stopApiProcess};