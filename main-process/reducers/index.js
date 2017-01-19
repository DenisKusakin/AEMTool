const servers = require("./../../common/reducers/servers.js");
const serverStatus = require("./update-server-status.js");
const { combineReducers } = require('redux');

module.exports = combineReducers({
    servers: (state, action) => {
        var newState = servers(state, action);
        if(state === newState){
            return serverStatus(state, action);
        }

        return newState;
    }
})