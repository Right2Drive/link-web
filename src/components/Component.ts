import * as R from 'ramda'

import { State } from '../store/types'
import store from '../store'

export default abstract class Component {
  private store: typeof store

  public constructor () {
    this.store = store
    // TODO: Filter by specific state
    this.store.subscribe(() => this.onStateChange(this.store.getState()))
  }

  /**
   * Listen to store for changes
   *
   * @param state Injected state
   */
  protected abstract onStateChange (state: State): void
}
