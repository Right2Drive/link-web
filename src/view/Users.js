import * as R from 'ramda'

import Component from './Component'

const Users = Object.assign(Object.create(Component), {
  usersQuery: null,

  initUsers (props) {
    this.initComponent(props, 'users')
    this.usersQuery = `${props.sidebarId} > .users`
  },

  onStateChange (state) {
    const newUsers = R.filter(
      R.contains(R.__, this.prevState.users)
    )
  }
})

export default Users
