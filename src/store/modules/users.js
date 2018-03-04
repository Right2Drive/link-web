// Initial state
/*
  username: string,
  name: string,
  color: object,
  lastModified: Date,
  createdAt: Date,
  userId: string
*/
const initialState = {
  rows: []
}

// Action types
const ADD_USER = 'users/add_user'
const REMOVE_USER = 'users/remove_user'
const UPDATE_USER = 'users/update_user'

// Action creators
export const usersActions = {
  addUsers: (...rows) => ({ type: ADD_USER, rows })
}

// Thunks
export const usersThunks = {
  changeColor: ({ r, g, b }) => async (dispatch, getState, { api }) => {
    const { userId } = getState().account

    const rowPatch = {
      color: `rbg(${r}, ${g}, ${b})`
    }

    await api.users.patch(userId, rowPatch)
  },

  createNewUser: () => async (dispatch, getState, { api }) => {

  },

  changeName: name => async (dispatch, getState, { api }) => {
    const { userId } = getState().account

    const rowPatch = {
      name
    }

    await api.users.patch(userId, rowPatch)
  }
}

// Reducer
export function usersReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_USER: {
      const { rows } = action

      return { ...state, rows: [...state.rows, ...rows] }
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
