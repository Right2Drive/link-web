import * as R from 'ramda'

import Component from './Component'
import ChatPreview from './ChatPreview'
import { indexUsersWithRecentMsg } from '../utils/users'

function getNewUsers (oldUsers) {
  return R.filter(
    R.pipe(
      R.contains(R.__, oldUsers),
      R.not
    )
  )
}

const ChatPreviewList = Object.assign(Component(), {
  usersQuery: null,
  userClass: 'user',
  users: null,
  messages: null,
  activeUser: null,

  initChatPreviewList (props) {
    this.initComponent(props, 'users', 'messages', 'account')
    this.usersQuery = `#${props.sidebarId}>.users`
    this.users = []
    this.messages = []

    return this
  },

  render () {
    // Extract users and messages
    const {
      users: {
        rows: users
      },
      messages: {
        rows: messages
      },
      account: {
        userId: activeUser
      }
    } = this.state

    const userData = indexUsersWithRecentMsg(users, messages, activeUser)

    /** @type {HTMLElement} */
    const usersNode = document.querySelector(this.usersQuery)

    usersNode.innerHTML = R.pipe(
      R.map(
        ({ lastModified, name, message, userId }) => ChatPreview({
          name,
          date: lastModified,
          msg: message,
          key: userId
        })
      ),
      R.values,
      R.map(R.trim),
      R.join('\n')
    )(userData)

    this.users = users
    this.messages = messages
    this.activeUser = activeUser
  }
})

export default ChatPreviewList
