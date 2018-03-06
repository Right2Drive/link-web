import { createActions, createReducer, generateActionNames } from '../../utils/apiModules'

/* State Model
  =============
  username: string,
  name: string,
  color: object,
  lastModified: Date,
  createdAt: Date,
  userId: string
*/

const USERS = 'users'

// Action creators
export const usersActions = createActions(USERS)

// Action names
export const usersActionNames = generateActionNames(USERS)

// Thunks
export const usersThunks = {
  changeColor: ({ r, g, b }) => async (dispatch, getState, { api }) => {
    const { userId } = getState().account

    const rowPatch = {
      color: `rbg(${r}, ${g}, ${b})`
    }

    await api.users.patch(userId, rowPatch)
  },

  /**
   * @return {Promise<{ userId: string }>}
   */
  createNewUser: () => async (dispatch, getState, { api }) => {
    return api.users.create({})
  },

  changeName: name => async (dispatch, getState, { api }) => {
    const { userId } = getState().account

    const rowPatch = {
      name
    }

    await api.users.patch(userId, rowPatch)
  }
}

export const usersReducer = createReducer(USERS)
