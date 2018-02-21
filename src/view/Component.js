import * as R from 'ramda'

import store from '../store'
import makeReadonly from '../utils/makeReadonly'

function listenToStore (modules) {
  const { prevState } = this
  const newState = store.getState()
  const shouldUpdate = R.any(mod => prevState[mod] !== newState[mod])

  if (shouldUpdate) {
    this.onStateChange && this.onStateChange(newState)
    this.prevState = extractState(newState, modules)
  }
}

function extractState (state, modules = []) {
  return R.pipe(
    R.pick(modules),
    makeReadonly
  )(state)
}

const Component = {
  initComponent (props, ...stateModules) {
    this.dispatch = store.dispatch
    this.props = props ? makeReadonly(props) : {}
    this.prevState = extractState(store.getState(), stateModules)
    this.willRender && this.willRender(this.prevState)
    this.willRender && this.onStateChange(this.prevState)
    store.subscribe(R.bind(R.partial(listenToStore, [stateModules]), this))
  },

  different (nextState, mod, prop) {
    return (this.prevState[mod][prop] !== nextState[mod][prop])
  }
}

export default Component
