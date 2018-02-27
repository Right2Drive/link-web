import * as R from 'ramda'

import Component from './Component'
import replaceClassName from '../utils/replaceClassName'
import { interfaceActions } from '../store/modules/interface'

const Overlay = Object.assign(Component(), {
  showClass: 'show-slow',
  hideClass: 'hide-slow',

  initOverlay (props) {
    this.initComponent(props, 'interface')

    this.listen()
  },

  getOverlay () {
    return document.querySelector('main > .main-overlay')
  },

  listen () {
    this.getOverlay().addEventListener('click', R.bind(this.onOverlayClick, this))
  },

  onOverlayClick () {
    this.dispatch(interfaceActions.setDrawerVisibility(false))
  },

  setVisibility (visible) {
    replaceClassName(
      this.getOverlay,
      visible ? this.hideClass : this.showClass,
      visible ? this.showClass : this.hideClass
    )
  },

  render (nextState) {
    this.setVisibility(this.state.interface.drawerVisible)
  }
})

export default Overlay
