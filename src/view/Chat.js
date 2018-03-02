import * as R from 'ramda'

import Component from './Component'
import ChatBody from './ChatBody'
import MessageBar from './MessageBar'

const Chat = Object.assign(Component(), {
  userId: 'chat',

  initChat (props) {
    this.initComponent(props)
    ChatBody.initChatBody({ chatId: this.userId })
    MessageBar.initMessageBar({ chatId: this.userId })
  }
})

export default Chat
