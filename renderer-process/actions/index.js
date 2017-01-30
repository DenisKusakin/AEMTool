const ADD_SERVER = "ADD_SERVER"; 
const REMOVE_SERVER = "REMOVE_SERVER";
const UPDATE_SERVER_STATUS = "UPDATE_STATUS";
const SHOW_NEW_SERVER_FORM = "SHOW_NEW_SERVER_FORM";
const HIDE_NEW_SERVER_FORM = "HIDE_NEW_SERVER_FORM";
const HIDE_DRAWER = "HIDE_DRAWER";
const SHOW_DRAWER = "SHOW_DRAWER";
const ADD_BUNDLES = "ADD_BUNDLES";

module.exports.ADD_SERVER = ADD_SERVER;
module.exports.REMOVE_SERVER = REMOVE_SERVER;
module.exports.UPDATE_SERVER_STATUS = UPDATE_SERVER_STATUS;
module.exports.SHOW_NEW_SERVER_FORM = SHOW_NEW_SERVER_FORM;
module.exports.HIDE_NEW_SERVER_FORM = HIDE_NEW_SERVER_FORM;
module.exports.HIDE_DRAWER = HIDE_DRAWER;
module.exports.SHOW_DRAWER = SHOW_DRAWER;
module.exports.ADD_BUNDLES = ADD_BUNDLES;

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

module.exports.addBundles = function({_id, list, time}){
    return {
        type: ADD_BUNDLES,
        _id,
        list,
        time
    }
}