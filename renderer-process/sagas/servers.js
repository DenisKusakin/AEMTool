import { call, put, takeEvery, takeLatest, take, fork } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
const Api = remote.require("./main-process/api.js");

import {
    ADD_SERVER_ERROR,
    NEW_SERVER_ADDED_SUCCESSFULLY,
    SERVER_REMOVE_ERROR,
    SERVER_REMOVED_SUCCESSFULLY,
    SERVERS_FETCHED_ERROR,
    SERVERS_FETCHED_SUCCESSFULLY,
    SERVER_STATUS_UPDATED,
    BUNDLES_FETCHED_SUCCESSFULLY
} from "./../../common/event-types.js"

import {
    ADD_SERVER,
    REMOVE_SERVER,
    UPDATE_SERVER_STATUS,
    FETCH_SERVERS
} from "./../actions"

const wrapFunc = f => args => f(args).then(response => ({response}), error => ({error}))

function* addServer() {
    while(true){
        let {host, name, login, password} = yield take(ADD_SERVER);
        const {response, error} = yield call(wrapFunc(Api.addServer), {name, host, login, password})

        if(response){
            yield put({ type: NEW_SERVER_ADDED_SUCCESSFULLY, id: response._id, name, host, login, password })
        } else{
            yield put({ type: ADD_SERVER_ERROR, name })
        }
    }
}

function* removeServer() {
    while(true){
        let {id} = yield take(REMOVE_SERVER);
        const {response, error} = yield call(wrapFunc(Api.removeServer), id)

        if(response){
            yield put({ type: SERVER_REMOVED_SUCCESSFULLY, id })
        } else{
            yield put({ type: SERVER_REMOVE_ERROR, id })
        }
    }
}

function* fetchServers() {
    while(true){
        yield take(FETCH_SERVERS)
        const {response, error} = yield call(wrapFunc(Api.fetchServers));

        if(response){
            yield put({ type: SERVERS_FETCHED_SUCCESSFULLY, items: response})
        } else{
            yield put({ type: SERVERS_FETCHED_ERROR })
        }
    }
}

function getChannel(secs) {
    return eventChannel(emitter => {
        const iv = setInterval(() => {
            emitter({})
        }, secs);

        return () => {
            clearInterval(iv)
        }
    })
}

function* checkServerStatus(_id) {
    const {response, error} = yield call(wrapFunc(Api.checkStatus), {_id});

    if(response){
        let {statusCode, time} = response;
        yield put({ type: SERVER_STATUS_UPDATED, _id, statusCode, time })
    }
}

function* checkStatus() {
    const channel = yield call(getChannel, 5000)
    try{
        while(true){
            yield take(channel);

            const {response, error} = yield call(wrapFunc(Api.fetchServers))
            if(response){
                yield response
                    .map( ({_id}) => (fork(checkServerStatus, _id)) )
            }
        }
    }finally{

    }
}

export default function* root() {
    yield [
        fork(addServer),
        fork(removeServer),
        fork(fetchServers),
        fork(checkStatus)
    ]
}