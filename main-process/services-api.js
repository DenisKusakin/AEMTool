const request = require("request");
const SLURI = require("sluri");
const {getBundles, persistBundles, getServer} = require("./db-api.js");
const isBundlesUpToDate = require("./helpers/expiration-api.js").bundles;

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

const getBundlesById = forceUpdate => (_id) => {
    return getBundles(_id)
        .then(
            bundles => {
                if(forceUpdate){
                    throw "Force update";
                }

                if(isBundlesUpToDate(bundles.time)){
                    return bundles;
                }
                throw "More than 1 minute"
            }
        )
        .then(x => {console.log("!?", x); return x;}, () => {console.log("?? ");
            return fetchBundles(_id)
                .then(fetchedBundles => {
                    persistBundles(_id, fetchedBundles);
                    return fetchedBundles;
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
                    if(!!error || response === undefined || response.statusCode !== 200 || response.statusCode !== 201){
                        reject();
                        return;
                    }
                    let json = JSON.parse(response.body);
                    resolve({list: json.data, time: new Date()});
                    getBundlesById(true)(_id);
                })
            });
        })
}

module.exports = {
    fetchBundles: getBundlesById(false),
    startBundle: bundleAction("start"),
    stopBundle: bundleAction("stop")
}