const {updateStatus} = require("./../../common/actions/index.js");

const request = require("request");
const SLURI = require("sluri");

const api = function(dispatch){
    const statuses = {};

    function clear(){
        for(let id in statuses){
            remove(id);
        }
    }

    function add(id, host, login, password){
        if(!statuses[id]){
            statuses[id] = {host, login, password};
            
            var sluri = new SLURI('http://' + host);
            sluri.username = login;
            sluri.password = password;
            
            statuses[id].timerId = setInterval(() => {
                request({
                    method: 'GET',
                    uri: sluri.href
                }, function (error, response, body) {
                       let statusCode = response ? response.statusCode : false;
                       let action = updateStatus(id, statusCode, (new Date()).toString());
                       dispatch(action);
                   }
                )
            }, 5*1000); 
        }
    }

    function remove(id){
        if(statuses[id]){
            clearInterval(statuses[id].timerId);
            delete statuses[id];
        }
    }

    return {add, clear}
};

function select(state) {
    return state.servers;
}

let currentValue
function handleChange(store) {
    let previousValue = currentValue
    currentValue = select(store.getState())

    if (previousValue !== currentValue) {
        let apiInstance = api(store.dispatch); 
        apiInstance.clear();
        currentValue.items.forEach(server => {
            let {id, host, login, password} = server;
            apiInstance.add(id, host, login, password)
        })
    }
}

module.exports = handleChange;//(subscribe => {subscribe(handleChange)})