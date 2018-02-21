import * as R from 'ramda'

import Component from './Component'

const User = {
  user: null,

  createUser (props) {
    const { user } = props
    const self = Object.create(Component, this)
    self.initComponent(props, 'users')
    self.user = user

    return self
  },

  findUser (state) {
    R.find(
      R.propEq('user', this.user)
    )(state.users)
  },

  onStateChange (nextState) {
    const newUser = this.findUser(nextState)
    if (!newUser) {
      // TODO: Destroy this user
    }
    const oldUser = this.findUser(this.prevState)
    if (oldUser !== newUser) {
      // TODO: Re-render this user
    }
  }

}

export default User
