const { createStore, applyMiddleware, compose, combineReducers } = require('redux')
const thunk = require('redux-thunk').default
const createLogger = require('redux-logger')
const reducer = require("./../reducers/index.js");
const storage = require('redux-storage')
const createEngine = require('redux-storage-engine-electronjsonstorage').default; 
const dispatchMiddleware = require("./../middleware/api.js");
const createCLILogger = require('redux-cli-logger').default;
const STORAGE = "redux-storage-2";

const engine = createEngine(STORAGE);
const middleware = storage.createMiddleware(engine);

const logger = createCLILogger({
    predicate: (getState, action) => !action.MONITOR_ACTION
  }
)

const createStoreWithMiddleware = applyMiddleware(middleware, dispatchMiddleware, logger)(createStore);
const store = createStoreWithMiddleware(storage.reducer(reducer));

const load = storage.createLoader(engine);
load(store)
    //.then((newState) => console.log('Loaded state:', newState))
    //.catch((e) => console.log('Failed to load previous state' + e));

var handleChange = require("./../api/status-update.js");

store.subscribe(() => {handleChange(store)});

module.exports.dispatch = store.dispatch;
module.exports.store = store;
