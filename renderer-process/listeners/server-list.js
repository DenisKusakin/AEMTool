import {
    ADD_SERVER_ERROR,
    NEW_SERVER_ADDED_SUCCESSFULLY,
    SERVER_REMOVE_ERROR,
    SERVER_REMOVED_SUCCESSFULLY,
    SERVERS_FETCHED_ERROR,
    SERVERS_FETCHED_SUCCEFFULLY,
    SERVER_STATUS_UPDATED
} from "./../../common/event-types.js";

const Rx = require('rxjs/Rx');

import source from "./../events-stream.js";
const {fetchServers} = remote.require("./main-process/api.js");
import {checkServer} from "./../api.js";

export default () =>
    source
        .filter(x => x.type && x.type === NEW_SERVER_ADDED_SUCCESSFULLY)
        .merge(Rx.Observable.interval(5000))
        .subscribe(x =>
            fetchServers()
                .then(servers => servers.forEach(server => checkServer(server)))
        )