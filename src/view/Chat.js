import * as R from 'ramda'

import Component from './Component'
import ChatBody from './ChatBody'

const Chat = Object.assign(Component(), {
  userId: 'chat',

  initChat (props) {
    this.initComponent(props)
    ChatBody.initChatBody({ chatId: this.userId })
  }
})

export default Chat
