import axios from 'axios';

ip = "192.168.1.14"

////////////////// ACTION

function switchAction(name) {
    axios.post(`http://${ip}:8080/user/switchAction/`, {"name": name});
}

function switchReaction(act, reac) {
    axios.post(`http://${ip}:8080/user/switchReaction/`, {"action": act, "reaction": reac});
}

async function getAction() {
  var wr = 0
  await axios.get(`http://${ip}:8080/user/getAction/`)
  .then(res => {
    const data = res.data;
    wr = data.action;
  })
  return (wr);
}

////////////////////////

////////////// USER AUTH

async function getConnectVal() {
    var connect = 0
    await axios.get(`http://${ip}:8080/user/connected/`)
      .then(res => {
        const data = res.data;
        connect = data.isConnected;
    })
    return (connect);
}

function createUser(user, pass) {
    axios.post(`http://${ip}:8080/user/create/`, {
        "username": user,
        "password": pass, "OAUTH": false
    });
}

function connect(user, pass) {
    axios.post(`http://${ip}:8080/user/connect/`, {"username": user, "password": pass, "OAUTH": false});
}

function disconnect() {
  axios.post(`http://${ip}:8080/user/disconnect/`);
}

////////////////////////

module.exports = {getConnectVal, connect, createUser, getAction, switchAction, switchReaction, disconnect}