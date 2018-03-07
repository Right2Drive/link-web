import * as R from 'ramda'
import * as Cookies from 'js-cookie'

import init from '../feathers/init'
import watch from '../feathers/watch'
import { messagesActions } from './modules/messages'
import { usersActions, usersThunks } from './modules/users'
import { accountActions } from './modules/account'

const dispatchIfNotEmpty = R.curry((dispatch, actionCreator, rows) => R.when(
  R.pipe(
    R.isEmpty,
    R.not
  ),
  R.pipe(
    R.values,
    rows => dispatch(actionCreator(...rows))
  )
)(rows))

const initThunk = () => async (dispatch, getState, { api }) => {
  const thunkDispatchIfNotEmpty = dispatchIfNotEmpty(dispatch)

  // Get active user via cookie or creation
  let accountUserId = Cookies.get('userId')
  if (!accountUserId || accountUserId === 'undefined') {
    ({ userId: accountUserId } = await dispatch(usersThunks.createNewUser()))
    Cookies.set('userId', accountUserId, { expires: 365 })
  }

  // Set account user in store
  dispatch(accountActions.setUserId(accountUserId))

  api.socket.emit('handshake', accountUserId)

  window.addEventListener('beforeunload', () => api.socket.disconnect())

  const { messages, users } = await init(api)

  const processedMessages = R.map(R.pipe(
    msg => ({ ...msg, outgoing: msg.from === accountUserId })
  ))(messages)

  // Create
  thunkDispatchIfNotEmpty(messagesActions.createMessages, processedMessages)
  thunkDispatchIfNotEmpty(usersActions.createUsers, users)

  // Watch
  watch(api, dispatch)
}

export default initThunk
