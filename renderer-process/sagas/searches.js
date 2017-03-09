import { call, put, takeEvery, takeLatest, take, fork } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import {
    START_BUNDLES_SEARCH,
    START_COMPONENTS_SEARCH,
    BUNDLE_ACTION,
    COMPONENT_ACTION,
    addSearchChunks,
    addSearchChunkResult
} from "./../actions/search-actions.js"

import {SEARCH_ITEM_ACTION_SUCCEED, SEARCH_ITEM_ACTION_FAILED, SEARCH_ITEM_ACTION_PENDING} from "./../../common/event-types.js"

const {bundles, components} = remote.require("./main-process/search-api.js");
const {startBundle, stopBundle, startComponent, stopComponent} = remote.require("./main-process/services-api.js");

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

function* searchItemAction({pattern, startService, stopService, itemParamName}) {
    while(true){
        let {searchId, serverId, itemId, start} = yield take(pattern);
        let actionFunc = start ? startService : stopService;

        let action = {searchId, chunkId: serverId, itemId};

        yield put({
            ...action,
            type: SEARCH_ITEM_ACTION_PENDING
        });

        let {response, error} = yield call(wrapFunc(actionFunc), {serverId, [itemParamName]: itemId})

        if(response){
            yield put({
                ...action,
                type: SEARCH_ITEM_ACTION_SUCCEED,
                enabled: response.enabled
            })
        } else{
            yield put({
                ...action,
                type: SEARCH_ITEM_ACTION_FAILED,
            })
        }
    }
}

export default function* root() {
    yield [
        fork(startSearch, {searchFunc: bundles, pattern: START_BUNDLES_SEARCH}),
        fork(startSearch, {searchFunc: components, pattern: START_COMPONENTS_SEARCH}),
        fork(
            searchItemAction,
            {pattern: BUNDLE_ACTION, startService: startBundle, stopService: stopBundle, itemParamName: "bundleId"}
        ),
        fork(
            searchItemAction,
            {
                pattern: COMPONENT_ACTION,
                startService: startComponent,
                stopService: stopComponent,
                itemParamName: "componentId"
            }
        )
    ]
}