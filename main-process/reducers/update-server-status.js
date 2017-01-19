const {UPDATE_SERVER_STATUS} = require("./../../common/actions/index.js")
const {List} = require("immutable")
const _ = require("underscore");

module.exports = (state = {items: []}, action) => {
    if(action.type === UPDATE_SERVER_STATUS){
        var {id, status, time} = action;
        var index = List(state.items).findIndex(val => val.id === id);
        
        return {
            items: List(state.items).update(index, val => {
                let newVal = _.clone(val);
                newVal.statuses = List(val.statuses).push({
                    time,
                    status
                }).toArray();

                return newVal;
            })        
        }
    }

    return state;
}