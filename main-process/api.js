const {serverStatus} = require("./helpers");
const {getServer, updateServer, persistServer, removeServer, findServers} = require("./db-api.js");
const isServerStatusUpToDate = require("./helpers/expiration-api.js").serverStatus;


function addServer({name, host, login, password}){
    return persistServer({name, host, login, password})
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