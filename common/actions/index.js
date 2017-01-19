const ADD_SERVER = "ADD_SERVER"; 
const REMOVE_SERVER = "REMOVE_SERVER";
const UPDATE_SERVER_STATUS = "UPDATE_STATUS";

module.exports.ADD_SERVER = ADD_SERVER;
module.exports.REMOVE_SERVER = REMOVE_SERVER;
module.exports.UPDATE_SERVER_STATUS = UPDATE_SERVER_STATUS;

module.exports.addServer = function(id, name, host, login, password){
    return {
        type: ADD_SERVER,
        name,
        host,
        login,
        password,
        id,
        "REMOTE_ACTION": true
    }
}

module.exports.removeServer = function(id){
    return {
        type: REMOVE_SERVER,
        id,
        "REMOTE_ACTION": true
    }
}

module.exports.updateStatus = function(id, statusCode, time){
    return {
        type: UPDATE_SERVER_STATUS,
        id,
        statusCode,
        time,
        "REMOTE_ACTION": true
    }
}