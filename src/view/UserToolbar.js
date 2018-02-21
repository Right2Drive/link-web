import * as R from 'ramda'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromEvent'

import Component from './Component'
import { interfaceActions } from '../store/modules/interface'

const UserToolbar = Object.assign(Object.create(Component), {
  sideBarId: 'side-bar',
  userToolbarClass: 'user-toolbar',
  menuButtonId: 'menu-button',

  init () {
    this.initComponent()

    this.listen()

    return this
  },

  listen () {
    const menuButton = document.getElementById(this.menuButtonId)
    Observable.fromEvent(menuButton, 'click')
      .subscribe(R.bind(this.onMenuClicked, this))
  },

  onMenuClicked () {
    this.dispatch(interfaceActions.setDrawerVisibility(true))
  }
})

export default UserToolbar
