import { createStore, compose, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

import reducer from './reducer'
import { State } from './types';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore<State>(reducer, {}, composeEnhancers(
  applyMiddleware(reduxThunk),
))
