import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import {rootReducer} from '../reducers/index.js'
import DevTools from './../containers/DevTools.js'
import listeners from "./../listeners"

const configureStore = preloadedState => {
  return createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk),
      DevTools.instrument()
    )
  )

}

const store = configureStore({});
listeners(store);

export default store;
