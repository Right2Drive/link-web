import * as R from 'ramda'

import Component from './Component'
import { filterForConversation, filterForGroup } from '../utils/messages'

function findUser (userId, users) {
  return R.pipe(
    R.find(R.propEq('userId', userId)),
    R.ifElse(
      R.identity,
      R.identity,
      () => { throw new Error(`could not find user ${userId}`) }
    )
  )(users)
}

const ChatBody = R.merge(Component(), {
  bodyQuery: null,

  initChatBody (props) {
    this.initComponent(props, 'chat', 'messages', 'account', 'users')
    this.bodyQuery = `${props.chatId}>.chat-body`
  },

  render () {
    const {
      messages: {
        rows: messages
      },
      account: {
        userId: currentUserId
      },
      chat: {
        isGroup,
        id
      },
      users: {
        rows: users
      }
    } = this.state



    const messagesData = R.pipe(
      // Filter the messages for this chat
      R.ifElse(
        R.always(R.equals(isGroup, true)),
        filterForGroup(id),
        filterForConversation(id, currentUserId)
      )
    )(messages)

    // TODO: Join any where from != currUser to the user itself to get name
    // TODO: Sort by timestamp
    // TODO: Pick only the keys that are necessary
  }
})

export default ChatBody
