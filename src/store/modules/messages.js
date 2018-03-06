import { createActions, createReducer, generateActionNames } from '../../utils/apiModules'

/* State Model
  =============
  from: string,
  to: string,
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
      }
    } = getState()

    const row = {
      message,
      from: userId,
      to: id,
      group: isGroup
    }

    await api.messages.create(row)
  }
}

// Reducer
export const messagesReducer = createReducer(MESSAGES)
