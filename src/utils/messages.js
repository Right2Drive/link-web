import * as R from 'ramda'

import getMostRecentByProp from './getMostRecentByProp'

export const isOutgoingMsg = R.propSatisfies(R.equals(true), 'outgoing')

/**
 *
 * @param {string} userId
 */
export const isMsgFromUser = userId => R.propSatisfies(R.equals(userId), 'from')

/**
 *
 * @param {string} userId
 */
export const isMsgToUser = userId => R.propSatisfies(R.equals(userId), 'to')

export const getUserMsgs = R.curry((userId, msgs) => {
  return R.filter(R.anyPass([
    R.allPass([
      isMsgFromUser(userId),
      isOutgoingMsg
    ]),
    R.allPass([
      isMsgToUser(userId),
      R.compose(R.not, isOutgoingMsg)
    ])
  ]))(msgs)
})

export const groupMsgsByUser = R.curry((userId, messages) => {
  return R.pipe(
    R.filter(R.propEq('group', false)),
    R.groupBy(R.ifElse(
      R.propEq('from', userId),
      R.prop('to')
    )(R.ifElse(
      R.propEq('to', userId),
      R.prop('from')
    )(msg => {
      throw new Error(`Invalid message: ${msg.messageId}`)
    })))
  )(messages)
})

export const groupMsgsByGroup = R.curry((userId, messages) => {
  return R.pipe(
    R.filter(R.propEq('group', true)),
    R.prop('to')
  )(messages)
})

export const filterMostRecentMsg = R.map(
  getMostRecentByProp('lastModified')
)

const isFromFirstUserToSecond = (firstUserId, secondUserId) => R.allPass([
  R.propEq('from', firstUserId),
  R.propEq('to', secondUserId)
])

export const filterForConversation = R.curry((incomingUserId, outgoingUserId, messages) => R.filter(
  R.anyPass([
    isFromFirstUserToSecond(incomingUserId, outgoingUserId),
    isFromFirstUserToSecond(outgoingUserId, incomingUserId)
  ])
)(messages))

export const filterForGroup = R.curry((groupId, messages) => R.filter(
  R.allPass([
    R.propEq('group', true),
    R.propEq('to', groupId)
  ])
)(messages))
