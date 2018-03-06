import * as R from 'ramda'

import Component from './Component'
import { filterForConversation, filterForGroup } from '../utils/messages'
import renameKeys from '../utils/renameKeys'
import ChatMessage from './ChatMessage'

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

const ChatBody = Object.assign(Component(), {
  chatBodyQuery: null,
  innerQuery: null,
  chatBodyClass: 'chat-body',
  innerClass: 'inner',

  initChatBody (props) {
    this.initComponent(props, 'chat', 'messages', 'account', 'users')
    this.chatBodyQuery = `#${props.chatId}>.${this.chatBodyClass}`
    this.innerQuery = `${this.chatBodyQuery}>.${this.innerClass}`
    this.scrollToBottom = R.bind(this.scrollToBottom, this)
  },

  scrollToBottom () {
    /** @type {HTMLDivElement} */
    const body = document.querySelector(this.chatBodyQuery)
    body.scrollTop = body.scrollHeight
  },

  didMount () {
    this.on('scrollDown', this.scrollToBottom)
  },

  render () {
    const {
      messages: {
        rows: messages
      },
      account: {
        userId: accountUserId
      },
      chat: {
        isGroup,
        id,
      },
      users: {
        rows: users
      }
    } = this.state

    /** @type {HTMLElement} */
    const node = document.querySelector(this.innerQuery)

    if (!id) {
      // Should show empty chat
      node.innerHTML = ''

      return
    }

    // Filter messages for current chat
    const indexedChatMessages = R.pipe(
      R.ifElse(
        R.always(R.equals(isGroup, true)),
        filterForGroup(id),
        filterForConversation(id, accountUserId)
      ),
      R.map(R.pipe(
        R.pick(['lastModified', 'from', 'to', 'message', 'messageId']),
        renameKeys({
          lastModified: 'date'
        }),
        msg => ({ ...msg, outgoing: R.equals(msg.from, accountUserId) }),
      )),
      R.groupBy(R.prop('from')),
      R.map(
        messages => ({ messages })
      )
    )(messages)

    const indexedUsers = R.pipe(
      R.indexBy(R.prop('userId')),
      R.map(R.pick([
        'name',
        'color'
      ])),
      R.map(renameKeys({
        color: 'backgroundColor'
      }))
    )(users)

    const filterWithMessages = R.filter(R.prop('messages'))
    const spreadMessages = R.chain(
      mergedData => R.map(
        messageData => ({ ...R.omit(['messages'], mergedData), ...messageData })
      )(mergedData.messages)
    )

    const messagesData = R.pipe(
      R.values,
      filterWithMessages,
      spreadMessages,
      R.sortBy(R.prop('date')),
      R.reverse,
      sortedData => sortedData.map((v, i, self) => ({ ...v, tail: !self[i + 1] || self[i + 1].from !== v.from })),
      R.map(R.pick(['message', 'date', 'backgroundColor', 'name', 'outgoing', 'tail']))
    )(R.mergeDeepLeft(indexedChatMessages, indexedUsers))

    node.innerHTML = R.pipe(
      R.map(ChatMessage),
      R.map(R.trim),
      R.join('\n')
    )(messagesData)

    // TODO: Change
    // Currently scrolls to bottom on every re-render (get's annoying if someone else is sending messages)
    this.scrollToBottom()
  }
})

export default ChatBody
