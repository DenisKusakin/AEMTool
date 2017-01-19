const {ADD_SERVER, REMOVE_SERVER, UPDATE_SERVER_STATUS} = require("./../actions/index.js")
const {List} = require("immutable")

const servers = (state = {items: []}, action) => {

    if(action.type === ADD_SERVER){
        var {name, host, login, password, id} = action;
        return {
            items: List(state.items).push({name, host, login, password, id}).toArray()
        };
    } else if(action.type === REMOVE_SERVER){
        var {id} = action;
        return {
            items: List(state.items).filterNot(value => value.id === id).toArray()
        }
    }

    return state
}

module.exports = servers;