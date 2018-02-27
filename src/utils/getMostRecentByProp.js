import * as R from 'ramda'

const getMostRecentByProp = R.curry(prop => R.reduce(
  R.maxBy(
    R.pipe(
      R.prop(prop),
      d => new Date(d) // Convert to Date
    )
  ),
  { [prop]: new Date(0) } // Min date accumulator (epoch time)
))

export default getMostRecentByProp
