const Rx = require("rxjs/Rx");
import {addSearchChunks, addSearchChunkResult} from "./../actions/search-actions.js"

const source = new Rx.Subject();

const START_SEARCH = "START_SEARCH";
const CHUNK_READY = "CHUNK_READY";

const startSearch = search => searchId => ({text, servers}) => {
    const chunks = servers.map(x => {
        return {
            title: x.title,
            id: x.id
        }
    })

    source.next({
        type: START_SEARCH,
        searchId,
        chunks
    })

    chunks.forEach( ({id}) => {
        search({query: text, serverId: id})
            .then(
                ({items, stateTime}) => {
                    source.next({
                        type: CHUNK_READY,
                        searchId,
                        chunkId: id,
                        items,
                        totalTime: "total Time",
                        stateTime
                    })
                },
                () => {

                }
            )
    })
}

const searchListeners = store => {
    source
        .filter(x => x.type === START_SEARCH)
        .subscribe( ({searchId, chunks}) => {
            store.dispatch(addSearchChunks({searchId, chunks}))
        })

    source
        .filter(x => x.type === CHUNK_READY)
        .subscribe( ({searchId, chunkId, items, totalTime, stateTime}) => {
            store.dispatch(addSearchChunkResult({searchId, chunkId, items, totalTime, stateTime}))
        })
}

export {startSearch, searchListeners}