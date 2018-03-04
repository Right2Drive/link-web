// Initial state
/*
  from: string,
  to: string,
  group: boolean,
  outgoing: boolean,
  message: string,
  lastModified: Date,
  createdAt: Date,
  messageId: string
*/
const initialState = {
  rows: []
}

// Action types
const ADD_MESSAGE = 'messages/add_user'
const REMOVE_MESSAGE = 'messages/remove_user'
const UPDATE_MESSAGE = 'messages/update_user'

// Action creators
export const messagesActions = {
  addMessages: (...rows) => ({ type: ADD_MESSAGE, rows })
}

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

    api.messages.create(row)
  }
}

// Reducer
export function messagesReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE: {
      const { rows } = action

      return { ...state, rows: [...state.rows, ...rows] }
    }

    case REMOVE_MESSAGE: {
      throw new Error('not implemented')
    }

    case UPDATE_MESSAGE: {
      throw new Error('not implemented')
    }

    default: {
      return state
    }
  }
}
