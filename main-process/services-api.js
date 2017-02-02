const request = require("request");
const SLURI = require("sluri");
const {getServer} = require("./api.js");
const {getBundles, persistBundles} = require("./db-api.js");
const moment = require('moment');

const fetchBundles = (_id) => {console.log("! ", _id);
    return getServer(_id)
        .then(server => {
            let {host, login, password} = server;
            return new Promise((resolve, reject) => {
                var sluri = new SLURI('http://' + host);
                sluri.username = login;
                sluri.password = password;
                sluri.pathname = "/system/console/bundles.json";

                request(sluri.href, function (error, response, body) {
                    if(!!error || response === undefined){
                        reject();
                        return;
                    }
                    let json = JSON.parse(response.body);
                    resolve(json);
                })
            });
        })
}

const getBundlesById = (_id) => {
    return getBundles(_id)
        .then(
            bundles => {
                let now = moment();
                let lastUpdate = moment(bundles.time);
                let diff = now.diff(lastUpdate);

                if(diff < 1000*60){
                    return bundles;
                }
                throw "More than 1 minute"
            }
        )
        .then(x => {console.log("!?", x); return x;}, () => {console.log("?? ");
            return fetchBundles(_id)
                .then(fetchedBundles => {
                    persistBundles(_id, fetchedBundles);
                    return fetchedBundles.data;
                })
        })
}

const bundleAction = action => (_id, bundleId) => {
    return getServer(_id)
        .then(server => {
            let {host, login, password} = server;
            return new Promise((resolve, reject) => {
                var sluri = new SLURI('http://' + host);
                sluri.username = login;
                sluri.password = password;
                sluri.pathname = "/system/console/bundles/" + bundleId;
                sluri.searchParams.append("action", action);

                request.post(sluri.href, function (error, response, body) {
                    if(!!error || response === undefined){
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
    fetchBundles: getBundlesById,
    startBundle: bundleAction("start"),
    stopBundle: bundleAction("stop")
}