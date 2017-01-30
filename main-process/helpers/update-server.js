const request = require("request");
const SLURI = require("sluri");
const {NOT_FOUND, FOUND, INVALID_CREDENTIALS} = require("./../../common/statuses.js");

responseToStatusCode = code => {
    if(code === 200){
        return FOUND;
    } else if(code === 401 || code === 403){
        return INVALID_CREDENTIALS
    }

    return NOT_FOUND;
}

module.exports = function({id, host, login, password}){
    var sluri = new SLURI('http://' + host);
    sluri.username = login;
    sluri.password = password;

    return new Promise((resolve, reject) => {
        request(sluri.href, function (error, response, body) {
                if(response === undefined){
                    resolve({statusCode: NOT_FOUND, time: new Date()});
                    return;
                }
                resolve({statusCode: responseToStatusCode(response.statusCode), time: new Date()});
            }
        )
    })
}