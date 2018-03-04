import * as R from 'ramda'

import Component from './Component'
import ChatBody from './ChatBody'
import MessageBar from './MessageBar'

const Chat = Object.assign(Component(), {
  userId: 'chat',
  toolbarClassName: 'chat-toolbar',
  messageBarClassName: 'send-msg-bar',
  hiddenMessageClassname: 'empty-msg',
  toolbarQuery: null,
  messageBarQuery: null,
  toolbarTitleQuery: null,
  hiddenMessageQuery: null,

  initChat (props) {
    this.initComponent(props, 'chat', 'users')
    ChatBody.initChatBody({ chatId: this.userId })
    MessageBar.initMessageBar({ chatId: this.userId })

    this.toolbarQuery = `#${this.userId}>.${this.toolbarClassName}`
    this.messageBarQuery = `#${this.userId}>.${this.messageBarClassName}`
    this.toolbarTitleQuery = `#${this.userId}>.${this.toolbarClassName}>h1`
    this.hiddenMessageQuery = `#${this.userId}>.${this.hiddenMessageClassname}`
  },

  render () {
    /** @type {HTMLHeadingElement} */
    const toolbarTitleNode = document.querySelector(this.toolbarTitleQuery)
    toolbarTitleNode.innerHTML = R.ifElse(
      R.always(this.state.chat.id),
      R.pipe(
        R.find(R.propEq('userId', this.state.chat.id)),
        R.prop('name')
      ),
      R.always('')
    )(this.state.users.rows)

    const hiddenNodes = [
      document.querySelector(this.toolbarQuery),
      document.querySelector(this.messageBarQuery)
    ]

    const shownNodes = [
      document.querySelector(this.hiddenMessageQuery)
    ]

    R.map(
      R.ifElse(
        R.always(this.state.chat.id),
        node => node.classList.contains('hide') && node.classList.remove('hide'),
        node => !node.classList.contains('hide') && node.classList.add('hide')
      )
    )(hiddenNodes)

    R.map(
      R.ifElse(
        R.always(this.state.chat.id),
        node => !node.classList.contains('none') && node.classList.add('none'),
        node => node.classList.contains('none') && node.classList.remove('none')
      )
    )(shownNodes)
  }
})

export default Chat
