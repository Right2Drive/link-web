import * as R from 'ramda'

import { createActions, createReducer, generateActionNames } from '../../utils/apiModules'

/* State Model
  =============
  from: string,
  to: string,
  color: { r, g, b },
  group: boolean,
  outgoing: boolean,
  message: string,
  lastModified: Date,
  createdAt: Date,
  messageId: string
*/

const MESSAGES = 'messages'

// Action creators
export const messagesActions = createActions(MESSAGES)

// Action creator names
export const messagesActionNames = generateActionNames(MESSAGES)

// Thunks
export const messagesThunks = {
  sendMessage: message => async (dispatch, getState, { api }) => {
    const {
      account: {
        userId
      },
      chat: {
        isGroup,
        id
      },
      users: {
        rows: users
      }
    } = getState()

    const { color } = R.find(R.propEq('userId', userId))(users)

    const row = {
      message,
      color,
      from: userId,
      to: id,
      group: isGroup
    }

    await api.messages.create(row)
  }
}

// Reducer
export const messagesReducer = createReducer(MESSAGES)
