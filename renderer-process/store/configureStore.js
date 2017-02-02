import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import {rootReducer} from '../reducers/index.js'
import DevTools from './../containers/DevTools.js'
import listeners from "./../listeners"
import persistState from 'redux-localstorage'

const configureStore = preloadedState => {
  return createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk),
      DevTools.instrument(),
      persistState()
    )
  )

}

const store = configureStore({});
listeners(store);

export default store;
