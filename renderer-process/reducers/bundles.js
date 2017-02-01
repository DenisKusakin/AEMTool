const {ADD_BUNDLES} = require("./../actions/index.js")
const {List} = require("immutable")

export default (state = {list: []}, action) => {
    if(action.type === ADD_BUNDLES){
        let {_id, list} = action;
        return {
            list: List(list).toArray(),
            _id
        };
    }
    return state;
}