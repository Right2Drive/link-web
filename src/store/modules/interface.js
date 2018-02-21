import createActionCreator from '../../utils/createActionCreator'

// Initial state
const initialState = {
  drawerVisible: false
}

// Action types
const SET_DRAWER_VISIBILITY = 'interface/set_drawer_visibility'

// Action creators
export const interfaceActions = {
  setDrawerVisibility: createActionCreator(SET_DRAWER_VISIBILITY, 'visible')
}

// Reducer
export function interfaceReducer (state = initialState, action) {
  switch (action.type) {
    case SET_DRAWER_VISIBILITY: {
      return { ...state, drawerVisible: action.visible }
    }

    default: {
      return state
    }
  }
}
