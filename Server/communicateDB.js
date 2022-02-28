const r = require('rethinkdb');
var connection = null

////////////////// USER ACCOUNT

function addUser(username, password, OAUTH, callback) {
    r.db("users").table("users").insert({
        name: username,
        password: password,
        account_link: [{
            name: "Google",
            token: ""
        }],
        action: [{
            name: "Drink Water",
            activate: true,
            reaction: []
        }],
        OAUTH: OAUTH
    }).run(connection, callback);
}

function getUser(username, callback) {
    r.db("users").table("users").filter({name: username}).run(connection, function(err, result) {
        if (err) throw err;
        result.toArray().then(data => callback(data));
    });
}

function getUserByID(accountID, callback) {
    r.db("users").table("users").get(accountID).run(connection, function(err, result) {
        if (err) throw err;
        result.toArray().then(data => callback(data));
    });
}


//////////////////////////////

///////////////// USER CONTENT

//////////////////////////////

function connect() {
    r.connect({host: '172.23.0.2', port: 28015}, function(err, conn) {
        if (err) {
            console.log(err);
            setTimeout(connect, 1000);
        } else {
            connection = conn;
            //initDB()
            console.log("CONNECT")
        }
    })
}

module.exports = {connect, addUser, getUser, getUserByID}