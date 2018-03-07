import * as R from 'ramda'

import Component from './Component'
import { interfaceActions } from '../store/modules/interface'

const UserToolbar = Object.assign(Component(), {
  sideBarId: 'side-bar',
  userToolbarClass: 'user-toolbar',
  menuButtonId: 'menu-button',
  searchBarId: 'user-search',

  initUserToolbar (props) {
    this.initComponent(props)

    this.listen()

    return this
  },

  listen () {
    const menuButton = document.getElementById(this.menuButtonId)
    const searchBar = document.getElementById(this.searchBarId)
    menuButton.addEventListener('click', R.bind(this.onMenuClicked, this))
    searchBar.addEventListener('input', R.bind(this.onSearchInput, this))
  },

  onSearchInput ({ currentTarget }) {
    this.dispatch(interfaceActions.setSearchValue(currentTarget.value))
  },

  onMenuClicked () {
    this.dispatch(interfaceActions.setDrawerVisibility(true))
  }
})

export default UserToolbar
