import * as R from 'ramda'
import * as EventEmitter from 'mitt'

import store from '../store'
import makeReadonly from '../utils/makeReadonly'
import asyncify from '../utils/asyncify'

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
  const { state: prevState } = this
  const nextState = store.getState()

  if (shouldUpdate(prevState, nextState, modules)) {
    this.onStateChange && this.onStateChange(nextState)
    this.state = extractState(nextState, modules)
    this.render && asyncify(this.render, this)
    this.didUpdate && asyncify(this.didUpdate, this)
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
  emitter: null,

  /**
   * TODO:
   * @param {object} props
   * @param {string[]} stateModules
   */
  initComponent (props, ...stateModules) {
    this.emitter = EventEmitter()
    this.dispatch = store.dispatch
    this.props = props ? makeReadonly(props) : {}
    this.state = extractState(store.getState(), stateModules)

    // Lifecycle methods
    this.willMount && asyncify(this.willMount, this, this.state)
    this.render && asyncify(this.render, this)
    this.didMount && asyncify(this.didMount, this)

    store.subscribe(R.bind(R.partial(listenToStore, [stateModules]), this))
  },

  on (event, fn) {
    this.emitter.on(event, fn)
  },

  emit (event, payload) {
    this.emitter.emit(event, payload)
  },

  up (event, component) {
    component.on(event, payload => this.emit(event, payload))
  },

  down (event, component) {
    this.on(event, payload => component.emit(event, payload))
  },

  /**
   * TODO: probably doesn't work
   * @param {object} props
   */
  updateProps (props) {
    if (R.not(R.equals(this.props, props))) {
      const nextProps = R.pipe(
        R.merge(this.props),
        makeReadonly
      )(props)

      // Lifecycle
      this.onPropsUpdate && asyncify(this.onPropsUpdate, this, nextProps)
      this.props = nextProps
      this.render && asyncify(this.render)
      this.didUpdate && asyncify(this.didUpdate)
    }
  },

  /**
   *
   * @param {string} template
   *
   * @returns {HTMLElement}
   */
  createElement (template) {
    const el = document.createElement('template')
    el.innerHTML = template.trim()

    return el.content.firstChild
  }
}

export default () => Object.create(Component)
