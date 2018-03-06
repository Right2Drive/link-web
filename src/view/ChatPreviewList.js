import * as R from 'ramda'

import Component from './Component'
import ChatPreview from './ChatPreview'
import { indexUsersWithRecentMsg } from '../utils/users'
import { chatActions } from '../store/modules/chat'

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

    this.onChatPreviewClick = R.bind(this.onChatPreviewClick, this)

    return this
  },

  onChatPreviewClick (e) {
    const userId = e.currentTarget.attributes['data-key'].nodeValue
    this.dispatch(chatActions.setActiveUser(userId))
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

    // TODO: Break this down!
    usersNode.innerHTML = R.pipe(
      R.values,
      R.map(
        ({ lastModified: msgLastModified, name, message, userId, createdAt: userCreatedAt }) =>
          ({ name, date: msgLastModified || userCreatedAt, msg: message, userId })
      ),
      R.sortBy(R.prop('date')),
      R.reverse,
      R.map(ChatPreview),
      R.map(R.trim),
      R.join('\n')
    )(userData)

    R.map(
      node => node.addEventListener('click', this.onChatPreviewClick)
    )(usersNode.childNodes)

    this.users = users
    this.messages = messages
    this.activeUser = activeUser
  }
})

export default ChatPreviewList
