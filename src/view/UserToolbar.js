import * as R from 'ramda'

import Component from './Component'
import { interfaceActions } from '../store/modules/interface'

const UserToolbar = Object.assign(Object.create(Component), {
  sideBarId: 'side-bar',
  userToolbarClass: 'user-toolbar',
  menuButtonId: 'menu-button',

  initUserToolbar (props) {
    this.initComponent(props)

    this.listen()

    return this
  },

  listen () {
    const menuButton = document.getElementById(this.menuButtonId)
    menuButton.addEventListener('click', R.bind(this.onMenuClicked, this))
  },

  onMenuClicked () {
    this.dispatch(interfaceActions.setDrawerVisibility(true))
  }
})

export default UserToolbar
