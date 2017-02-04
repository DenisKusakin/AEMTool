const {serverStatus} = require("./helpers");
//const Datastore = require("nedb");
const {getServer, updateServer, persistServer, removeServer, findServers} = require("./db-api.js");
const isServerStatusUpToDate = require("./helpers/expiration-api.js").serverStatus;

//const db = new Datastore({ filename: 'datafile-servers', autoload: false });

function addServer({name, host, login, password}){
    return persistServer({name, host, login, password})
}

//Deprecated
function checkStatus({_id}){
    return new Promise((resolve, reject) => {
        db.findOne({_id}, {}, function (err, doc) {
            if(!err){
                resolve(doc);
            }
            reject({_id});
        })
    }).then(server => {
        return serverStatus(server)
    });
}

function updateServerStatus({_id}){
    return getServer(_id)
        .then(
            server => {
                if(server.lastStatus != undefined && isServerStatusUpToDate(server.lastStatus.time)){
                    return server.lastStatus;
                }
                return serverStatus(server)
                    .then(
                        status => {
                            updateServer(_id, {
                                lastStatus: status
                            });
                            return status;
                        }
                    )
            }
        )
}

module.exports = {
    addServer,
    removeServer,
    fetchServers: () => findServers({}),
    checkStatus: updateServerStatus
};