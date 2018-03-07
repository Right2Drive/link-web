import createActionCreator from '../../utils/createActionCreator'

// Initial state
const initialState = {
  drawerVisible: false
}

// Action types
const SET_DRAWER_VISIBILITY = 'interface/set_drawer_visibility'
const SET_SEARCH_VALUE = 'interface/set_search_value'

// Action creators
export const interfaceActions = {
  setDrawerVisibility: createActionCreator(SET_DRAWER_VISIBILITY, 'visible'),
  setSearchValue: createActionCreator(SET_SEARCH_VALUE, 'value')
}

// Reducer
export function interfaceReducer (state = initialState, action) {
  switch (action.type) {
    case SET_DRAWER_VISIBILITY: {
      return { ...state, drawerVisible: action.visible }
    }

    case SET_SEARCH_VALUE: {
      return { ...state, searchValue: action.value }
    }

    default: {
      return state
    }
  }
}
