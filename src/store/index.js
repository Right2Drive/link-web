import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { interfaceReducer } from './modules/interface'
import { usersReducer } from './modules/users'
import { messagesReducer } from './modules/messages'
import { accountReducer } from './modules/account'

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

export default createStore(
  combineReducers({
    interface: interfaceReducer,
    users: usersReducer,
    messages: messagesReducer,
    account: accountReducer
  }),
  composeEnhancers(
    applyMiddleware(
      thunk.withExtraArgument({ })
    )
  )
)
