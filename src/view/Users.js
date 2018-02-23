import * as R from 'ramda'

import Component from './Component'
import User from './User'
import renameKeys from '../utils/renameKeys'
import { getUserMsgs } from '../utils/messages'
import getMostRecentByProp from '../utils/getMostRecent'

function getNewUsers (oldUsers) {
  return R.filter(
    R.pipe(
      R.contains(R.__, oldUsers),
      R.not
    )
  )
}

const mergeUserWithRecentMsg = R.curry((user, messages) => {
  R.pipe(
    R.converge(
      R.merge,
      [
        R.pipe(
          R.pick(['userId', 'name']),
          renameKeys({ userId: 'key' }),
        ),
        R.pipe(
          R.prop('userId'),
          getUserMsgs(R.__, messages),
          getMostRecentByProp('lastModified'),
          R.pick(['message', 'lastModified']),
          renameKeys({ lastModified: 'timestamp' })
        )
      ]
    ),
    R.map(User),
    R.map(R.trim),
    R.reduce(R.concat, '')
  )(user)
})

const Users = Object.assign(Component(), {
  //
  usersQuery: null,
  userClass: 'user',
  users: null,
  messages: null,

  initUsers (props) {
    this.initComponent(props, 'users', 'messages')
    this.usersQuery = `#${props.sidebarId}>.users`
    this.users = []
    this.messages = []

    return this
  },

  render () {
    // Extract users and messages
    const { users: { rows: users }, messages: { rows: messages } } = this.state

    /** @type {HTMLElement} */
    const usersNode = document.querySelector(this.usersQuery)



    usersNode.innerHTML = R.map(mergeUserWithRecentMsg(R.__, messages))(users)

    this.users = users
    this.messages = messages
  }
})

export default Users
