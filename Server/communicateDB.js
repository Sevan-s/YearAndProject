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
        },{
            name: "Discord",
            token: ""
        }],
        action: [{
            name: "new Mail",
            activate: false,
            reaction: [],
            reaction_allow: ["Debug", "Mail"],
            desc: "Nouveau mail reçu",
            last_res: {'total': -1}
        }, {
            name: "Debug",
            activate: false,
            reaction: ["Debug"],
            reaction_allow: ["Debug", "Mail"],
            desc: "Juste un teste afin de savoir tout ce qu'il se passe",
            last_res: {}
        }, {
            name: "Horoscope",
            activate: false,
            reaction: [],
            reaction_allow: ["Debug", "Mail"],
            desc: "Pour obtenir l'horoscope d'aujourd'hui des Capricornes",
            last_res: {'date': -1}
        }, {
            name: "Meteo",
            activate: false,
            reaction: [],
            reaction_allow: ["Debug", "Mail"],
            desc: "Pour obtenir la météo de Toulouse!",
            last_res: {'date': -1}
        }, {
            name: "Calendar",
            activate: false,
            reaction: [],
            reaction_allow: ["Debug", "Mail"],
            desc: "Si une activité planifié arrive dans les 30min",
            last_res: {'crdate': []}
        }, {
            name: "Crypto",
            activate: false,
            reaction: [],
            reaction_allow: ["Debug", "Mail"],
            desc: "Obtenir le prix du bitcoin toutes les heures",
            last_res: {'date': -1}
        }, {
            name: "Covid",
            activate: false,
            reaction: [],
            reaction_allow: ["Debug", "Mail"],
            desc: "Info du Covid en France",
            last_res: {'date': -1}
        }, {
            name: "KhabyLameStory",
            activate: false,
            reaction: [],
            reaction_allow: ["Debug", "Mail"],
            desc: "Url de la dernière story de Khaby",
            last_res: {'date': -1}
        }, {
            name: "WolrdNewsFr",
            activate: false,
            reaction: [],
            reaction_allow: ["Debug", "Mail"],
            desc: "Dernières Actualitées",
            last_res: {'date': -1}
        }, {
            name: "TheBestJoke",
            activate: false,
            reaction: [],
            reaction_allow: ["Debug", "Mail"],
            desc: "Un peu de plaisir !",
            last_res: {'date': -1}
        }, {
            name: "GameNews",
            activate: false,
            reaction: [],
            reaction_allow: ["Debug", "Mail"],
            desc: "Game News",
            last_res: {'date': -1}
        }, {
            name: "TopNetflix",
            activate: false,
            reaction: [],
            reaction_allow: ["Debug", "Mail"],
            desc: "Top Netflix",
            last_res: {'date': -1}
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
        //console.log(result)
    });
}

//////////////////////////////

function connect() {
    r.connect({host: '192.168.0.2', port: 28015}, function(err, conn) {
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