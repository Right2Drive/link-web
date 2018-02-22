import * as R from 'ramda'

import { getElementById } from '../utils/getElementById'
import replaceClassName from '../utils/replaceClassName'
import Component from './Component'

const Drawer = Object.assign(Component(), {

  drawerId: 'drawer',
  openClass: 'open',
  closedClass: 'closed',

  open: false,

  initDrawer (props) {
    this.initComponent(props, 'interface')

    // Bindings
    this.getDrawer = R.bind(this.getDrawer, this)

    // Init
    this.open = false

    return this
  },

  setVisibility (visible) {
    replaceClassName(
      this.getDrawer,
      visible ? this.closedClass : this.openClass,
      visible ? this.openClass : this.closedClass
    )
  },

  getDrawer () {
    return getElementById(this.drawerId)
  },

  render () {
    this.setVisibility(this.state.interface.drawerVisible)
  }
})

export default Drawer
