import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { interfaceReducer } from './modules/interface'
import {} from './modules/messages'

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

export default createStore(
  combineReducers({
    interface: interfaceReducer
  }),
  composeEnhancers(
    applyMiddleware(
      thunk.withExtraArgument({ })
    )
  )
)
