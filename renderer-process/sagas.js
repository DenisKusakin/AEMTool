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

function* fetchServers(action) {
    let {id} = action;
    const {response, error} =
        yield
            Api.fetchServers()
                .then(response => ({response}))
                .catch(error => ({error}))

    if(response){
        yield
            put({ type: SERVERS_FETCHED_SUCCEFFULLY});
            
            response
                .forEach(
                    ({_id, name, host, login, password}) => put({ type: NEW_SERVER_ADDED_SUCCESSFULLY, id, name, host, login, password})
                )
    } else{
        yield put({ type: SERVERS_FETCHED_ERROR })
    }
}

/*
* SAMPLE
*/
// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
   try {
      const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* mySaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}

export default mySaga;