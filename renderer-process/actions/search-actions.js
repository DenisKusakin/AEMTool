const CHANGE_CHECKBOX_STATE = "CHANGE_CHECKBOX_STATE"
const CHANGE_FIELD_VALUE = "CHANGE_FIELD_VALUE";
const ADD_SEARCH_CHUNKS = "ADD_SEARCH_CHUNKS";
const ADD_SEARCH_CHUNK_RESULT = "ADD_SEARCH_CHUNK_RESULT";
const START_BUNDLES_SEARCH = "START_BUNDLES_SEARCH";
const START_COMPONENTS_SEARCH = "START_COMPONENTS_SEARCH";

module.exports = {
    CHANGE_CHECKBOX_STATE,
    CHANGE_FIELD_VALUE,
    ADD_SEARCH_CHUNKS,
    ADD_SEARCH_CHUNK_RESULT,
    START_BUNDLES_SEARCH,
    START_COMPONENTS_SEARCH
}

module.exports.changeCheckboxState = ({searchId, checked, checkboxId}) => ({
    type: CHANGE_CHECKBOX_STATE,
    checked,
    checkboxId,
    searchId
})

module.exports.changeSearchFieldValue = ({searchId, value}) => ({
    type: CHANGE_FIELD_VALUE,
    searchId,
    value
})

module.exports.addSearchChunks = ({searchId, chunks}) => ({
    type: ADD_SEARCH_CHUNKS,
    searchId,
    chunks
})

module.exports.addSearchChunkResult = ({searchId, chunkId, items, totalTime, stateTime}) => ({
    type: ADD_SEARCH_CHUNK_RESULT,
    searchId,
    chunkId,
    items,
    totalTime,
    stateTime
})

const startSearch = type => ({searchId, text, servers}) => ({
    type: type,
    searchId,
    text,
    servers
})

module.exports.startBundlesSearch = startSearch(START_BUNDLES_SEARCH);
module.exports.startComponentsSearch = startSearch(START_COMPONENTS_SEARCH);