const {addServer, removeServer} = require("./../../common/actions/index.js")
const {store} = require("./../store/index.js");
//const {add, remove} = require("./status-update.js");

getID = function(){
    return Math.random()
}

module.exports.addServer = function({name, host, login, password}){
    let id = getID();
    store.dispatch(addServer(id, name, host, login, password));
    
    //add(id, host, login, password);
}

module.exports.removeServer = function(id){
    store.dispatch(removeServer(id));

    //remove(id);
}