import * as R from 'ramda'

export function updateByValue (oldVal, newVal) {
  return R.converge(
    R.update(R.__, newVal),
    [
      R.findIndex(R.equals(oldVal)),
      R.identity
    ]
  )
}
