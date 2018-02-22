import * as R from 'ramda'

import Component from './Component'

function getSubName (name) {
  return R.pipe(
    R.split(' '),
    R.map(R.pipe(
      R.head,
      R.toUpper
    )),
    R.take(2),
    R.join('')
  )(name)
}

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
  },

  render () {
    const { key, timestamp, name, msg } = this.props
    return (
      `<div class="user k-${key}">
        <div class="left">
          <div class="icon">
            <span class="letters">${getSubName(name)}</span>
          </div>
        </div>
        <div class="right">
          <div class="top">
            <span class="name">${name}</span>
            <span class="time">${timestamp}</span>
          </div>
          <div class="bottom">
            <span class="msg-preview">${msg}</span>
          </div>
        </div>
      </div>`
    )
  }
}

export default User
