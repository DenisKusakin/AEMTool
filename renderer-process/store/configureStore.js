import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import api from '../middleware/api'
import {rootReducer} from '../reducers/index.js'
import DevTools from './../containers/DevTools.js'

const configureStore = preloadedState => {
  return createStore(
    rootReducer,
    preloadedState,
    compose(
      //applyMiddleware(thunk, api, createLogger()),
      applyMiddleware(thunk, api),
      DevTools.instrument()
    )
  )

}

var remoteStore = remote.require("./main-process/store/index.js").store;

const store = configureStore(remoteStore.getState());

remote.require("./main-process/middleware/dispatcher.js").subscribe(store.dispatch)

export default store;
