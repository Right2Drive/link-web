// Initial state
/*
  username: string,
  name: string,
  color: string,
  lastModified: Date,
  createdAt: Date,
*/
const initialState = {
  rows: [
    {
      username: 'Right2Drive',
      name: 'Right2Drive',
      color: { r: 255, g: 255, b: 255 },
      lastModified: new Date().toUTCString(),
      createdAt: new Date().toUTCString(),
      userId: 'f8adf9s7gd8g7f9sdg'
    },
    {
      username: 'Bea Esguerra',
      name: 'Bea Esguerra',
      color: { r: 0, g: 0, b: 0 },
      lastModified: new Date().toUTCString(),
      createdAt: new Date().toUTCString(),
      userId: 'a8sdf8ads7f87adf'
    },
    {
      username: 'James Inglis',
      name: 'James Inglis',
      color: '#424242',
      lastModified: new Date().toUTCString(),
      createdAt: new Date().toUTCString(),
      userId: '7dgf89h7gdf98'
    }
  ]
}

// Action types
const ADD_USER = 'users/add_user'
const REMOVE_USER = 'users/remove_user'
const UPDATE_USER = 'users/update_user'

// Action creators
export const usersActions = {

}

// Reducer
export function usersReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_USER: {
      const { user } = action

      return { ...state, rows: [...state.rows, user] }
    }

    case REMOVE_USER: {
      throw new Error('not implemented')
    }

    case UPDATE_USER: {
      throw new Error('not implemented')
    }

    default: {
      return state
    }
  }
}
