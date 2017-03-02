import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
//API
//const {addServer, removeServer, fetchServers, checkStatus} = remote.require("./main-process/api.js");
//const {fetchBundles, startBundle, stopBundle} = remote.require("./main-process/services-api.js");
const Api = remote.require("./main-process/api.js");
const ServicesApi = remote.require("./main-process/services-api.js");

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

import {
    ADD_SERVER,
    REMOVE_SERVER,
    UPDATE_SERVER_STATUS
} from "./actions"

function* addServer(action) {
    let {host, name, login, password} = action;
    const {response, error} =
        yield
            Api.addServer({name, host, login, password})
                .then(response => ({response}))
                .catch(error => ({error}))

    if(response){
        yield put({ type: NEW_SERVER_ADDED_SUCCESSFULLY, id: response._id, name, host, login, password })
    } else{
        yield put({ type: ADD_SERVER_ERROR, name })
    }
}

function* removeServer(action) {
    let {id} = action;
    const {response, error} =
        yield
            Api.removeServer({id})
                .then(response => ({response}))
                .catch(error => ({error}))

    if(response){
        yield put({ type: SERVER_REMOVED_SUCCESSFULLY, id })
    } else{
        yield put({ type: SERVER_REMOVE_ERROR, id })
    }
}

function* fetchServers() {
    const {response, error} =
        yield
            Api.fetchServers()
                .then(response => ({response}))
                .catch(error => ({error}))

    if(response){
        yield
            response
                .map(
                    ({_id, name, host, login, password}) => put({ type: NEW_SERVER_ADDED_SUCCESSFULLY, id, name, host, login, password})
                )
                .push(put({ type: SERVERS_FETCHED_SUCCEFFULLY}))
    } else{
        yield put({ type: SERVERS_FETCHED_ERROR })
    }
}

function* checkStatus(action) {
    const {_id} = action;
    const {response, error} =
        yield
            Api.checkStatus({_id})
                .then(response => {response})
                .catch(error => {error})
    if(response){
        yield put({ type: SERVER_STATUS_UPDATED, id: _id })
    }
}

export default function* rootSaga() {
    yield [
        takeEvery(ADD_SERVER, addServer)(),
        takeEvery(REMOVE_SERVER, removeServer)(),
        takeEvery("FETCH_SERVERS", fetchServers)(),
        takeEvery(UPDATE_SERVER_STATUS, checkStatus)()
    ]
}