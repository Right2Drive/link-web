import * as R from 'ramda'

import Component from './Component'

const Users = Object.assign(Component(), {
  usersQuery: null,

  initUsers (props) {
    this.initComponent(props, 'users')
    this.usersQuery = `${props.sidebarId} > .users`

    return this
  },

  onStateChange (state) {
    const newUsers = R.filter(
      R.contains(R.__, this.state.users)
    )(state.users.rows)
    console.log(this.state)
    console.log(newUsers)
  }
})

export default Users
