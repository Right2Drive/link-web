import * as R from 'ramda'
import * as Fuse from 'fuse.js'

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
    this.initComponent(props, 'users', 'messages', 'account', 'interface')
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
      },
      interface: {
        searchValue
      }
    } = this.state

    const usersWithoutCurrent = R.filter(R.pipe(R.propEq('userId', activeUser), R.not))(users)

    const search = searchValue => users => new Fuse(users, {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        'name',
        'msg'
      ]
    }).search(searchValue)

    const userData = indexUsersWithRecentMsg(usersWithoutCurrent, messages, activeUser)

    /** @type {HTMLElement} */
    const usersNode = document.querySelector(this.usersQuery)

    // TODO: Break this down!
    usersNode.innerHTML = R.pipe(
      R.values,
      R.map(
        ({ lastModified: msgLastModified, name, message, userId, createdAt: userCreatedAt, connected }) =>
          ({ name, date: msgLastModified || userCreatedAt, msg: message, userId, connected })
      ),
      R.sortBy(R.prop('date')),
      R.reverse,
      R.when(R.always(searchValue), search(searchValue)),
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
