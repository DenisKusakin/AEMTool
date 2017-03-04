const {
    NEW_SERVER_ADDED_SUCCESSFULLY,
    SERVER_REMOVED_SUCCESSFULLY,
    SERVER_STATUS_UPDATED,
    SERVERS_FETCHED_SUCCESSFULLY
} = require("./../../common/event-types.js")

const {List} = require("immutable")

const servers = (state = {items: []}, action) => {

    if(action.type === NEW_SERVER_ADDED_SUCCESSFULLY){
        var {name, host, login, password, id} = action;
        return {
            items: List(state.items).push({name, host, login, password, id}).toArray()
        };
    } else if(action.type === SERVER_REMOVED_SUCCESSFULLY){
        var {id} = action;
        return {
            items: List(state.items).filterNot(value => value.id === id).toArray()
        }
    } else if(action.type === SERVER_STATUS_UPDATED){
        let {_id, statusCode, time} = action;
        var itemsList = List(state.items);
        let index = itemsList.findIndex(val => val.id === _id);
        return {
            items: itemsList.update(index, val => ({
                ...val,
                lastStatus: {
                    status: statusCode,
                    time
                }
            })).toArray()            
        }
    } else if(action.type === SERVERS_FETCHED_SUCCESSFULLY){
        let {items} = action;
        return {
            items: items.map(({name, host, login, password, _id}) => ({name, host, login, password, id: _id}))
        }
    }

    return state
}

module.exports = servers;