const {
    CHANGE_CHECKBOX_STATE,
    CHANGE_FIELD_VALUE,
    ADD_SEARCH_CHUNKS,
    ADD_SEARCH_CHUNK_RESULT
} = require("./../actions/search-actions.js")

const {List} = require("immutable")

export default (state = {}, action) => {

    if(action.type === CHANGE_CHECKBOX_STATE){
        let {searchId, checkboxId, checked} = action;
        var newState = {
            ...state,
            [searchId]: {
                ...state[searchId],
            }
        }
        if(!newState[searchId].checkboxes){
            newState[searchId].checkboxes = {};
        }
        newState[searchId].checkboxes[checkboxId] = checked

        return newState;
    } else if(action.type === CHANGE_FIELD_VALUE){
        let {searchId, value} = action;
        return {
            ...state,
            [searchId]: {
                ...state[searchId],
                value
            }
        }
    } else if(action.type === ADD_SEARCH_CHUNKS){
        var newState = {...state};
        let {searchId, chunks} = action;

        newState[searchId].result = {
            chunks
        }

        return newState;
    } else if(action.type === ADD_SEARCH_CHUNK_RESULT){
        let {searchId, chunkId, items, totalTime, stateTime} = action;
        var newState = {
            ...state,
        };
        let index = List(state[searchId].result.chunks).findIndex(x => x.id === chunkId);
        newState[searchId].result = {
            chunks: List(state[searchId].result.chunks).update(index, val => ({
                ...val,
                items,
                totalTime,
                stateTime
            })).toArray()
        }

        return newState;
    }
    return state;
}