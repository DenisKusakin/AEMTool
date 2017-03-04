import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import {rootReducer} from '../reducers/index.js'
import DevTools from './../containers/DevTools.js'
import persistState from 'redux-localstorage'
import mySaga from './../sagas'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()

const configureStore = preloadedState => {
  return createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(sagaMiddleware),
      DevTools.instrument(),
      //persistState()
    )
  )

}

const store = configureStore({});
sagaMiddleware.run(mySaga)

export default store;
