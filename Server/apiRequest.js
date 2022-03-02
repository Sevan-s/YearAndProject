
//////////////////////////////// QUEUE

const APIRequestList = {"test-A": test_A}

const reactionList = {"test-R": test_R}

var queue = {}

function stopApiProcess(uid) {
    delete queue[uid];
}

function restartFunc(name, uid) {
    queue[uid].forEach(element => {
        if (element["name"] == name) {
            element["state"] = false
        }
    });
}

function addToQueue(name, uid, reaction) {
    var isFound = false;
    if (!queue[uid])
        queue[uid] = [];
    queue[uid].forEach(element => {
        if (element["name"] == name) {
            isFound = true;
            if (element["name"]["reaction"].indexOf(reaction) == -1)
                element["name"]["reaction"].push(reaction)
        }
    });
    if (!isFound)
        queue[uid].push({"name": name, "state": false, "reaction": [reaction]})
}

function removeToQueue(name, uid, reaction="") {
    var pos = -1;
    var x = 0
    queue[uid].forEach(element => {
        if (element["name"] == name)
            pos = x;
            x += 1
    });
    if (pos != -1) {
        if (reaction == "") {
            queue[uid].splice(pos, 1);
        } else if (queue[uid][pos]["reaction"].indexOf(reaction) != -1) {
            queue[uid][pos]["reaction"].splice(reaction.indexOf(reaction), 1);
        }
    }
}

//////////////////////////////////////

//////////////////////// CALL REACTION 

function test_R() {
    console.log("TEST REACTION")
}

function callReaction(name, uid) {
    queue[uid].forEach(element => {
        if (element["name"] == name) {
            element["reaction"].forEach(ele => {
                reactionList[ele]();
            });
        }
    });
}

//////////////////////////////////////

///////////////////////////// CALL API

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function test_A(uid) {
    console.log("TEST API");
    await sleep(1000);
    console.log(queue[uid])
    restartFunc("test-A", uid);
    console.log(queue[uid]);
    callReaction("test-A", uid);
    removeToQueue("test-A", uid, "test-R");
    console.log(queue)
    removeToQueue("test-A", uid);
    console.log(queue);
    stopApiProcess(uid);
}

//////////////////////////////////////

/////////////////////////// LAUNCH API

async function requestApi(uid) {
    console.log("start API");
    var pos = 0;
    if (!queue[uid])
        queue[uid] = [];
    while (queue[uid]) {
        if (queue[uid].length != 0) {
            if (!queue[uid][pos]["state"]) {
                queue[uid][pos]["state"] = true;
                await APIRequestList[queue[uid][pos]["name"]](uid);
            }
            pos += 1;
            if (queue[uid] && pos == queue[uid].length)
                pos = 0;
        } else {
            await sleep(1000);
        }
    }
    console.log("stop API")
}

//////////////////////////////////////

module.exports = {requestApi, removeToQueue, addToQueue, stopApiProcess};