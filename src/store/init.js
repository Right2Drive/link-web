import * as R from 'ramda'
import * as Cookies from 'js-cookie'

import init from '../feathers/init'
import { messagesActions } from './modules/messages'
import { usersActions } from './modules/users'
import { accountActions } from './modules/account'

const dispatchIfNotEmpty = R.curry((dispatch, actionCreator, rows) => R.when(
  R.pipe(
    R.isEmpty,
    R.not
  ),
  rows => dispatch(actionCreator(...rows))
)(rows))

const initThunk = () => async (dispatch, getState, { api }) => {
  const thunkDispatchIfNotEmpty = dispatchIfNotEmpty(dispatch)

  // Get active user via cookie or creation
  let accountUserId = Cookies.get('userId')
  if (!accountUserId || accountUserId === 'undefined') {
    ({ userId: accountUserId } = await api.users.create({}))
    Cookies.set('userId', accountUserId)
  }

  // Set account user in store
  dispatch(accountActions.setUserId(accountUserId))

  const {
    messages: {
      data: messages
    },
    users: {
      data: users
    }
  } = await init(api)

  const processedMessages = R.map(R.pipe(
    msg => ({ ...msg, outgoing: msg.from === accountUserId })
  ))(messages)

  // Create
  thunkDispatchIfNotEmpty(messagesActions.addMessages, processedMessages)
  thunkDispatchIfNotEmpty(usersActions.addUsers, users)
}

export default initThunk
