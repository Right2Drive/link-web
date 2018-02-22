import * as R from 'ramda'

import Component from './Component'
import User from './User'

const Users = Object.assign(Component(), {
  //
  usersQuery: null,
  userClass: 'user',

  initUsers (props) {
    this.initComponent(props, 'users')
    this.usersQuery = `#${props.sidebarId}>.users`
    this.users = []
    this.messages = []

    return this
  },

  render () {
    const newUsers = R.filter(
      R.pipe(
        R.contains(R.__, this.users),
        R.not
      )
    )(this.state.users.rows)

    /** @type {HTMLElement} */
    const usersNode = document.querySelector(this.usersQuery)
    const children = usersNode.getElementsByClassName(this.userClass)
    const user = User({ ...newUsers[0], msg: 'hello', timestamp: '5:03pm' })

    usersNode.appendChild(this.createElement(user))
  }
})

export default Users
