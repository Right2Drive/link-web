import * as R from 'ramda'
import * as snakeCase from 'snake-case'
import toPascalCase from '../utils/toPascalCase'

function createInitialState () {
  return {
    rows: []
  }
}

var idProp = name => `${R.init(name)}Id`

/**
 *
 * @param {string} name
 */
function generateActionTypes (name) {
  const snakeCaseName = snakeCase(name)

  return {
    createType: `${snakeCaseName}/create_${snakeCaseName}`,
    updateType: `${snakeCaseName}/update_${snakeCaseName}`,
    patchType: `${snakeCaseName}/patch_${snakeCaseName}`
  }
}

export function generateActionNames (name) {
  const pascalName = toPascalCase(name)

  return {
    createAction: `create${pascalName}`,
    updateAction: `update${pascalName}`,
    patchAction: `patch${pascalName}`
  }
}

export function createReducer (name) {
  const types = generateActionTypes(name)

  return (state = createInitialState(), action) => {
    switch (action.type) {
      case types.createType: {
        return { ...state, rows: [...state.rows, ...action.rows] }
      }

      case types.updateType: {
        const updates = action.rows

        return {
          ...state,
          rows: R.map(
            row => {
              const propName = idProp(name)
              const updateIndex = R.findIndex(R.propEq(propName, R.prop(propName, row)))(updates)

              return updateIndex === -1 ? row : updates[updateIndex]
            }
          )(state.rows)
        }
      }

      case types.patchType: {
        const patches = action.rows

        return {
          ...state,
          rows: R.map(
            row => {
              const propName = idProp(name)
              const patchIndex = R.findIndex(R.propEq(propName, R.prop(propName, row)))(patches)

              return patchIndex === -1 ? row : R.merge(row, patches[patchIndex])
            }
          )(state.rows)
        }
      }

      default: {
        return state
      }
    }
  }
}

export function createActions (name) {
  const { createAction, patchAction, updateAction } = generateActionNames(name)
  const { createType, patchType, updateType } = generateActionTypes(name)

  return {
    [createAction] (...rows) {
      return { type: createType, rows }
    },

    [patchAction] (...rows) {
      return { type: patchType, rows }
    },

    [updateAction] (...rows) {
      return { type: updateType, rows }
    }
  }
}
