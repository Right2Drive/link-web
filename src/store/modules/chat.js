// Initial state
/*
  userId: string,
*/
const initialState = {
  isGroup: false,
  id: ''
}

// Action types
const SET_ACTIVE_USER = 'chat/set_active_user'
const CLEAR_ACTIVE_USER = 'chat/clear_active_user'

// Action creators
export const chatActions = {
  setActiveUser: id => ({ type: SET_ACTIVE_USER, id }),
  clearActiveUser: () => ({ type: CLEAR_ACTIVE_USER })
}

// Reducer
export function chatReducer (state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_USER: {
      return { ...state, id: action.id }
    }

    case CLEAR_ACTIVE_USER: {
      return { ...state, id: '' }
    }

    default: {
      return state
    }
  }
}
