import * as R from 'ramda'

const getMostRecentByProp = prop => R.reduce((a, b) => R.gte(R.prop(prop, a), R.prop(prop, b)) ? a : b, null)

export default getMostRecentByProp
