//const {findServers, getBundles, updateServer} = require("./db-api.js");
const {fetchServers, checkStatus} = require("./api.js");
const {fetchBundles, fetchComponents} = require("./services-api.js");
const {NOT_FOUND, FOUND, INVALID_CREDENTIALS} = require("./../common/statuses.js");
const Fuse = require("fuse.js");
const _ = require("underscore");
const winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({ filename: 'main.log' })
    ]
});

const bundlesSearchOptions = {
    shouldSort: true,
    tokenize: true,
    matchAllTokens: true,
    findAllMatches: true,
    threshold: 0,
    location: 0,
    distance: 100,
    maxPatternLength: 100,
    minMatchCharLength: 1,
    keys: [
        "symbolicName",
        "name"
    ]
};

const componentsSearchOptions = _.extend(
    bundlesSearchOptions,
    {
        keys: ["name", "pid"],
        threshold: 0.2,
        distance: 1000,

    })

const filter = options => (list, query) => {
    var fuse = new Fuse(list, options);
    var res = fuse.search(query);
    logger.log(list);
    return res;
}

const search = (fetchFunc, filterOptions) => ({query, serverId}) => {
    return checkStatus({_id: serverId})
        .then(
            status => {
                if(status.statusCode !== FOUND){
                    let {name} = server;
                    throw "Server " + name + " is not Online";
                }
            }
        )
        .then(
            () => fetchFunc(serverId)
                .then(fetchedData => {
                    if(!fetchedData.data || !fetchedData.data['data']){
                        throw "Bundles error: " + serverId;
                    }

                    var res = filter(filterOptions)(fetchedData.data.data, query);
                    return {
                        items: res,
                        stateTime: fetchedData.time
                    }
                })
        )
}

module.exports = {
    bundles: search(fetchBundles, bundlesSearchOptions),
    components: search(fetchComponents, componentsSearchOptions)
}