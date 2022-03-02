import axios from 'axios';

ip = "192.168.1.14"

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

module.exports = {getConnectVal, connect, createUser}