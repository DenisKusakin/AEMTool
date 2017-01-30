const {addServer, removeServer, fetchServers, checkStatus} = remote.require("./main-process/api.js");
const {fetchBundles} = remote.require("./main-process/services-api.js");

import {
    ADD_SERVER_ERROR,
    NEW_SERVER_ADDED_SUCCESSFULLY,
    SERVER_REMOVE_ERROR,
    SERVER_REMOVED_SUCCESSFULLY,
    SERVERS_FETCHED_ERROR,
    SERVERS_FETCHED_SUCCEFFULLY,
    SERVER_STATUS_UPDATED,
    SERVER_STATUS_UPDATE_ERROR,
    BUNDLES_FETCHED_SUCCESSFULLY,
    BUNDLES_FETCH_ERROR
} from "./../common/event-types.js";

import broadcast from "./events-stream.js"

var decorator = (func, {resolve, reject}) => args => {
   func(args)
       .then(
           result => broadcast.next({
               type: resolve,
               data: result
           }),
           result => broadcast.next({
               type: reject,
               data: result
           })
       )
}

export default {
    addServer: decorator(addServer, {
        resolve: NEW_SERVER_ADDED_SUCCESSFULLY,
        reject: ADD_SERVER_ERROR
    }),
    removeServer: decorator(removeServer, {
        resolve: SERVER_REMOVED_SUCCESSFULLY,
        reject: SERVER_REMOVE_ERROR
    }),
    fetchServers: decorator(fetchServers, {
        resolve: SERVERS_FETCHED_SUCCEFFULLY,
        reject: SERVERS_FETCHED_ERROR
    }),
    checkServer: decorator(args =>
        checkStatus(args)
            .then(res => {
                res._id = args._id;
                return res;
            })
    , {
        resolve: SERVER_STATUS_UPDATED,
        reject: SERVER_STATUS_UPDATE_ERROR
    }),
    fetchBundles: decorator(args =>
        fetchBundles(args)
            .then(res => {
                res._id = args._id;
                return res;
            }),
            {
                resolve: BUNDLES_FETCHED_SUCCESSFULLY,
                reject: BUNDLES_FETCH_ERROR
            })
}