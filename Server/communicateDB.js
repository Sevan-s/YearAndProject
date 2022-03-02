const r = require('rethinkdb');
var connection = null

function initDB() {
    try {
        r.dbCreate("users").run(connection, function(_, res) {
            console.log(res)
            try {
                r.db("users").tableCreate('users').run(connection, function(_, res) {
                    console.log(res)
                })
        
            } catch (err) {
                console.log("table find.")
            }
        })

    } catch (err) {
        console.log("DB find.")
        try {
            r.db("users").tableCreate('users').run(connection, function(_, res) {
                console.log(res)
            })
    
        } catch (err) {
            console.log("table find.")
        }
    }
}

////////////////// USER ACCOUNT

function addUser(username, password, OAUTH, callback) {
    r.db("users").table("users").insert({
        name: username,
        password: password,
        account_link: [{
            name: "Google",
            token: ""
        },{
            name: "Facebook",
            token: ""
        },{
            name: "Microsoft",
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
        callback(result);
    });
}


//////////////////////////////

///////////////// USER CONTENT

function replaceUserByID(accountID, data) {
    r.db("users").table("users").get(accountID).replace(data, {returnChanges: true}).run(connection, function(err, result) {
        if (err) throw err;
        console.log(result)
    });
}


//////////////////////////////

function connect() {
    r.connect({host: '172.29.0.2', port: 28015}, function(err, conn) {
        if (err) {
            console.log(err);
            setTimeout(connect, 1000);
        } else {
            connection = conn;
            initDB()
            console.log("CONNECT")
        }
    })
}

module.exports = {connect, addUser, getUser, getUserByID, replaceUserByID}