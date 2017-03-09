const request = require("request");
const SLURI = require("sluri");
const {getEntity, persistEntity, getServer} = require("./db-api.js");

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
                    try{
                        let json = JSON.parse(response.body);
                        resolve({data: json, time: new Date()});
                    }catch(e){
                        reject();
                    }
                })
            });
        })
}

//const getEntityById = (getFunc, fetchFunc, persistFunc) => forceUpdate => (_id) => {
//    return getFunc(_id)
//        .then(
//            res => {
//                if(forceUpdate){
//                    throw "Force update";
//                }
//
//                if(isBundlesUpToDate(res.time)){
//                    return res;
//                }
//                throw "Out of date"
//            }
//        )
//        .then(x => {return x;}, () => {
//            return fetchFunc(_id)
//                .then(fetchResult => {
//                    persistFunc(_id, fetchResult);
//                    return fetchResult;
//                })
//        })
//}

//TODO: refactoring
const bundleAction = action => ({serverId, bundleId}) => {
    return getServer(serverId)
        .then(server => {
            let {host, login, password} = server;
            return new Promise((resolve, reject) => {
                var sluri = new SLURI('http://' + host);
                sluri.username = login;
                sluri.password = password;
                sluri.pathname = "/system/console/bundles/" + bundleId;
                sluri.searchParams.append("action", action);

                request.post(sluri.href, function (error, response, body) {
                    if(!!error || response === undefined || response.statusCode !== 200){
                        reject(error, response);
                        return;
                    }
                    let json = JSON.parse(response.body);
                    resolve({enabled: json.stateRaw === 32});
                })
            });
        })
}

const componentAction = action => ({serverId, componentId}) => {
    return getServer(serverId)
        .then(server => {
            let {host, login, password} = server;
            return new Promise((resolve, reject) => {
                var sluri = new SLURI('http://' + host);
                sluri.username = login;
                sluri.password = password;
                sluri.pathname = "/system/console/components/" + componentId;
                sluri.searchParams.append("action", action);

                request.post(sluri.href, function (error, response, body) {
                    if(!!error || response === undefined || response.statusCode !== 200){
                        reject(error, response);
                        return;
                    }
                    resolve({
                        //TODO: This hac is needed because new state is not returned by component action request
                        enabled: action === "enable"
                    });
                })
            });
        })
}

const fetchComponents = id => fetchResource("/system/console/components")(id)
    .then ( ({data, time}) => {
        let transformedList = data.data.map( ( {id, name, state, pid} ) => {
            return {
                enabled: state === "active",
                pid,
                id: id ? id : name,
                name
            }
        } )

        return {
            data: {
                data: transformedList
            },
            time
        }
    })

const fetchBundles = id => fetchResource("/system/console/bundles")(id)
    .then ( ( {data, time} ) => {
        return {
            data: {
                data: data.data.map( ( { name, symbolicName, id, stateRaw, version, category, state } ) => ({
                    name,
                    symbolicName,
                    id,
                    enabled: stateRaw === 32,
                    version,
                    category,
                    state
                }) )
            },
            time
        }
    } )

module.exports = {
    fetchBundles,
    startBundle: bundleAction("start"),
    stopBundle: bundleAction("stop"),
    fetchComponents,
    startComponent: componentAction("enable"),
    stopComponent: componentAction("disable")
}