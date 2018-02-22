import * as R from 'ramda'

import store from '../store'
import makeReadonly from '../utils/makeReadonly'

/**
 * TODO:
 *
 * @param {object} prevState
 * @param {object} nextState
 * @param {string[]} modules
 */
function shouldUpdate (prevState, nextState, modules) {
  return R.pipe(
    R.map(R.props(modules)),
    R.take(2),
    R.apply(R.equals),
    R.not
  )([prevState, nextState])
}

/**
 * TODO:
 *
 * @param {string[]} modules
 */
function listenToStore (modules) {
  const { prevState } = this
  const nextState = store.getState()

  if (shouldUpdate(prevState, nextState, modules)) {
    this.onStateChange && this.onStateChange(nextState)
    this.prevState = extractState(nextState, modules)
  }
}

/**
 * TODO:
 * @param {object} state
 * @param {string[]} modules
 *
 * @returns {object}
 */
function extractState (state, modules = []) {
  return R.pipe(
    R.pick(modules),
    makeReadonly
  )(state)
}

const Component = {

  /**
   * TODO:
   * @param {object} props
   * @param {string[]} stateModules
   */
  initComponent (props, ...stateModules) {
    this.dispatch = store.dispatch
    this.props = props ? makeReadonly(props) : {}
    this.prevState = extractState(store.getState(), stateModules)
    this.willRender && this.willRender(this.prevState)
    this.willRender && this.onStateChange(this.prevState)
    store.subscribe(R.bind(R.partial(listenToStore, [stateModules]), this))
  },

  /**
   * TODO:
   * @param {object} props
   */
  updateProps (props) {
    this.props = R.when(
      !R.equals(this.props),
      R.pipe(R.merge(this.props), makeReadonly, R.tap(this.onPropsChange))
    )(props)
  },

  /**
   * TODO:
   * @param {object} nextState
   * @param {string} mod
   * @param {string} prop
   *
   * @returns {boolean}
   */
  different (nextState, mod, prop) {
    return R.not(R.equals(this.prevState[mod][prop], nextState[mod][prop]))
  }
}

export default Component
