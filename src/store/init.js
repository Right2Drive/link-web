import * as R from 'ramda'

import init from '../feathers/init'
import { messagesActions } from './modules/messages'
import { usersActions } from './modules/users'

const initThunk = () => async (dispatch, getState, { api }) => {
  const dispatchIfNotEmpty = (actionCreator, rows) => R.when(
    R.pipe(
      R.isEmpty,
      R.not
    ),
    rows => dispatch(actionCreator(...rows))
  )(rows)

  const {
    messages: {
      data: messages
    },
    users: {
      data: users
    }
  } = await init(api)

  // Create
  dispatchIfNotEmpty(messagesActions.addMessages, messages)
  dispatchIfNotEmpty(usersActions.addUsers, users)
}

export default initThunk
