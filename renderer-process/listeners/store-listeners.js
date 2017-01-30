import {
    ADD_SERVER_ERROR, 
    NEW_SERVER_ADDED_SUCCESSFULLY, 
    SERVER_REMOVE_ERROR, 
    SERVER_REMOVED_SUCCESSFULLY,
    SERVERS_FETCHED_ERROR,
    SERVERS_FETCHED_SUCCEFFULLY,
    SERVER_STATUS_UPDATED,
    BUNDLES_FETCHED_SUCCESSFULLY
} from "./../../common/event-types.js"

import {addServer, removeServer, updateStatus, addBundles} from "./../actions";
import source from "./../events-stream.js";

export default store => {
    source
    .filter(x => x.type && x.type === NEW_SERVER_ADDED_SUCCESSFULLY)
    .subscribe(x => {
        let {_id, host, name, login, password} = x.data;
        store.dispatch(addServer(_id, name, host, login, password));
    })

    source
    .filter(x => x.type && x.type === SERVER_REMOVED_SUCCESSFULLY)
    .subscribe(x => {
        let {_id} = x.data;
        store.dispatch(removeServer(_id));
    })

    source
    .filter(x => x.type && x.type === SERVERS_FETCHED_SUCCEFFULLY)
    .subscribe(x => {
        x.data.forEach( server => {
            let {_id, name, host, login, password} = server;
            store.dispatch(addServer(_id, name, host, login, password));
        })
    })

    source
    .filter(x => x.type && x.type === SERVER_STATUS_UPDATED)
    .subscribe(x => {
        store.dispatch(updateStatus(x.data));
    })

    source
    .filter(x => x.type && x.type === BUNDLES_FETCHED_SUCCESSFULLY)
    .subscribe(x => {
        store.dispatch(addBundles(x.data))
    })
}