const request = require("request");
const SLURI = require("sluri");
const {getEntity, persistEntity, getServer} = require("./db-api.js");
const isBundlesUpToDate = require("./helpers/expiration-api.js").bundles;

const fetchResource = resource => _id => {
    return getServer(_id)
        .then(server => {
            let {host, login, password} = server;
            return new Promise((resolve, reject) => {
                var sluri = new SLURI('http://' + host);
                sluri.username = login;
                sluri.password = password;
                sluri.pathname = resource + ".json";

                request(sluri.href, function (error, response, body) {
                    if(!!error || response === undefined){
                        reject();
                        return;
                    }
                    let json = JSON.parse(response.body);
                    resolve({data: json, time: new Date()});
                })
            });
        })
}

const getEntityById = (getFunc, fetchFunc, persistFunc) => forceUpdate => (_id) => {
    return getFunc(_id)
        .then(
            res => {
                if(forceUpdate){
                    throw "Force update";
                }

                if(isBundlesUpToDate(res.time)){
                    return res;
                }
                throw "Out of date"
            }
        )
        .then(x => {return x;}, () => {
            return fetchFunc(_id)
                .then(fetchResult => {
                    persistFunc(_id, fetchResult);
                    return fetchResult;
                })
        })
}

//TODO: refactoring
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
                    //getBundlesById(true)(_id);
                })
            });
        })
}

const getBundles = getEntity("bundles");
const persistBundles = persistEntity("bundles");
const fetchBundles = fetchResource("/system/console/bundles");

module.exports = {
    fetchBundles: getEntityById(getBundles, fetchBundles, persistBundles)(false),
    startBundle: bundleAction("start"),
    stopBundle: bundleAction("stop"),
    fetchComponents: getEntityById(getEntity("components"), fetchResource("/system/console/components"), persistEntity("components"))(false)
}