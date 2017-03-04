import { fork } from 'redux-saga/effects'
import servers from "./servers.js";
import shortcuts from "./shortcuts.js";
import searches from "./searches.js"

export default function* root() {
    yield [
        fork(servers),
        fork(shortcuts),
        fork(searches)
    ]
}