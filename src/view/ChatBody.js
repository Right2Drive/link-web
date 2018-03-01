import * as R from 'ramda'

import Component from './Component'

function findUser (userId, users) {
  return R.pipe(
    R.filter(R.propEq('userId', userId)),
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
    this.initComponent(props, 'active', 'messages', 'account', 'users')
    this.bodyQuery = `${props.chatId}>.chat-body`
  },

  render () {
    const {
      messages: {
        rows: messages
      },
      account: {
        userId: outgoingUserId
      },
      active: {
        chatUser: incomingUserId
      },
      users: {
        rows: users
      }
    } = this.state

    const outgoingUser = findUser(outgoingUserId, users)
    const incomingUser = findUser(incomingUserId, users)

    const messagesData = R.pipe(
      // Filter the messages for this chat
      R.filter(R.allPass([
        R.propEq('from', incomingUser.userId),
        R.propEq('to', outgoingUser.userId)
      ]))
      // TODO: Sort

      // TODO: Pick necessary keys

      // TODO: Add name

      // TODO: Decide if it should have a tail

      // TODO: Map to ChatMessages
    )(messages)
  }
})

export default ChatBody
