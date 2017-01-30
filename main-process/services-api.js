const request = require("request");
const SLURI = require("sluri");
const {getServer} = require("./api.js");

const fetchBundles = (_id) => {
    return getServer(_id)
        .then(server => {
            let {host, login, password} = server;
            return new Promise((resolve, reject) => {
                var sluri = new SLURI('http://' + host);
                sluri.username = login;
                sluri.password = password;
                sluri.pathname = "/system/console/bundles.json";

                request(sluri.href, function (error, response, body) {
                    if(response === undefined){
                        reject();
                        return;
                    }
                    let json = JSON.parse(response.body);
                    resolve({list: json.data, time: new Date()});
                })
            });
        })
}

module.exports = {
    fetchBundles
}