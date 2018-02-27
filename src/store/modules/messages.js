// Initial state
/*
  from: string,
  to: string,
  group: boolean,
  lastModified: Date,
  createdAt: Date,
  messageId: string,
*/
const initialState = {
  rows: [
    {
      from: 'f8adf9s7gd8g7f9sdg',
      to: 'a8sdf8ads7f87adf',
      group: false,
      outgoing: true,
      message: 'hello space',
      lastModified: new Date().toUTCString(),
      createdAt: new Date().toUTCString(),
      messageId: '78a7f8a7s98f7sd'
    },
    {
      from: 'a8sdf8ads7f87adf',
      to: 'f8adf9s7gd8g7f9sdg',
      group: false,
      outgoing: false,
      message: 'hello world',
      lastModified: new Date().toUTCString(),
      createdAt: new Date().toUTCString(),
      messageId: '78a7f8a7s98f7sd'
    }
  ]
}

// Action types
const ADD_MESSAGE = 'messages/add_user'
const REMOVE_MESSAGE = 'messages/remove_user'
const UPDATE_MESSAGE = 'messages/update_user'

// Action creators
export const messagesActions = {

}

// Reducer
export function messagesReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE: {
      const { row } = action

      return { ...state, rows: [...state.rows, row] }
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
