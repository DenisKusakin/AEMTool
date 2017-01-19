const {UPDATE_SERVER_STATUS} = require("./../../common/actions/index.js")
const {List} = require("immutable")

module.exports = (state = {items: []}, action) => {
    if(action.type === UPDATE_SERVER_STATUS){
        var {id, statusCode, time} = action;
        var itemsList = List(state.items);
        var index = itemsList.findIndex(val => val.id === id);

        return {
            items: itemsList.update(index, val => ({
                ...val,
                lastStatus: {
                    statusCode,
                    time
                }
            })).toArray()            
        }
    }

    return state;
}