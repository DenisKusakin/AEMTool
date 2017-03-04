import { call, put, takeEvery, takeLatest, take, fork } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import {START_BUNDLES_SEARCH, START_COMPONENTS_SEARCH, addSearchChunks, addSearchChunkResult} from "./../actions/search-actions.js"

const {bundles, components} = remote.require("./main-process/search-api.js");
const wrapFunc = f => args => f(args).then(response => ({response}), error => ({error}))

function* chunkSearch({searchFunc, searchId, chunkId, query, serverId}) {
    let {response, error} = yield call(wrapFunc(searchFunc), {query, serverId})

    if(response){
        let {items, stateTime} = response;
        yield put(addSearchChunkResult({searchId, chunkId, items, stateTime, totalTime: "TODO"}))
    }
}

function* startSearch({searchFunc, pattern}) {
    while(true){
        let {searchId, text, servers} = yield take(pattern);

        const chunks = servers.map(x => {
            return {
                title: x.title,
                id: x.id
            }
        })

        yield put(addSearchChunks({searchId, chunks}));

        yield chunks
            .map( ({id}) =>
                fork(chunkSearch, {searchFunc, searchId, chunkId: id, query: text, serverId: id})
            )
    }
}

export default function* root() {
    yield [
        fork(startSearch, {searchFunc: bundles, pattern: START_BUNDLES_SEARCH}),
        fork(startSearch, {searchFunc: components, pattern: START_COMPONENTS_SEARCH})
    ]
}