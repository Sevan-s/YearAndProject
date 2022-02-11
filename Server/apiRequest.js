
//////////////////////////////// QUEUE

APIRequestList = {"test": test}

queue = []

function restartFunc(name) {
    queue.forEach(element => {
        if (element["name"] == name) {
            element["state"] = false
        }
    });
}

function addToQueue(name) {
    var isFound = false;
    queue.forEach(element => {
        if (element["name"] == name)
            isFound = true;
    });
    if (!isFound)
        queue.push({"name": name, "state": false})
}

function removeToQueue(name) {
    var pos = -1;
    x = 0
    queue.forEach(element => {
        if (element["name"] == name)
            pos = x;
            x += 1
    });
    if (pos != -1)
        queue.splice(pos, 1);
}

//////////////////////////////////////

///////////////////////////// CALL API
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function test() {
    console.log("TEST API");
    await sleep(1000);
    restartFunc("test");
    //console.log(queue);
    removeToQueue("test");
    //console.log(queue);
}

//////////////////////////////////////

/////////////////////////// LAUNCH API

async function callFunc() {
    pos = 0;
    while(1) {
        if (queue.length != 0) {
            if (!queue[pos]["state"]) {
                queue[pos]["state"] = true;
                await APIRequestList[queue[pos]["name"]]();
            }
            pos += 1;
            if (pos == queue.length)
                pos = 0;
        }
    }
}

function LaunchEachProcess() {
    return new Promise(resolve => {
        setTimeout(() => {
            callFunc();
        }, 1000);
    });
}

async function requestApi() {
    const res = await LaunchEachProcess()
    console.log(res)
}

//////////////////////////////////////

module.exports = {requestApi, removeToQueue, addToQueue};