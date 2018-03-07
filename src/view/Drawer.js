import * as R from 'ramda'

import { getElementById } from '../utils/getElementById'
import replaceClassName from '../utils/replaceClassName'
import Component from './Component'
import Icon from './Icon';
import { interfaceActions } from '../store/modules/interface';

const Drawer = Object.assign(Component(), {
  drawerId: 'drawer',
  openClass: 'open',
  closedClass: 'closed',
  chevronClass: 'close-drawer',
  userNameClass: 'name',
  iconClass: 'user-icon',
  infoClass: 'info',
  drawerTopClass: 'top',

  drawerQuery: null,
  chevronQuery: null,
  userNameQuery: null,
  drawerTopQuery: null,

  initDrawer (props) {
    this.initComponent(props, 'interface', 'account', 'users')

    // Bindings
    this.getDrawer = R.bind(this.getDrawer, this)
    this.onChevronClick = R.bind(this.onChevronClick, this)

    // Init
    this.drawerQuery = `#${this.drawerId}`
    this.chevronQuery = `${this.drawerQuery} .${this.chevronClass}`
    this.drawerTopQuery = `${this.drawerQuery} .${this.drawerTopClass}`
    this.userNameQuery = `${this.drawerQuery} .${this.infoClass} .${this.userNameClass}`

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

  onChevronClick () {
    this.dispatch(interfaceActions.setDrawerVisibility(false))
  },

  render () {
    const accUser = R.find(R.propEq('userId', this.state.account.userId))(this.state.users.rows)
    const name = accUser ? accUser.name : ''
    /** @type {HTMLDivElement} */
    const drawerTopNode = document.querySelector(this.drawerTopQuery)
    const userNameNode = document.querySelector(this.userNameQuery)
    const chevron = document.querySelector(this.chevronQuery)
    const oldIcon = drawerTopNode.querySelector('.user-icon')
    chevron.removeEventListener('click', this.onChevronClick)
    chevron.addEventListener('click', this.onChevronClick)
    oldIcon && oldIcon.remove()
    const newIcon = this.createElement(Icon({ name  }))
    drawerTopNode.insertBefore(newIcon, drawerTopNode.childNodes[0])
    userNameNode.innerHTML = name
    this.setVisibility(this.state.interface.drawerVisible)
  }
})

export default Drawer
