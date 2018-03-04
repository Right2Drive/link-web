// Initial state
/*
  userId: string,
*/
const initialState = {
  userId: ''
}

// Action types
const SET_USER_ID = 'account/set_user_id'

// Action creators
export const accountActions = {
  setUserId: userId => ({ type: SET_USER_ID, userId })
}

// Reducer
export function accountReducer (state = initialState, action) {
  switch (action.type) {
    case SET_USER_ID: {
      return { ...state, userId: action.userId }
    }

    default: {
      return state
    }
  }
}
