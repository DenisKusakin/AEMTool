const ADD_SERVER = "ADD_SERVER"; 
const REMOVE_SERVER = "REMOVE_SERVER";
const UPDATE_SERVER_STATUS = "UPDATE_STATUS";
const SHOW_NEW_SERVER_FORM = "SHOW_NEW_SERVER_FORM";
const HIDE_NEW_SERVER_FORM = "HIDE_NEW_SERVER_FORM";
const HIDE_DRAWER = "HIDE_DRAWER";
const SHOW_DRAWER = "SHOW_DRAWER";
const ADD_BUNDLES = "ADD_BUNDLES";
const SHOW_SEARCH_FIELD = "SHOW_SEARCH_FIELD";
const HIDE_SEARCH_FIELD = "HIDE_SEARCH_FIELD";
const FETCH_SERVERS = "FETCH_SERVERS";

module.exports = {
    ADD_SERVER,
    REMOVE_SERVER,
    UPDATE_SERVER_STATUS,
    SHOW_NEW_SERVER_FORM,
    HIDE_NEW_SERVER_FORM,
    HIDE_DRAWER,
    SHOW_DRAWER,
    ADD_BUNDLES,
    SHOW_SEARCH_FIELD,
    HIDE_SEARCH_FIELD,
    FETCH_SERVERS
}

module.exports.addServer = function(id, name, host, login, password){
    return {
        type: ADD_SERVER,
        name,
        host,
        login,
        password,
        id,
    }
}

module.exports.removeServer = function(id){
    return {
        type: REMOVE_SERVER,
        id,
    }
}

module.exports.updateStatus = function({_id, statusCode, time}){
    return {
        type: UPDATE_SERVER_STATUS,
        _id,
        statusCode,
        time,
    }
}

module.exports.showNewServerForm = () => ({type: SHOW_NEW_SERVER_FORM});
module.exports.hideNewServerForm = () => ({type: HIDE_NEW_SERVER_FORM});
module.exports.showDrawer = () => ({type: SHOW_DRAWER});
module.exports.hideDrawer = () => ({type: HIDE_DRAWER});
module.exports.showSearchField = () => ({type: SHOW_SEARCH_FIELD});
module.exports.hideSearchField = () => ({type: HIDE_SEARCH_FIELD});

module.exports.addBundles = function({_id, data, time}){
    return {
        type: ADD_BUNDLES,
        _id,
        list: data,
        time
    }
}