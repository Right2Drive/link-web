import * as R from 'ramda'

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
